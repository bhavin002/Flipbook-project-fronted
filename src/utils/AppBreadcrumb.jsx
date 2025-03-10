import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const breadcrumbNameConfig = {
    'my-flipbooks': 'My Flipbooks',
    'logos': 'Brand Logos',
    'text-styles': 'Typography Styles',
    'invoice': 'Billing History',
    'sso': "Single Sign-On",
    'access': "Workspace Access",
    'logs': "Teammate Activity",
    'permission-settings': "Permission Settings",
    'email-provider': "Email Providers",
};

export default function DynamicBreadcrumb() {
    const location = useLocation();
    const navigate = useNavigate();
    const [breadcrumbs, setBreadcrumbs] = useState([]);

    useEffect(() => {
        const generateBreadcrumbs = () => {
            const pathSegments = location.pathname.split('/').filter(segment => segment);
            if (pathSegments.length === 0) {
                setBreadcrumbs([{ label: 'Home', path: '/my-flipbooks' }]);
                return;
            }

            const breadcrumbItems = [{ label: 'Home', path: '/my-flipbooks' }];

            pathSegments.forEach((segment) => {
                console.log("segment", segment);
                const displayName = breadcrumbNameConfig[segment] ||
                    segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');

                breadcrumbItems.push({
                    label: displayName,
                    path: '#'
                });
            });

            setBreadcrumbs(breadcrumbItems);
        };

        generateBreadcrumbs();
    }, [location]);

    const handleHomeClick = (e) => {
        e.preventDefault();
        navigate('/my-flipbooks');
    };

    if (breadcrumbs.length <= 1) {
        return null;
    }

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {breadcrumbs.map((crumb, index) => (
                    <React.Fragment key={index}>
                        <BreadcrumbItem>
                            {index === 0 ? (
                                <BreadcrumbLink href="#" onClick={handleHomeClick}>
                                    {crumb.label}
                                </BreadcrumbLink>
                            ) : (
                                <span className="text-muted-foreground">{crumb.label}</span>
                            )}
                        </BreadcrumbItem>
                        {index < breadcrumbs.length - 1 && (
                            <BreadcrumbSeparator />
                        )}
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}