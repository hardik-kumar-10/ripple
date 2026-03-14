import { OrganizationList } from "@clerk/nextjs";

export default function OrgSelectionPage() {
    return (
        <div className="flex min-h-screen items-center justify-center 
            bg-background">
            <OrganizationList
                appearance={{
                    hidePersonal: true,
                    afterCreateOrganizationUrl: "/",
                    afterSelectOrganizationUrl: "/",
                    appearance: {
                        elements: {
                            card: {
                                rootBox: "mx-auto",
                                card: "shadow-lg",
                            },
                        },
                    }
                }}
            />
        </div>
    );
};
