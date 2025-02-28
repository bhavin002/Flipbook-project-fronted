import { useState } from "react";
import FilterCom from "./components/FilterCom"
import CreateDropDownCom from "./components/CreateDropDownCom";
import ProfileDropDownCom from "./components/ProfileDropDownCom";
import SearchInputCom from "./components/SearchInputCom";


export default function MyFlipbooks() {
    const [searchValue, setSearchValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const handleBlur = (e) => {
        setTimeout(() => {
            if (!e?.currentTarget?.contains(document.activeElement)) {
                setIsFocused(false);
            }
        }, 200);
    };

    return (
        <>
            <header className="flex h-20 w-full justify-between shrink-0 items-center px-4 md:px-6">
                <div>
                    <img src="/src/assets/logo.png" width={200} />
                </div>
                <div className="relative md:flex gap-6 hidden" onBlur={handleBlur}>
                    <div>
                        <SearchInputCom searchValue={searchValue} setSearchValue={setSearchValue} isFocused={isFocused} setIsFocused={setIsFocused} />
                    </div>
                    <FilterCom />
                </div>

                <div className="flex md:gap-6 gap-2 items-center">
                    <CreateDropDownCom />
                    <ProfileDropDownCom />

                </div>
            </header>
            <div className="relative flex gap-2 justify-end mx-4 md:hidden" onBlur={handleBlur}>
                <div className="w-full">
                    <SearchInputCom searchValue={searchValue} setSearchValue={setSearchValue} isFocused={isFocused} setIsFocused={setIsFocused} />
                </div>
                <FilterCom />
            </div>
        </>
    )
}