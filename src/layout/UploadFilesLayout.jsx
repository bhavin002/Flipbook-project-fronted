import ProfileDropDownCom from "../components/AppLayoutComponents/ProfileDropDownCom"
import { Outlet, useNavigate } from "react-router-dom";

export default function UploadFilesLayout() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen">
            <header className="fixed top-0 left-0 right-0 z-10 bg-white">
                <div className="flex h-16 w-full justify-between shrink-0 items-center px-4 md:px-6">
                <div className="cursor-pointer" onClick={() => {
                        navigate("/myflipbooks")
                    }}>
                        <img src="/assets/logo.png" width={200} alt="Logo" />
                    </div>
                    <div className="flex md:gap-6 gap-2 items-center">
                        <ProfileDropDownCom />
                    </div>
                </div>
            </header>

            <div className="max-md:flex mt-[64px] flex overflow-y-auto h-[calc(100vh-64px)]">
                <Outlet />
            </div>
        </div>
    )
}