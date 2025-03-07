import { useState, useEffect } from "react";
import FilterCom from "./components/Filter/FilterCom";
import CreateDropDownCom from "./components/CreateDropDownCom";
import ProfileDropDownCom from "./components/ProfileDropDownCom";
import SearchInputCom from "./components/SearchInputCom";
import SidebarNavigation from "./components/SidebarNavigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import BottomSidebarNavigation from "./components/BottomSidebarNavigation";
import {
    EllipsisVertical,
    Eye,
    NotebookTabs,
    Pencil,
    SlidersHorizontal,
    ChartPie,
    Send,
    Upload,
    Sparkles,
} from 'lucide-react';

export default function MyFlipbooks() {
    const [searchValue, setSearchValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [selectedItem, setSelectedItem] = useState('home');
    const flipbooks = [
        { id: 1, name: "Flipbook 1", created: "March 05, 2025", published: false },
        { id: 2, name: "Flipbook 2", created: "March 04, 2025", published: true },
        { id: 3, name: "Flipbook 3", created: "March 03, 2025", published: false },
        { id: 4, name: "Flipbook 4", created: "March 02, 2025", published: true },
        { id: 5, name: "Flipbook 5", created: "March 01, 2025", published: false },
        { id: 6, name: "Flipbook 6", created: "February 28, 2025", published: true },
    ]
    const handleBlur = (e) => {
        setTimeout(() => {
            if (!e?.currentTarget?.contains(document.activeElement)) {
                setIsFocused(false);
            }
        }, 200);
    };

    const unpublishedButtons = [
        { icon: Pencil, title: "Edit", color: "amber-600", bg: "amber-50", hover: "amber-100" },
        { icon: SlidersHorizontal, title: "Customize", color: "blue-600", bg: "blue-50", hover: "blue-100" },
        { icon: Upload, title: "Publish", color: "green-600", bg: "green-50", hover: "green-100" },
    ];

    const publishedButtons = [
        { icon: Eye, title: "View", color: "blue-600", bg: "blue-50", hover: "blue-100" },
        { icon: NotebookTabs, title: "Details", color: "pink-600", bg: "pink-50", hover: "pink-100" },
        { icon: Pencil, title: "Edit", color: "amber-600", bg: "amber-50", hover: "amber-100" },
        { icon: SlidersHorizontal, title: "Customize", color: "blue-600", bg: "blue-50", hover: "blue-100" },
        { icon: ChartPie, title: "Statistics", color: "amber-600", bg: "amber-50", hover: "amber-100" },
        { icon: Send, title: "Share", color: "green-600", bg: "green-50", hover: "green-100" },
    ];

    return (
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
            <div className="flex-1 mt-[64px] md:mt-[64px] max-md:mt-[112px] max-md:mb-[64px] overflow-y-auto">
                <div className="flex">
                    {/* Sidebar for Desktop */}
                    <div className="hidden relative md:flex h-[calc(var(--vh, 1vh) * 100 - 64px)] flex-col items-center justify-between overflow-hidden">
                        <SidebarProvider value={{ selectedItem, setSelectedItem }}>
                            <SidebarNavigation />
                            <AppSidebar />
                        </SidebarProvider>
                    </div>

                    {/* Content Grid */}
                    <div className="flex-1 md:max-h-[calc(100vh-64px)] md:overflow-y-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mx-4 my-2">
                            {flipbooks.map((flipbook) => (
                                <div
                                    key={flipbook.id}
                                    className="bg-white rounded-xl overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-violet-100"
                                >
                                    <div className="relative group bg-gray-200 backdrop-blur-sm">
                                        <img
                                            src="/src/assets/profile.jpg"
                                            alt="Flipbook Cover"
                                            className="max-h-[200px] h-full m-auto transition-transform duration-500"
                                        />
                                        {/* Ellipsis Menu */}
                                        <div className="absolute top-3 right-3 bg-white/50 p-1.5 rounded-full shadow-sm cursor-pointer hover:bg-violet-50/50 hover:scale-110 transition-all duration-200">
                                            <EllipsisVertical size={16} className="text-violet-700" />
                                        </div>
                                        {/* Status Badge */}
                                        <div className="absolute top-3 left-3 transform transition-transform duration-200 hover:scale-105">
                                            <span className={`text-xs font-medium px-2.5 py-1 rounded-md ${flipbook.published
                                                ? 'bg-green-100/50 text-green-700'
                                                : 'bg-red-100/50 text-red-700'
                                                }`}>
                                                {flipbook.published ? 'Published' : 'Not published'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="px-4 pt-4 mt-[-15px] rounded-t-xl z-[11] relative bg-white">
                                        <div className="flex items-center justify-between ">
                                            <h3 className="font-semibold text-violet-900 mb-1 transition-colors duration-200 hover:text-violet-600">
                                                {flipbook.name}
                                            </h3>
                                            <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-1.5 rounded-full shadow-sm hover:scale-110 transition-all duration-200">
                                                <Sparkles size={16} className="text-white animate-pulse"
                                                />
                                            </div>
                                        </div>

                                        <p className="text-sm text-violet-600">
                                            Created: {flipbook.created}
                                        </p>


                                        <div className="flex gap-2 justify-center py-3 flex-wrap">
                                            
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Fixed Footer */}
            <BottomSidebarNavigation />
        </div>
    );
}