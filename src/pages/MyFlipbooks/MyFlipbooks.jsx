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
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from 'lucide-react';
import { Eye } from 'lucide-react';
import { NotebookTabs } from 'lucide-react';
import { Pencil } from 'lucide-react';
import { SlidersHorizontal } from 'lucide-react';
import { ChartPie } from 'lucide-react';
import { Send } from 'lucide-react';
import { ScreenShare } from 'lucide-react';


export default function MyFlipbooks() {
    const [searchValue, setSearchValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [selectedItem, setSelectedItem] = useState('home'); // Add selectedItem state

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
                <div className="flex-1  mx-[15px] rounded-[10px]">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-xl overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-violet-100"
                            >
                                <div className="relative group bg-gray-200 backdrop-blur-sm">
                                    <img
                                        src="/src/assets/profile.jpg"
                                        alt="Flipbook Cover"
                                        className="max-h-[200px] h-full  m-auto transition-transform duration-500 "
                                    />
                                    <div className="absolute top-3 right-3 bg-white/50 p-1.5 rounded-full shadow-sm cursor-pointer hover:bg-violet-50/50 hover:scale-110 transition-all duration-200">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-violet-700">
                                            <circle cx="12" cy="12" r="1"></circle>
                                            <circle cx="19" cy="12" r="1"></circle>
                                            <circle cx="5" cy="12" r="1"></circle>
                                        </svg>
                                    </div>
                                    <div className="absolute top-3 left-3 transform transition-transform duration-200 hover:scale-105">
                                        <span className="text-xs font-medium px-2.5 py-1 bg-red-100/50 text-red-700 rounded-md">
                                            Not published
                                        </span>
                                    </div>

                                    {/* Overlay effect on hover */}
                                    {/* <div className="absolute inset-0 bg-gradient-to-t from-violet-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}
                                </div>

                                <div className="p-4 mt-[-15px] rounded-t-xl z-[11] relative bg-white">
                                    <h3 className="font-semibold text-violet-900 mb-1 transition-colors duration-200 hover:text-violet-600">Flipbook Name</h3>
                                    <p className="text-sm text-violet-600 mb-4">Created: March 05, 2025</p>

                                    <div className="flex gap-2 justify-center py-1">
                                        <button className="p-2 rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 hover:scale-110 transition-all duration-200" title="View">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                <circle cx="12" cy="12" r="3"></circle>
                                            </svg>
                                        </button>
                                        <button className="p-2 rounded-lg text-pink-600 bg-pink-50 hover:bg-pink-100 hover:scale-110 transition-all duration-200" title="Edit content">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                                            </svg>
                                        </button>
                                        <button className="p-2 rounded-lg text-amber-600 bg-amber-50 hover:bg-amber-100 hover:scale-110 transition-all duration-200" title="Edit">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M12 20h9"></path>
                                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                            </svg>
                                        </button>
                                        <button className="p-2 rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 hover:scale-110 transition-all duration-200" title="Settings">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="4" y1="21" x2="4" y2="14"></line>
                                                <line x1="4" y1="10" x2="4" y2="3"></line>
                                                <line x1="12" y1="21" x2="12" y2="12"></line>
                                                <line x1="12" y1="8" x2="12" y2="3"></line>
                                                <line x1="20" y1="21" x2="20" y2="16"></line>
                                                <line x1="20" y1="12" x2="20" y2="3"></line>
                                                <line x1="1" y1="14" x2="7" y2="14"></line>
                                                <line x1="9" y1="8" x2="15" y2="8"></line>
                                                <line x1="17" y1="16" x2="23" y2="16"></line>
                                            </svg>
                                        </button>
                                        <button className="p-2 rounded-lg text-pink-600 bg-pink-50 hover:bg-pink-100 hover:scale-110 transition-all duration-200" title="Analytics">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                                                <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                                            </svg>
                                        </button>
                                        <button className="p-2 rounded-lg text-amber-600 bg-amber-50 hover:bg-amber-100 hover:scale-110 transition-all duration-200" title="Share">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M22 2L11 13"></path>
                                                <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* </div> */}
                </div>
            </div>

        </>
    )
}

// ai view details edit custmize stake share more