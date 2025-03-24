import { useState } from "react";
import FilterCom from "../components/AppLayoutComponents/Filter/FilterCom"
import ProfileDropDownCom from "../components/AppLayoutComponents/ProfileDropDownCom"
import SearchInputCom from "../components/AppLayoutComponents/SearchInputCom"
import SidebarNavigation from "../components/AppLayoutComponents/SidebarNavigation"
import {
    SidebarProvider,
} from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom";
import AppBreadcrumbs from "@/utils/AppBreadcrumb";
import CreateDropDownCom from "@/components/AppLayoutComponents/CreateDropDownCom";
import { AppSidebar } from "@/components/AppLayoutComponents/AppSidebar";
import BottomSidebarNavigation from "@/components/AppLayoutComponents/BottomSidebarNavigation";

export default function AppLayout({ setIsSidebarOpen }) {
    const [searchValue, setSearchValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);


    const handleBlur = (e) => {
        setTimeout(() => {
            if (!e?.currentTarget?.contains(document.activeElement)) {
                setIsFocused(false);
            }
        }, 200);
    };

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <header className="fixed top-0 left-0 right-0 z-10 bg-white">
                    <div className="flex h-16 w-full justify-between shrink-0 items-center px-4 md:px-6">
                        <div>
                            <img src="/src/assets/logo.png" width={200} />
                        </div>
                        <div className="relative md:flex gap-6 hidden" onBlur={handleBlur}>
                            <SearchInputCom
                                searchValue={searchValue}
                                setSearchValue={setSearchValue}
                                isFocused={isFocused}
                                setIsFocused={setIsFocused}
                            />
                            <FilterCom />
                        </div>
                        <div className="flex md:gap-6 gap-2 items-center">
                            <CreateDropDownCom />
                            <ProfileDropDownCom />
                        </div>
                    </div>
                    <div className="h-12 relative flex gap-2 justify-end mx-4 md:hidden items-center" onBlur={handleBlur}>
                        <SearchInputCom
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                            isFocused={isFocused}
                            setIsFocused={setIsFocused}
                        />
                        <FilterCom />
                    </div>
                    <div className="md:hidden px-4 py-3 sticky top-0 bg-white z-10">
                        <AppBreadcrumbs />
                    </div>
                </header>

                <div className="flex-1 max-md:flex md:mt-[64px] max-md:mt-[156px] max-md:mb-[80px] overflow-y-auto">
                    <div className="flex flex-1">
                        <div className="hidden relative md:flex h-[calc(var(--vh, 1vh) * 100 - 64px)] flex-col items-center justify-between overflow-hidden">
                            <SidebarProvider value={{ selectedItem, setSelectedItem }}>
                                <SidebarNavigation setIsSidebarOpen={setIsSidebarOpen} />
                                <AppSidebar />
                            </SidebarProvider>
                        </div>

                        <div className="flex flex-1 flex-col md:max-h-[calc(100vh-64px)] md:overflow-y-auto">
                            <div className="hidden md:block px-4 sticky top-0 bg-white z-10">
                                <AppBreadcrumbs />
                            </div>
                            <Outlet />
                        </div>
                    </div>
                </div>
                <BottomSidebarNavigation />
            </div>
        </>
    )
}