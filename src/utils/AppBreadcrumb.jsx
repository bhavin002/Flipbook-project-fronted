import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useFolders } from "@/context/FolderContext"; 

const breadcrumbNameConfig = {
    'myflipbooks': 'My Flipbooks',
    'logos': 'Brand Logos',
    'text-styles': 'Typography Styles',
    'invoice': 'Invoices',
    'sso': "Single Sign-On",
    'access': "Workspace Access",
    'logs': "Teammate Activity",
    'permission-settings': "Permission Settings",
    'email-provider': "Email Providers",
};

export default function DynamicBreadcrumb() {
    const location = useLocation();
    const navigate = useNavigate();
    const { folders } = useFolders(); 
    const [breadcrumbs, setBreadcrumbs] = useState([]);

    useEffect(() => {
        const pathSegments = location.pathname.split('/').filter(segment => segment);
        
        const breadcrumbItems = [
            { label: 'Home', path: '/' },
            { label: 'My Flipbooks', path: '/myflipbooks' }
        ];
        
        if (
            pathSegments[0] === "myflipbooks" &&
            (pathSegments[1] === "flipbooks" || pathSegments[1] === "template") &&
            pathSegments[2] === "folder" &&
            pathSegments[3]
        ) {
            
            breadcrumbItems.push({
                label: pathSegments[1] === "flipbooks" ? "Flipbooks" : "Template",
                path: `/myflipbooks/${pathSegments[1]}`
            });
            
            breadcrumbItems.push({
                label: "Personal",
                path: "#"
            });
            
            const folder = folders.find(f => f._id === pathSegments[3]);
            breadcrumbItems.push({
                label: folder ? folder.name : "Folder",
                path: location.pathname
            });
        } else {
            pathSegments.slice(1).forEach((segment) => {
                const displayName = breadcrumbNameConfig[segment] ||
                    segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');

                breadcrumbItems.push({
                    label: displayName,
                    path: '#'
                });
            });
        }

        setBreadcrumbs(breadcrumbItems);
    }, [location, folders]);

    const handleHomeClick = (e) => {
        e.preventDefault();
        navigate('/myflipbooks');
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