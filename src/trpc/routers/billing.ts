import { TRPCError } from "@trpc/server";
import { polar } from "@/lib/polar";
import { env } from "@/lib/env";
import { createTRPCRouter, orgProcedure } from "../init";

export const billingRouter = createTRPCRouter({
    createCheckout: orgProcedure.mutation(async ({ ctx }) => {
        try {
            console.log("[billing.createCheckout] orgId:", ctx.orgId);
            console.log("[billing.createCheckout] productId:", env.POLAR_PRODUCT_ID);
            console.log("[billing.createCheckout] successUrl:", env.APP_URL);

            const result = await polar.checkouts.create({
                products: [env.POLAR_PRODUCT_ID],
                externalCustomerId: ctx.orgId,
                successUrl: env.APP_URL,
            });

            console.log("[billing.createCheckout] result url:", result.url);

            if (!result.url) {
                console.error("[billing.createCheckout] No URL returned from Polar:", result);
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to create checkout session: No URL returned",
                });
            }

            return { checkoutUrl: result.url };
        } catch (error) {
            console.error("[billing.createCheckout] ERROR:", error);
            throw error;
        }
    }),

    createPortalSession: orgProcedure.mutation(async ({ ctx }) => {
        const result = await polar.customerSessions.create({
            externalCustomerId: ctx.orgId,
        });

        if (!result.customerPortalUrl) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Failed to create customer portal session",
            });
        }

        return { portalUrl: result.customerPortalUrl };
    }),

    getStatus: orgProcedure.query(async ({ ctx }) => {
        try {
            const customerState = await polar.customers.getStateExternal({
                externalId: ctx.orgId,
            });

            const hasActiveSubscription =
                (customerState.activeSubscriptions ?? []).length > 0;

            // Sum up estimated costs from all meters across active subscriptions
            let estimatedCostCents = 0;
            for (const sub of customerState.activeSubscriptions ?? []) {
                for (const meter of sub.meters ?? []) {
                    estimatedCostCents += meter.amount ?? 0;
                }
            }

            return {
                hasActiveSubscription,
                customerId: customerState.id,
                estimatedCostCents,
            };
        } catch {
            // Customer doesn't exist yet in Polar
            return {
                hasActiveSubscription: false,
                customerId: null,
                estimatedCostCents: 0,
            };
        }
    }),
});