import React, { useState, useEffect, useRef } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, Loader2 } from "lucide-react";
import { GetUserRolePermissionsApi, UpdateUserRolePermissionsApi } from "@/service/userRolePermissions.service";
import { toast } from "sonner";

export default function SettingPermission() {
    const [roles, setRoles] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [checkboxStates, setCheckboxStates] = useState({});
    const [headerStates, setHeaderStates] = useState({});
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const headerCheckboxRefs = useRef({});

    // Fetch permissions data on component mount
    useEffect(() => {
        fetchPermissions();
    }, []);

    const fetchPermissions = async () => {
        try {
            setLoading(true);
            const response = await GetUserRolePermissionsApi();

            const rolesData = response.data.roles || [];
            const permissionsData = response.data.permissions || [];

            setRoles(rolesData);
            setPermissions(permissionsData);

            // Initialize checkbox states based on API data
            initializeCheckboxStates(rolesData, permissionsData);
        } catch (error) {
            toast.error("Error fetching permissions:", {
                description: error.message || "Oops! Something went wrong."
            })
            console.error('Error fetching permissions:', error);
        } finally {
            setLoading(false);
        }
    };

    const initializeCheckboxStates = (rolesData, permissionsData) => {
        const initialStates = {};

        // Initialize all checkboxes based on API data
        permissionsData.forEach(section => {
            section.features.forEach(feature => {
                feature.roles.forEach(rolePermission => {
                    const role = rolesData.find(r => r._id === rolePermission.roleId);
                    if (role) {
                        const key = `${feature.featureId}-${role._id}`;
                        // Checkbox is checked if isRestricted is true
                        // Checkbox is unchecked if isRestricted is false
                        initialStates[key] = rolePermission.isRestricted;
                    }
                });
            });
        });

        setCheckboxStates(initialStates);
        updateHeaderStates(initialStates, rolesData, permissionsData);
    };

    const handleCheckboxChange = async (featureId, roleId) => {
        const key = `${featureId}-${roleId}`;

        // Calculate new states first
        const newStates = { ...checkboxStates, [key]: !checkboxStates[key] };

        // Update state
        setCheckboxStates(newStates);
        updateHeaderStates(newStates, roles, permissions);

        // Update permissions via API with new states
        await updatePermissions(newStates);
    };

    const handleHeaderCheckboxChange = async (roleId) => {
        let allFeatureKeys = [];
        permissions.forEach(section => {
            section.features.forEach(feature => {
                allFeatureKeys.push(`${feature.featureId}-${roleId}`);
            });
        });

        const allSelected = allFeatureKeys.every(key => checkboxStates[key]);
        const newValue = !allSelected;

        // Calculate new states first
        const newStates = { ...checkboxStates };
        allFeatureKeys.forEach(key => {
            newStates[key] = newValue;
        });

        // Update states
        setHeaderStates(prev => ({
            ...prev,
            [roleId]: newValue
        }));
        setCheckboxStates(newStates);

        // Update permissions via API with new states
        await updatePermissions(newStates);
    };

    const updateHeaderStates = (states = checkboxStates, rolesData = roles, permissionsData = permissions) => {
        const newHeaderStates = { ...headerStates };

        rolesData.forEach(role => {
            let allFeatures = [];
            permissionsData.forEach(section => {
                section.features.forEach(feature => {
                    allFeatures.push(`${feature.featureId}-${role._id}`);
                });
            });

            const checkedCount = allFeatures.filter(key => states[key]).length;

            if (checkedCount === 0) {
                newHeaderStates[role._id] = false;
            } else if (checkedCount === allFeatures.length) {
                newHeaderStates[role._id] = true;
            } else {
                newHeaderStates[role._id] = 'indeterminate';
            }
        });

        setHeaderStates(newHeaderStates);
    };

    const updatePermissions = async (states = checkboxStates) => {
        try {
            setUpdating(true);

            // Build restrictions array for checked items (isRestricted: true)
            const restrictions = [];

            permissions.forEach(section => {
                section.features.forEach(feature => {
                    roles.forEach(role => {
                        const key = `${feature.featureId}-${role._id}`;
                        // If checkbox is checked (true), it means the feature should be restricted (isRestricted: true)
                        if (states[key]) {
                            restrictions.push({
                                featureId: feature.featureId,
                                roleId: role._id
                            });
                        }
                    });
                });
            });

            const payload = { restrictions };
            await UpdateUserRolePermissionsApi(payload);

        } catch (error) {
            console.error('Error updating permissions:', error);
            toast.error("Error updating permissions:", {
                description: error.message || "Oops! Something went wrong."
            })
            // Optionally revert state on error
            fetchPermissions();
        } finally {
            setUpdating(false);
        }
    };

    const getCheckboxState = (featureId, roleId) => {
        const key = `${featureId}-${roleId}`;
        return checkboxStates[key] || false;
    };

    if (loading) {
        return (
            <div className="p-6 max-w-[100vw] overflow-auto space-y-4 pt-0 flex-1 flex flex-col max-md:max-h-[calc(100vh-156px-80px)]">
                <div className="p-6 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                    <h1 className="text-2xl font-bold mb-2">Permission settings</h1>
                    <p className="text-gray-500">
                        Enable or disable certain features from being used by the other teammates within your workspace.
                    </p>
                </div>
                <div className="border rounded-lg p-8 text-center">
                    <div className="flex gap-1 items-center justify-center">
                        <Loader2 className="h-4 w-4 animate-spin" /> Loading...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-[100vw] overflow-auto space-y-4 pt-0 flex-1 flex flex-col max-md:max-h-[calc(100vh-156px-80px)]">
            <div className="p-6 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                <h1 className="text-2xl font-bold mb-2">Permission settings</h1>
                <p className="text-gray-500">
                    Enable or disable certain features from being used by the other teammates within your workspace.
                </p>
            </div>

            <div className="border rounded-lg overflow-y-auto">
                <Table className="overflow-auto h-full">
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className="sticky bg-[#f9fafb] top-0">Features</TableHead>
                            {roles.map((role, _index) => (
                                <TableHead key={role._id} className="text-center font-medium bg-[#f9fafb] z-10 sticky top-0 py-2 space-y-2">
                                    <div className={`flex justify-center ${_index === roles.length - 1 ? "max-md:pr-[10px]" : ""}`}>
                                        {role.name}
                                    </div>
                                    <div className="flex justify-center mt-1">
                                        <Checkbox
                                            id={`header-${role._id}`}
                                            checked={headerStates[role._id] === true}
                                            disabled={updating}
                                            ref={checkbox => {
                                                if (checkbox) {
                                                    checkbox.indeterminate = headerStates[role._id] === 'indeterminate';
                                                    headerCheckboxRefs.current[role._id] = checkbox;
                                                }
                                            }}
                                            onCheckedChange={() => handleHeaderCheckboxChange(role._id)}
                                        />
                                    </div>
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody className="max-h-1 overflow-auto">
                        {permissions.map((section, sectionIndex) => (
                            <React.Fragment key={`section-${section._id || sectionIndex}`}>
                                {section.category !== "Features" && (
                                    <TableRow className="bg-gray-50">
                                        <TableCell colSpan={roles.length + 1} className="font-medium py-3">
                                            {section.category}
                                        </TableCell>
                                    </TableRow>
                                )}
                                {section.features.map((feature, featureIndex) => (
                                    <TableRow className="h-10" key={`feature-${feature.featureId || featureIndex}`}>
                                        <TableCell>
                                            <div className="flex items-center gap-2 max-md:w-32 md:whitespace-nowrap">
                                                {feature.feature}
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Info className="h-4 w-4 max-md:hidden text-gray-500 cursor-pointer" />
                                                        </TooltipTrigger>
                                                        <TooltipContent
                                                            side="right"
                                                            align="center"
                                                            className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs p-2 rounded-md"
                                                        >
                                                            <p className="text-sm">{feature.description}</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </div>
                                        </TableCell>
                                        {roles.map((role) => (
                                            <TableCell key={`${feature.featureId}-${role._id}-cell`} className="text-center">
                                                <div className="max-md:w-16">
                                                    <Checkbox
                                                        id={`${feature.featureId}-${role._id}`}
                                                        checked={getCheckboxState(feature.featureId, role._id)}
                                                        disabled={updating}
                                                        onCheckedChange={() => handleCheckboxChange(feature.featureId, role._id)}
                                                    />
                                                </div>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}