import { useState } from "react";
import FilterCom from "./components/Filter/FilterCom"
import CreateDropDownCom from "./components/CreateDropDownCom";
import ProfileDropDownCom from "./components/ProfileDropDownCom";
import SearchInputCom from "./components/SearchInputCom";
import SidebarNavigation from "./components/SidebarNavigation";
import {
    SidebarProvider,
} from "@/components/ui/sidebar"
import { AppSidebar } from "./components/AppSidebar";
import BottomSidebarNavigation from "./components/BottomSidebarNavigation";
import { Outlet } from "react-router-dom";

export default function AppLayout({ setIsSidebarOpen,isSidebarOpen }) {
    const [searchValue, setSearchValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [selectedItem, setSelectedItem] = useState('home');


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
                {/* Fixed Header */}
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
                </header>

                {/* Main Content Area */}
                <div className="flex-1 mt-[64px] md:mt-[64px] max-md:mt-[112px] max-md:mb-[80px] overflow-y-auto">
                    <div className="flex">
                        {/* Sidebar for Desktop */}
                        <div className="hidden relative md:flex h-[calc(var(--vh, 1vh) * 100 - 64px)] flex-col items-center justify-between overflow-hidden">
                            <SidebarProvider value={{ selectedItem, setSelectedItem }}>
                                <SidebarNavigation setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen}/>
                                <AppSidebar />
                            </SidebarProvider>
                        </div>

                        {/* Content */}
                        <div className="flex-1 md:max-h-[calc(100vh-64px)] md:overflow-y-auto">
                            <Outlet />
                        </div>
                    </div>
                </div>

                {/* Fixed Footer */}
                <BottomSidebarNavigation />
            </div>
        </>
    )
}