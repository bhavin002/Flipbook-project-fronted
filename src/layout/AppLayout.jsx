import { useState } from "react";
import FilterCom from "../components/AppLayoutComponents/Filter/FilterCom"
import ProfileDropDownCom from "../components/AppLayoutComponents/ProfileDropDownCom"
import SearchInputCom from "../components/AppLayoutComponents/SearchInputCom"
import SidebarNavigation from "../components/AppLayoutComponents/SidebarNavigation"
import {
    SidebarProvider,
} from "@/components/ui/sidebar"
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import AppBreadcrumbs from "@/utils/AppBreadcrumb";
import CreateDropDownCom from "@/components/AppLayoutComponents/CreateDropDownCom";
import { AppSidebar } from "@/utils/AppSidebar";
import BottomSidebarNavigation from "@/components/AppLayoutComponents/BottomSidebarNavigation";
import { useAuth } from "@/context/AuthContext";

export default function AppLayout({ setIsSidebarOpen }) {
    const [searchValue, setSearchValue] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { permissions } = useAuth();

    // Check if current path should show search and filter components
    const shouldShowSearchAndFilter = () => {
        const pathname = location.pathname;
        return pathname === '/myflipbooks/flipbooks' ||
            pathname.startsWith('/myflipbooks/flipbooks/folder/') ||
            pathname === '/myflipbooks/template' ||
            pathname.startsWith('/myflipbooks/template/folder/');
    };

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <header className="fixed top-0 left-0 right-0 z-10 bg-white">
                    <div className="flex h-16 w-full justify-between shrink-0 items-center px-4 md:px-6">
                        <div className="flex items-center gap-2 sm:gap-3 px-3 pr-2 py-2">
                            <div
                                className="relative flex items-center cursor-pointer"
                                onClick={() => navigate("/myflipbooks/flipbooks")}
                            >
                                <img src="/assets/logo.png" width={200} className="my-2" alt="Logo" />
                                <span className="absolute -right-6 top-3 bg-purple-600 text-white text-[9px] font-bold px-1.5 py-[1px] rounded cursor-default">
                                    BETA
                                </span>
                            </div>
                        </div>

                        {shouldShowSearchAndFilter() && (
                            <div className="relative md:flex gap-6 hidden">
                                <SearchInputCom
                                    searchValue={searchValue}
                                    setSearchValue={setSearchValue}
                                />
                                {permissions?.flipbooksFilter && <FilterCom />}
                            </div>
                        )}
                        <div className="flex md:gap-6 gap-2 items-center">
                            {permissions?.createDropdown && <CreateDropDownCom />}
                            <ProfileDropDownCom />
                        </div>
                    </div>
                    {shouldShowSearchAndFilter() && (
                        <div className="h-12 relative flex gap-2 justify-end mx-4 mt-1 md:hidden items-center">
                            <SearchInputCom
                                searchValue={searchValue}
                                setSearchValue={setSearchValue}
                            />
                            {permissions?.flipbooksFilter && <FilterCom />}
                        </div>
                    )}
                    <div className="md:hidden px-4 py-3 sticky top-0 bg-white z-10">
                        <AppBreadcrumbs />
                    </div>
                </header>

                <div className="flex-1 z-0 max-md:flex md:mt-[64px] max-md:mt-[156px] max-md:mb-[80px] overflow-y-auto">
                    <div className="flex flex-1">
                        <div className="hidden relative md:flex h-[calc(var(--vh, 1vh) * 100 - 64px)] flex-col items-center justify-between overflow-hidden">
                            <SidebarProvider value={{ selectedItem, setSelectedItem, width: "15rem" }}>
                                <SidebarNavigation setIsSidebarOpen={setIsSidebarOpen} />
                                <AppSidebar />
                            </SidebarProvider>
                        </div>

                        <div className="flex flex-1 flex-col md:max-h-[calc(100vh-64px)] md:overflow-y-auto">
                            <div className="hidden py-4 md:block px-4 sticky top-0 bg-white z-10 border-t">
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