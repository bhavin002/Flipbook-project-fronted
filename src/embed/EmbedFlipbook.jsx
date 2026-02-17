import FlipBookPreview from "@/components/EditorLayoutComponents/Preview/Components/FlipBookPreview";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { FlipbookSettingsProvider } from "@/context/FlipbookSettingsProvider";
import { ShopSettingsProvider } from "@/context/ShopSettingsContext";
import { toast } from "sonner";
import { flipbookVisibility } from "@/utils/enum";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/utils/LoadingButton";
import { Lock } from "lucide-react";
import { GetConfigApi, GetPublishFlipbookApi, VerifyFlipbookPasswordApi } from "@/service/flipbook.publish.service";
import { ResolveDomainApi } from "@/service/custom.domain.service";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { ViewModeProvider } from "@/context/ViewModeContext";
import { Loader } from "@/components/ui/loader";

export default function EmbedFlipbook() {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const startPage = searchParams.get("p");

    const [publicData, setPublicData] = useState(null);
    const [showUnlockDialog, setShowUnlockDialog] = useState(false);
    const [unlockLoading, setUnlockLoading] = useState(false);
    const [unlockError, setUnlockError] = useState("");
    const [password, setPassword] = useState("");
    const [visibilityChecked, setVisibilityChecked] = useState(false);
    const [privateState, setPrivateState] = useState({ status: null, loading: false });
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const passwordInputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (publicData) {
            document.title = publicData.flipbook.name || "Flipbook";

            // Canonical Link
            let canonical = document.head.querySelector('link[rel="canonical"]');
            if (!canonical) {
                canonical = document.createElement('link');
                canonical.setAttribute('rel', 'canonical');
                document.head.appendChild(canonical);
            }

            const host = window.location.host;
            const path = window.location.pathname;
            const systemDomains = ["flipdrag.com", "app.flipdrag.com", "localhost"];
            const isCustom = !systemDomains.includes(host.split(':')[0].toLowerCase());

            if (isCustom) {
                // For custom domains, canonical is the current URL
                canonical.setAttribute('href', `https://${host}${path}`);
            } else {
                // For system domains, maybe point to the public link if desired, 
                // but usually the goal is to make sure custom domains are indexed as primary.
                // We'll leave it as current path for now or target the primary domain.
                canonical.setAttribute('href', `https://${host}${path}`);
            }
        }
    }, [publicData]);

    useEffect(() => {
        async function fetchData() {
            setIsInitialLoading(true);
            try {
                const response = await GetConfigApi(id);
                const flipbookVisibilityConfig = response.data;
                if (flipbookVisibilityConfig.visibility === flipbookVisibility.PUBLIC) {
                    const response = await GetPublishFlipbookApi(id);
                    setPublicData(response.data);
                } else if (flipbookVisibilityConfig.visibility === flipbookVisibility.PASSWORD) {
                    setShowUnlockDialog(true);
                } else if (flipbookVisibilityConfig.visibility === flipbookVisibility.PRIVATE || flipbookVisibilityConfig.visibility === flipbookVisibility.READERS_ONLY) {
                    const fd_access_token = localStorage.getItem("fd_access_token");
                    if (!fd_access_token) {
                        setPrivateState({ status: "no_token", loading: false });
                    } else {
                        setPrivateState({ status: null, loading: true });
                        try {
                            const response = await GetPublishFlipbookApi(id, fd_access_token);
                            setPublicData(response.data);
                            setPrivateState({ status: "access_granted", loading: false });
                        } catch (err) {
                            setPrivateState({ status: "wrong_account", loading: false });
                        }
                    }
                }
                setVisibilityChecked(true);
            } catch (e) {
                // Proactive redirect for custom domains on unauthorized errors
                const host = window.location.host.toLowerCase();
                const systemDomains = ["flipdrag.com", "app.flipdrag.com", "localhost"];
                const isCustom = !systemDomains.some(d => host.includes(d));

                if (isCustom && (e.message?.includes("Unauthorized access") || e.message?.includes("from this domain"))) {
                    try {
                        const domainRes = await ResolveDomainApi();
                        if (domainRes.success && domainRes.data.workspaceId) {
                            navigate(`/profile/${domainRes.data.workspaceId}`, { replace: true });
                            return;
                        }
                    } catch (domainErr) {
                        console.error("Automatic redirect failed", domainErr);
                    }
                }

                toast.error('Failed to fetch flipbook data', {
                    description: e.message,
                });
                setVisibilityChecked(true);
            } finally {
                setIsInitialLoading(false);
            }
        }
        fetchData();
    }, [id]);

    const handleUnlock = async (e) => {
        e.preventDefault();
        setUnlockLoading(true);
        setUnlockError("");
        try {
            const res = await VerifyFlipbookPasswordApi({
                flipbookId: id,
                password: password
            });
            if (res.data.isValid) {
                const response = await GetPublishFlipbookApi(id, res.data.token);
                setPublicData(response.data);
                setShowUnlockDialog(false);
                setPassword("");
                setUnlockError("");
            } else {
                setUnlockError("Invalid password");
                setTimeout(() => {
                    passwordInputRef.current?.focus();
                }, 100);
            }
        } catch (e) {
            setUnlockError("Invalid password");
        } finally {
            setUnlockLoading(false);

        }
    };

    return (

        <>
            {/* Initial Loading State */}
            {isInitialLoading && (
                <Loader />
            )}

            {/* Private State Loading */}
            {!isInitialLoading && privateState.loading && (
                <Loader />
            )}

            <Dialog open={showUnlockDialog} onOpenChange={setShowUnlockDialog}>
                <DialogContent className="sm:max-w-[540px] w-[90vw]" hideClose={true}>
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-center">The flipbook is password protected</DialogTitle>
                        <DialogDescription className="text-md text-center mt-2">Enter the password to view the flipbook</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleUnlock} className="w-full">
                        <div>
                            {unlockError && (
                                <div className="text-red-500 font-medium mb-2">Invalid password</div>
                            )}
                            <Input
                                ref={passwordInputRef}
                                type="password"
                                placeholder={"Password"}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className={`${unlockError ? "border-red-500 focus:outline-none focus-visible:ring-0" : ""}`}
                                autoFocus
                                disabled={unlockLoading}
                            />
                        </div>
                        <DialogFooter className="mt-4">
                            <Button
                                type="submit"
                                disabled={unlockLoading || !password.trim()}
                            >
                                {unlockLoading ? <LoadingButton /> : "Unlock"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            {publicData && (
                <ViewModeProvider>
                    <CurrencyProvider>
                        <FlipbookSettingsProvider publicData={publicData}>
                            <ShopSettingsProvider publicData={publicData}>
                                <div className="h-[100vh] w-[100vw]">
                                    <FlipBookPreview flipbookId={id} component="publicFlipbook" isPublicView={true} publicFlipbookData={publicData.flipbook} startPage={startPage} />
                                </div>
                            </ShopSettingsProvider>
                        </FlipbookSettingsProvider>
                    </CurrencyProvider>
                </ViewModeProvider>
            )}
            {!publicData && privateState.status === "no_token" && visibilityChecked && !isInitialLoading && !privateState.loading && (
                <div className="flex flex-col items-center justify-center h-[100vh] w-[100vw]">
                    <Lock className="w-16 h-16 text-primary mb-6" />
                    <div className="text-2xl font-bold mb-2 text-center">The publication you're trying to access is private.</div>
                    <div className="text-md text-gray-600 mb-6 text-center">Sign in if you received an invitation to view this publication.</div>
                    <div className="flex gap-4">
                        <Button onClick={() => { navigate("/auth/sign-in"); }}>Sign in</Button>
                    </div>
                </div>
            )}
            {!publicData && privateState.status === "wrong_account" && visibilityChecked && !isInitialLoading && !privateState.loading && (
                <div className="flex flex-col items-center justify-center h-[100vh] w-[100vw]">
                    <Lock className="w-16 h-16 text-primary mb-6" />
                    <div className="text-2xl font-bold mb-2 text-center">The publication you're trying to access is private.</div>
                    <div className="text-md text-gray-600 mb-6 text-center">You need to log out and sign in with the account that has access to this flipbook.</div>
                </div>
            )}
            {!publicData && !showUnlockDialog && !privateState.status && visibilityChecked && !isInitialLoading && !privateState.loading && (
                <div className="flex items-center justify-center h-[100vh] w-[100vw] text-lg text-gray-500">This flipbook is no longer available.</div>
            )}
        </>
    );
}