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
import { AppContent } from "./components/AppContent";

export default function MyFlipbooks() {
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
            <header className="flex h-16 w-full justify-between shrink-0 items-center px-4 md:px-6">
                <div>
                    <img src="/src/assets/logo.png" width={200} />
                </div>
                <div className="relative md:flex gap-6 hidden" onBlur={handleBlur}>
                    <div>
                        <SearchInputCom
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                            isFocused={isFocused}
                            setIsFocused={setIsFocused}
                        />
                    </div>
                    <FilterCom />
                </div>
                <div className="flex md:gap-6 gap-2 items-center">
                    <CreateDropDownCom />
                    <ProfileDropDownCom />
                </div>
            </header>
            <div className="flex">
                <div className="hidden relative md:flex h-[calc(100vh-64px)] flex-col items-center justify-between overflow-hidden">
                    <SidebarProvider
                        value={{
                            selectedItem,
                            setSelectedItem,
                        }}
                    >
                        <SidebarNavigation />
                        <AppSidebar />
                    </SidebarProvider>
                </div>
                <BottomSidebarNavigation />
                <div className="flex-1">
                    <div className="relative flex gap-2 justify-end mx-4 md:hidden" onBlur={handleBlur}>
                        <div className="w-full">
                            <SearchInputCom
                                searchValue={searchValue}
                                setSearchValue={setSearchValue}
                                isFocused={isFocused}
                                setIsFocused={setIsFocused}
                            />
                        </div>
                        <FilterCom />
                    </div>
                    <AppContent selectedItem={selectedItem}/>
                </div>
            </div>

        </>
    )
}