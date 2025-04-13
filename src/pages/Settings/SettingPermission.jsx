import React, { useState, useEffect, useRef } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { getData } from "@/utils/datas";

export default function SettingPermission() {
    const initialPermissions = getData("initialPermissions");

    const roles = ["Owner", "Administrator", "Editor", "Agent", "Contributor"];

    const [checkboxStates, setCheckboxStates] = useState({});
    const [headerStates, setHeaderStates] = useState({});
    const headerCheckboxRefs = useRef({});

    useEffect(() => {
        const initialStates = {};
        const initialHeaderStates = {};

        setCheckboxStates(initialStates);
        setHeaderStates(initialHeaderStates);
    }, []);

    const handleCheckboxChange = (itemId, role) => {
        const key = `${itemId}-${role}`;

        setCheckboxStates(prev => {
            const newStates = { ...prev, [key]: !prev[key] };

            updateHeaderStates(newStates);

            return newStates;
        });
    };

    const handleHeaderCheckboxChange = (role) => {
        let allItemKeys = [];
        initialPermissions.forEach(section => {
            section.items.forEach(item => {
                allItemKeys.push(`${item.id}-${role}`);
            });
        });

        const allSelected = allItemKeys.every(key => checkboxStates[key]);

        const newValue = !allSelected;

        setHeaderStates(prev => ({
            ...prev,
            [role]: newValue
        }));

        const newStates = { ...checkboxStates };
        allItemKeys.forEach(key => {
            newStates[key] = newValue;
        });

        setCheckboxStates(newStates);
    };

    const updateHeaderStates = (states = checkboxStates) => {
        const newHeaderStates = { ...headerStates };

        roles.forEach(role => {
            let allItems = [];
            initialPermissions.forEach(section => {
                section.items.forEach(item => {
                    allItems.push(`${item.id}-${role}`);
                });
            });

            const checkedCount = allItems.filter(key => states[key]).length;

            if (checkedCount === 0) {
                newHeaderStates[role] = false;
            } else if (checkedCount === allItems.length) {
                newHeaderStates[role] = true;
            } else {
                newHeaderStates[role] = 'indeterminate';
            }
        });

        setHeaderStates(newHeaderStates);
    };

    const getCheckboxState = (itemId, role) => {
        const key = `${itemId}-${role}`;
        return checkboxStates[key] || false;
    };

    return (
        <div className="p-6 max-w-[100vw] overflow-auto space-y-4 flex-1 flex flex-col max-md:max-h-[calc(100vh-156px-80px)]">
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
                                <TableHead key={role} className="text-center font-medium bg-[#f9fafb] z-10 sticky top-0 py-2 space-y-2">
                                    <div className={`flex justify-center ${_index === 4 ? "max-md:pr-[10px]" : ""}`}>
                                        {role}
                                    </div>
                                    <div className="flex justify-center mt-1">
                                        <Checkbox
                                            id={`header-${role}`}
                                            checked={headerStates[role] === true}
                                            ref={checkbox => {
                                                if (checkbox) {
                                                    checkbox.indeterminate = headerStates[role] === 'indeterminate';
                                                    headerCheckboxRefs.current[role] = checkbox;
                                                }
                                            }}
                                            onCheckedChange={() => handleHeaderCheckboxChange(role)}
                                        />
                                    </div>
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody className="max-h-1 overflow-auto">
                        {initialPermissions.map((section, sectionIndex) => (
                            <React.Fragment key={`section-${sectionIndex}`}>
                                {section.category !== "Features" && (
                                    <TableRow className="bg-gray-50">
                                        <TableCell colSpan={6} className="font-medium py-3">
                                            {section.category}
                                        </TableCell>
                                    </TableRow>
                                )}
                                {section.items.map((item, itemIndex) => (
                                    <TableRow className="h-10" key={`item-${sectionIndex}-${itemIndex}`}>
                                        <TableCell>
                                            <div className="flex items-center gap-2 max-md:w-32 md:whitespace-nowrap">
                                                {item.name}
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
                                                            <p className="text-sm">{item.tooltip}</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </div>
                                        </TableCell>
                                        {roles.map((role) => (
                                            <TableCell key={`${item.id}-${role}-cell`} className="text-center">
                                                <div className="max-md:w-16">
                                                    <Checkbox
                                                        id={`${item.id}-${role}`}
                                                        checked={getCheckboxState(item.id, role)}
                                                        onCheckedChange={() => handleCheckboxChange(item.id, role)}
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