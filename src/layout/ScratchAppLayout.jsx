import ProfileDropDownCom from "../components/AppLayoutComponents/ProfileDropDownCom"
import { Outlet, useNavigate } from "react-router-dom";

export default function ScratchAppLayout() {
    const navigate = useNavigate();

    return (
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
                    <div className="flex md:gap-6 gap-2 items-center">
                        <ProfileDropDownCom />
                    </div>
                </div>
            </header>

            <div className="flex-1 max-md:flex mt-[64px] flex overflow-y-auto">
                <Outlet />
            </div>
        </div>
    )
}