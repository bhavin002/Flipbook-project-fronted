import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Check, Copy, Info, Crown, Mail, Pencil, Eye, Edit, SlidersHorizontal } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import ChangeVisibilityDialog from "./ChangeVisibilityDialog";
import { CalanderDialog } from "./CalanderDialog";
import { useEffect, useState } from "react";
import FlipBookPreview from "@/components/EditorLayoutComponents/Preview/Components/FlipBookPreview";
import { toast } from "sonner";
import { GetFlipbookDetailsApi, UpdateFlipbookDetailsApi } from "@/service/flipbook.publish.service";
import { format } from "date-fns";
import { DetailsTabSkeleton } from "@/utils/Skeleton";
import { VisibilityType } from "@/utils/enum";
import { useNavigate } from "react-router-dom";
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    LinkedinShareButton,
} from "react-share";

export default function DetailsTab({ flipbookId, flipbookDetails, isLoading, setFlipbookDetails }) {
    const [copied, setCopied] = useState(false);
    const [isVisibilityDialogOpen, setVisibilityDialogOpen] = useState(false);
    const [checkedIsVisible, setCheckedIsVisible] = useState(false);
    const [checkedIsPublishDtVisible, setCheckedIsPublishDtVisible] = useState(false);
    const navigate = useNavigate();

    const handleCopy = () => {
        const shareUrl = `${import.meta.env.VITE_APP_URL}/public-flipbook/${flipbookId}`;
        navigator.clipboard.writeText(shareUrl)
            .then(() => {
                setCopied(true);
                toast.success("Link copied to clipboard!");
                setTimeout(() => setCopied(false), 2000);
            })
            .catch(() => {
                toast.error("Failed to copy link");
            });
    }

    // Always define these after flipbookDetails is available
    const publishData = flipbookDetails?.publishFlipbookData || {};
    const flipbookData = flipbookDetails?.flipbookData || {};

    useEffect(() => {
        setCheckedIsVisible(!!publishData.isVisible);
        setCheckedIsPublishDtVisible(!!publishData.isPublishDtVisible);
    }, [publishData.isVisible, publishData.isPublishDtVisible]);

    const handleToggleIsVisible = async (checked) => {
        setCheckedIsVisible(checked);
        try {
            const response = await UpdateFlipbookDetailsApi({
                flipbookId,
                isVisible: checked,
            });
            setFlipbookDetails(response.data);
            toast.success("Success", { description: response.message });
        } catch (err) {
            toast.error("Failed to update visibility", { description: err?.message || "Something went wrong." });
            setCheckedIsVisible(!checked);
        }
    };

    const handleToggleIsPublishDtVisible = async (checked) => {
        setCheckedIsPublishDtVisible(checked);
        try {
            const response = await UpdateFlipbookDetailsApi({
                flipbookId,
                isPublishDtVisible: checked,
            });
            setFlipbookDetails(response.data);
            toast.success("Success", { description: response.message });
        } catch (err) {
            toast.error("Failed to update publish date visibility", { description: err?.message || "Something went wrong." });
            setCheckedIsPublishDtVisible(!checked);
        }
    };

    if (isLoading) {
        return <DetailsTabSkeleton />;
    }

    const shareUrl = `${import.meta.env.VITE_APP_URL}/public-flipbook/${flipbookId}`;

    return (
        <div className="py-6 max-w-[100vw] overflow-auto space-y-4">
            <div className="p-6 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                <h1 className="text-2xl font-bold mb-2">Details of <span className="text-primary">{flipbookData.name || "New Flipbook"}</span></h1>
                <p className="text-gray-500">Access share, embed and download options, as well as statistics.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Share link</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Input
                            value={`${import.meta.env.VITE_APP_URL}/public-flipbook/${flipbookId}`}
                            readOnly
                        />
                        <Button variant="outline" onClick={handleCopy}>
                            {copied ? (
                                <>
                                    <Check className="h-4 w-4 mr-2" />
                                    Copied
                                </>
                            ) : (
                                <>
                                    <Copy className="h-4 w-4 mr-2" />
                                    Copy
                                </>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <div className="flex gap-4 max-md:flex-wrap">
                <div className="lg:w-[40%] w-full">
                    <Card className="shadow-sm rounded-lg mb-4">
                        <CardHeader>
                            <CardTitle>Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded-md w-full">
                                    <div className="text-gray-500 text-sm">Created on</div>
                                    <div className="font-medium">{publishData.createdOn ? format(new Date(publishData.createdOn), "MMM dd, yyyy") : "--"}</div>
                                </div>
                                <div className="flex justify-between w-full bg-gray-50 p-4 gap-4 items-center rounded-md">
                                    <div>
                                        <div className="text-gray-500 text-sm">Published on</div>
                                        <div className="font-medium">{publishData.publishedOn ? format(new Date(publishData.publishedOn), "MMM dd, yyyy") : "--"}</div>
                                    </div>
                                    <CalanderDialog
                                        flipbookId={flipbookId}
                                        publishedOn={publishData.publishedOn}
                                        setFlipbookDetails={setFlipbookDetails}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 w-full p-4 rounded-md">
                                    <div className="text-gray-500 text-sm">Created by</div>
                                    <div className="font-medium w-full truncate">{publishData.createdBy || "--"}</div>
                                </div>
                                <div className="bg-gray-50 w-full p-4 rounded-md">
                                    <div className="text-gray-500 text-sm">Last updated on</div>
                                    <div className="font-medium">{publishData.updatedOn ? format(new Date(publishData.updatedOn), "MMM dd, yyyy") : "--"}</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex justify-between bg-gray-50 w-full p-4 gap-4 items-center rounded-md">
                                    <div>
                                        <div className="text-gray-500 text-sm">Visibility</div>
                                        <div className="font-medium">{VisibilityType[publishData.visibility] || "--"}</div>
                                    </div>
                                    <Button variant="ghost" size="sm" onClick={() => setVisibilityDialogOpen(true)}>
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <ChangeVisibilityDialog open={isVisibilityDialogOpen} setOpen={setVisibilityDialogOpen} flipbookId={flipbookId} setFlipbookDetails={setFlipbookDetails} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Download</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="border rounded-md p-4 flex justify-between items-center">
                                    <div className="flex items-center">
                                        <div className="text-gray-400 mr-2">
                                            <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>pdf-icon</title><g fillRule="nonzero" fill="none"><path d="M12.2404969 0H4.22198758C3.05055901 0 2.09714286.95407867 2.09714286 2.12484472v4.86215435H.83291773C.3601227 6.98699907 0 7.52679089 0 8v7.2227558c0 .4731677.39729912.8561905.87013556.8561905h1.26422512l-.03721782 1.7605568c0 1.1720497.95341615 2.1248447 2.12484472 2.1248447l11.66322272-.0253526c1.1706833 0 2.1242236-.9528365 2.1242236-2.1248448V5.00359143L12.2404969 0zm2.9590266 18.0130475H4.84892957c-.45358178 0-.83444229-.3780235-.83444229-.8322264l.01209525-1.1018748H16.1776159c.4728779 0 .8562733-.3830228.8562733-.8561905l-.0372178-7.37948344c0-.47320911-.3833954-.85627329-.8562733-.85627329H4.02076116l-.03139645-4.15758099c0-.45291925.36939958-.82227743.82293996-.82227743l6.23207083-.0078675v2.50522893c0 .81316771.659793 1.47358178 1.4735818 1.47358178l3.4775876-.00782608.0262146 11.21918722c0 .4542443-.3686957.8236025-.822236.8236025z" fill="#000" fillOpacity=".87"></path><path d="M4.44943842 13.7244534v-1.4955078h.678125c.53684896 0 .95916341-.1286621 1.26694336-.3859864.30777994-.2573242.46166992-.6009277.46166992-1.0308105 0-.290625-.07114258-.550472-.21342774-.779541-.14228515-.22906904-.34309895-.40566409-.6024414-.52978518-.25934245-.1241211-.55753581-.18618164-.89458008-.18618164H3.38684076v4.40781252h1.06259766zm0-2.315918V10.137051h.70839844c.19173177.0020183.34309895.0645834.45410156.1876953.1110026.123112.1665039.2875977.1665039.4934571 0 .1876953-.05398763.3330078-.16196289.4359375-.10797526.1029297-.26489257.1543945-.47075195.1543945h-.69628906zm4.52294922 2.315918c.38144531-.0020183.72706705-.0933431 1.03686526-.2739746.3097981-.1806315.5499674-.430892.7205078-.7507813.1705403-.3198893.2558105-.6816569.2558105-1.0853027v-.202832c-.0020182-.3996094-.0903157-.7603679-.2648925-1.0822754-.1745769-.3219076-.4172689-.57115889-.72807622-.74775395-.31080729-.17659505-.66097005-.26489257-1.05048828-.26489257H7.52228998v4.40781252h1.45009766zm-.3875-.8173828V10.137051h.35722656c.31282552 0 .55097656.1079753.71445312.3239258.16347657.2159505.24521485.536849.24521485.9626953v.1907227c0 .4278646-.08173828.7502767-.24521485.9672363-.16347656.2169596-.39759114.3254395-.70234375.3254395h-.36933593zm4.10820316.8173828V11.968594h1.7134765v-.8173828h-1.7134765V10.137051h1.8860351v-.82041012h-2.9486328v4.40781252h1.0625977z" fill="#FFF"></path></g></svg>
                                        </div>
                                        <div>PDF for web</div>
                                    </div>
                                    <Crown className="h-5 w-5 text-amber-400 shrink-0" />
                                </div>

                                <div className="border rounded-md p-4 flex justify-between items-center">
                                    <div className="flex items-center">
                                        <div className="text-gray-400 mr-2">
                                            <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>pdf-icon</title><g fillRule="nonzero" fill="none"><path d="M12.2404969 0H4.22198758C3.05055901 0 2.09714286.95407867 2.09714286 2.12484472v4.86215435H.83291773C.3601227 6.98699907 0 7.52679089 0 8v7.2227558c0 .4731677.39729912.8561905.87013556.8561905h1.26422512l-.03721782 1.7605568c0 1.1720497.95341615 2.1248447 2.12484472 2.1248447l11.66322272-.0253526c1.1706833 0 2.1242236-.9528365 2.1242236-2.1248448V5.00359143L12.2404969 0zm2.9590266 18.0130475H4.84892957c-.45358178 0-.83444229-.3780235-.83444229-.8322264l.01209525-1.1018748H16.1776159c.4728779 0 .8562733-.3830228.8562733-.8561905l-.0372178-7.37948344c0-.47320911-.3833954-.85627329-.8562733-.85627329H4.02076116l-.03139645-4.15758099c0-.45291925.36939958-.82227743.82293996-.82227743l6.23207083-.0078675v2.50522893c0 .81316771.659793 1.47358178 1.4735818 1.47358178l3.4775876-.00782608.0262146 11.21918722c0 .4542443-.3686957.8236025-.822236.8236025z" fill="#000" fillOpacity=".87"></path><path d="M4.44943842 13.7244534v-1.4955078h.678125c.53684896 0 .95916341-.1286621 1.26694336-.3859864.30777994-.2573242.46166992-.6009277.46166992-1.0308105 0-.290625-.07114258-.550472-.21342774-.779541-.14228515-.22906904-.34309895-.40566409-.6024414-.52978518-.25934245-.1241211-.55753581-.18618164-.89458008-.18618164H3.38684076v4.40781252h1.06259766zm0-2.315918V10.137051h.70839844c.19173177.0020183.34309895.0645834.45410156.1876953.1110026.123112.1665039.2875977.1665039.4934571 0 .1876953-.05398763.3330078-.16196289.4359375-.10797526.1029297-.26489257.1543945-.47075195.1543945h-.69628906zm4.52294922 2.315918c.38144531-.0020183.72706705-.0933431 1.03686526-.2739746.3097981-.1806315.5499674-.430892.7205078-.7507813.1705403-.3198893.2558105-.6816569.2558105-1.0853027v-.202832c-.0020182-.3996094-.0903157-.7603679-.2648925-1.0822754-.1745769-.3219076-.4172689-.57115889-.72807622-.74775395-.31080729-.17659505-.66097005-.26489257-1.05048828-.26489257H7.52228998v4.40781252h1.45009766zm-.3875-.8173828V10.137051h.35722656c.31282552 0 .55097656.1079753.71445312.3239258.16347657.2159505.24521485.536849.24521485.9626953v.1907227c0 .4278646-.08173828.7502767-.24521485.9672363-.16347656.2169596-.39759114.3254395-.70234375.3254395h-.36933593zm4.10820316.8173828V11.968594h1.7134765v-.8173828h-1.7134765V10.137051h1.8860351v-.82041012h-2.9486328v4.40781252h1.0625977z" fill="#FFF"></path></g></svg>
                                        </div>
                                        <div>PDF for print</div>
                                    </div>
                                    <Crown className="h-5 w-5 text-amber-400 shrink-0" />
                                </div>

                                <div className="border rounded-md p-4 flex justify-between items-center">
                                    <div className="flex items-center">
                                        <div className="text-gray-400 mr-2">
                                            <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>jpg-icon</title><g fillRule="nonzero" fill="none"><path d="M12.2404969 0H4.22198758C3.05055901 0 2.09714286.95407867 2.09714286 2.12484472v4.86215435H.83291773C.3601227 6.98699907 0 7.52679089 0 8v7.2227558c0 .4731677.39729912.8561905.87013556.8561905h1.26422512l-.03721782 1.7605568c0 1.1720497.95341615 2.1248447 2.12484472 2.1248447l11.66322272-.0253526c1.1706833 0 2.1242236-.9528365 2.1242236-2.1248448V5.00359143L12.2404969 0zm2.9590266 18.0130475H4.84892957c-.45358178 0-.83444229-.3780235-.83444229-.8322264l.01209525-1.1018748H16.1776159c.4728779 0 .8562733-.3830228.8562733-.8561905l-.0372178-7.37948344c0-.47320911-.3833954-.85627329-.8562733-.85627329H4.02076116l-.03139645-4.15758099c0-.45291925.36939958-.82227743.82293996-.82227743l6.23207083-.0078675v2.50522893c0 .81316771.659793 1.47358178 1.4735818 1.47358178l3.4775876-.00782608.0262146 11.21918722c0 .4542443-.3686957.8236025-.822236.8236025z" fill="#000" fillOpacity=".87"></path><path d="M4.60566406 13.5605469c.28658854 0 .54643555-.0605469.77954102-.1816407.23310547-.1210937.41474609-.2916341.54492187-.511621.13017578-.219987.19526368-.4702474.19526368-.7507813V9.0921875H5.06582031v3.0243164c0 .1977865-.03986002.3516764-.11958008.4616699-.07972005.1099935-.19324544.1649903-.34057617.1649903-.16347656 0-.28002929-.0454102-.3496582-.1362305-.06962891-.0908203-.10444336-.2371419-.10444336-.4389648h-1.065625c0 .4440104.13320313.7871093.39960938 1.0292968s.63977864.3632813 1.12011718.3632813zM7.95703125 13.5v-1.4955078h.678125c.53684896 0 .95916341-.1286621 1.26694336-.3859863.30777999-.2573243.46166989-.6009278.46166989-1.0308106 0-.290625-.0711425-.550472-.2134277-.779541-.1422852-.22906901-.34309896-.40566407-.60244141-.52978516-.25934245-.12412109-.55753581-.18618164-.89458008-.18618164H6.89443359V13.5h1.06259766zm.69628906-2.315918h-.69628906V9.91259766h.70839844c.19173177.00201823.34309896.06458333.45410156.18769534.1110026.1231119.16650391.2875976.16650391.493457 0 .1876953-.05398763.3330078-.16196289.4359375-.10797526.1029297-.26489258.1543945-.47075196.1543945zm4.23232419 2.3764649c.3753907 0 .7205078-.0555013 1.0353516-.1665039.3148437-.1110026.5540039-.2573242.7174805-.4389649v-1.8103515H12.837207v.7295898h.7386719v.6841797c-.1352213.123112-.3410807.184668-.6175781.184668-.3229167 0-.5595541-.1104981-.7099121-.3314942-.1503581-.2209961-.2255371-.5514811-.2255371-.9914551v-.2664062c.0020182-.4197917.0756836-.7427083.2209961-.96875.1453125-.22604167.3511718-.33906251.6175781-.33906251.2220052 0 .3935547.05247396.5146484.15742191.1210938.1049479.1998047.2805338.2361328.5267578h1.0232422c-.0504557-.4985026-.2275553-.87338869-.5312988-1.12465822-.3037435-.25126953-.7300944-.3769043-1.2790527-.3769043-.3753907 0-.7058757.08728841-.9914551.26186524-.2855794.17457682-.5050619.42382812-.6584473.74775388-.1533854.3239258-.2300781.7028483-.2300781 1.1367676l.0030273.3814453c.0242188.6296875.2088868 1.1211263.5540039 1.4743164.3451172.3531901.8062826.5297852 1.3834961.5297852z" fill="#FFF"></path></g></svg>
                                        </div>
                                        <div>JPG</div>
                                    </div>
                                    <Crown className="h-5 w-5 text-amber-400 shrink-0" />
                                </div>

                                <div className="border rounded-md p-4 flex justify-between items-center">
                                    <div className="flex items-center">
                                        <div className="text-gray-400 mr-2">
                                            <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>png-icon</title><g fillRule="nonzero" fill="none"><path d="M12.2404969 0H4.22198758C3.05055901 0 2.09714286.95407867 2.09714286 2.12484472v4.86215435H.83291773C.3601227 6.98699907 0 7.52679089 0 8v7.2227558c0 .4731677.39729912.8561905.87013556.8561905h1.26422512l-.03721782 1.7605568c0 1.1720497.95341615 2.1248447 2.12484472 2.1248447l11.66322272-.0253526c1.1706833 0 2.1242236-.9528365 2.1242236-2.1248448V5.00359143L12.2404969 0zm2.9590266 18.0130475H4.84892957c-.45358178 0-.83444229-.3780235-.83444229-.8322264l.01209525-1.1018748H16.1776159c.4728779 0 .8562733-.3830228.8562733-.8561905l-.0372178-7.37948344c0-.47320911-.3833954-.85627329-.8562733-.85627329H4.02076116l-.03139645-4.15758099c0-.45291925.36939958-.82227743.82293996-.82227743l6.23207083-.0078675v2.50522893c0 .81316771.659793 1.47358178 1.4735818 1.47358178l3.4775876-.00782608.0262146 11.21918722c0 .4542443-.3686957.8236025-.822236.8236025z" fill="#000" fillOpacity=".87"></path><path d="M3.93813477 13.5v-1.4955078h.678125c.53684895 0 .95916341-.1286621 1.26694335-.3859863.30777995-.2573243.46166993-.6009278.46166993-1.0308106 0-.290625-.07114258-.550472-.21342774-.779541-.14228515-.22906901-.34309896-.40566407-.6024414-.52978516-.25934245-.12412109-.55753581-.18618164-.89458008-.18618164H2.87553711V13.5h1.06259766zm.69628906-2.315918h-.69628906V9.91259766h.70839843c.19173177.00201823.34309896.06458333.45410157.18769534.1110026.1231119.1665039.2875976.1665039.493457 0 .1876953-.05398763.3330078-.16196289.4359375-.10797526.1029297-.26489258.1543945-.47075195.1543945zM8.07358398 13.5v-2.7427734L9.63569336 13.5h1.05654294V9.0921875H9.63266602v2.7427734L8.07358398 9.0921875H7.01098633V13.5h1.06259765zm5.24648442.0605469c.3753906 0 .7205078-.0555013 1.0353515-.1665039.3148437-.1110026.5540039-.2573242.7174805-.4389649v-1.8103515H12.837207v.7295898h.7386719v.6841797c-.1352213.123112-.3410807.184668-.6175781.184668-.32291666 0-.55955403-.1104981-.7099121-.3314942-.15035808-.2209961-.22553711-.5514811-.22553711-.9914551v-.2664062c.00201823-.4197917.07568359-.7427083.22099609-.96875.1453125-.22604167.35117187-.33906251.61757812-.33906251.22200521 0 .39355469.05247396.51464844.15742191.12109375.1049479.19980469.2805338.23613281.5267578h1.02324219c-.05045573-.4985026-.22755534-.87338869-.53129883-1.12465822-.30374349-.25126953-.7300944-.3769043-1.27905273-.3769043-.37539063 0-.70587565.08728841-.99145508.26186524-.28557943.17457682-.50506185.42382812-.65844726.74775388-.15338542.3239258-.23007813.7028483-.23007813 1.1367676l.00302734.3814453c.02421875.6296875.20888672 1.1211263.55400391 1.4743164.34511719.3531901.80628255.5297852 1.38349609.5297852zM9.74755859 13.5V9.0921875H8.68798828V13.5h1.05957031zm2.20126951 0v-1.7558594h1.7134766v-.8173828h-1.7134766V9.91259766h1.8860352V9.0921875h-2.9486328V13.5h1.0625976z" fill="#FFF"></path></g></svg>
                                        </div>
                                        <div>PNG</div>
                                    </div>
                                    <Crown className="h-5 w-5 text-amber-400 shrink-0" />
                                </div>

                                <div className="border rounded-md p-4 flex justify-between items-center">
                                    <div className="flex items-center">
                                        <div className="text-gray-400 mr-2">
                                            <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>gif-icon</title><g fillRule="nonzero" fill="none"><path d="M12.2404969 0H4.22198758C3.05055901 0 2.09714286.95407867 2.09714286 2.12484472v4.86215435H.83291773C.3601227 6.98699907 0 7.52679089 0 8v7.2227558c0 .4731677.39729912.8561905.87013556.8561905h1.26422512l-.03721782 1.7605568c0 1.1720497.95341615 2.1248447 2.12484472 2.1248447l11.66322272-.0253526c1.1706833 0 2.1242236-.9528365 2.1242236-2.1248448V5.00359143L12.2404969 0zm2.9590266 18.0130475H4.84892957c-.45358178 0-.83444229-.3780235-.83444229-.8322264l.01209525-1.1018748H16.1776159c.4728779 0 .8562733-.3830228.8562733-.8561905l-.0372178-7.37948344c0-.47320911-.3833954-.85627329-.8562733-.85627329H4.02076116l-.03139645-4.15758099c0-.45291925.36939958-.82227743.82293996-.82227743l6.23207083-.0078675v2.50522893c0 .81316771.659793 1.47358178 1.4735818 1.47358178l3.4775876-.00782608.0262146 11.21918722c0 .4542443-.3686957.8236025-.822236.8236025z" fillOpacity=".87" fill="#000"></path><path d="M5.84492187 13.5605469c.37539063 0 .72050782-.0555013 1.03535157-.1665039s.5540039-.2573242.71748047-.4389649v-1.8103515H5.79648437v.7295898h.73867188v.6841797c-.13522135.123112-.34108073.184668-.61757813.184668-.32291666 0-.55955403-.1104981-.7099121-.3314942-.15035808-.2209961-.22553711-.5514811-.22553711-.9914551v-.2664062c.00201823-.4197917.07568359-.7427083.22099609-.96875.1453125-.22604167.35117187-.33906251.61757812-.33906251.22200521 0 .39355469.05247396.51464844.15742191.12109375.1049479.19980469.2805338.23613281.5267578h1.02324219c-.05045573-.4985026-.22755534-.87338869-.53129883-1.12465822-.30374349-.25126953-.7300944-.3769043-1.27905273-.3769043-.37539063 0-.70587565.08728841-.99145508.26186524-.28557943.17457682-.50506185.42382812-.65844726.74775388-.15338542.3239258-.23007813.7028483-.23007813 1.1367676l.00302734.3814453c.02421875.6296875.20888672 1.1211263.55400391 1.4743164.34511719.3531901.80628255.5297852 1.38349609.5297852zM9.74755859 13.5V9.0921875H8.68798828V13.5h1.05957031zm2.20126951 0v-1.7558594h1.7134766v-.8173828h-1.7134766V9.91259766h1.8860352V9.0921875h-2.9486328V13.5h1.0625976z" fill="#FFF"></path></g></svg>
                                        </div>
                                        <div>GIF</div>
                                    </div>
                                    <Crown className="h-5 w-5 text-amber-400 shrink-0" />
                                </div>

                                <div className="border rounded-md p-4 flex justify-between items-center">
                                    <div className="flex items-center">
                                        <div className="text-gray-400 mr-2">
                                            <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>mp4-icon</title><path d="M12.1992644 0H4.13655692C2.9586714 0 2 .95578246 2 2.12863925V17.8713607C2 19.0455035 2.9586714 20 4.13655692 20l11.72751068-.0253979c1.1771361 0 2.1359324-.954538 2.1359324-2.1286393V5.01252681L12.1992644 0zM10.99655 2.00284344v2.50970275c0 .81461985.6634298 1.47621329 1.4817042 1.47621329l3.4967562-.00784006.026359 11.23922238c0 .4550555-.3707279.8250732-.8267682.8250732H4.76695463c-.45608194 0-.83904176-.3786985-.83904176-.8337125L3.90265182 2.83447083c0-.45372807.37143573-.82374585.82747603-.82374585L10.99655 2.00284344zM8.33313444 8.89659147c-.27614237 0-.5.22385763-.5.5v4.24789023c0 .0903442.02447826.1790005.07083312.2565459.14168638.2370223.44869044.3143074.68571276.172621l3.55307558-2.1239451c.0709192-.0423938.1302272-.1017018.172621-.172621.1416864-.2370223.0644013-.5440264-.172621-.6857128L8.58968032 8.96742459c-.07754547-.04635486-.16620168-.07083312-.25654588-.07083312z" fill="#000" fillRule="nonzero" fillOpacity=".87"></path></svg>
                                        </div>
                                        <div>MP4</div>
                                    </div>
                                    <Crown className="h-5 w-5 text-amber-400 shrink-0" />
                                </div>

                                <div className="border rounded-md p-4 flex justify-between items-center col-span-1">
                                    <div className="flex items-center">
                                        <div className="text-gray-400 mr-2">
                                            <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>html-icon</title><g fill="none" fillRule="nonzero"><path d="M12.2404969 0H4.22198758C3.05055901 0 2.09714286.95407867 2.09714286 2.12484472v4.86215435H.83291773C.3601227 6.98699907 0 7.52679089 0 8v7.2227558c0 .4731677.39729912.8561905.87013556.8561905h1.26422512l-.03721782 1.7605568c0 1.1720497.95341615 2.1248447 2.12484472 2.1248447l11.66322272-.0253526c1.1706833 0 2.1242236-.9528365 2.1242236-2.1248448V5.00359143L12.2404969 0zm2.9590266 18.0130475H4.84892957c-.45358178 0-.83444229-.3780235-.83444229-.8322264l.01209525-1.1018748H19.1776159c.4728779 0 .8223841-.3830228.8223841-.8561905L19.9966714 8c0-.47320911-.3833954-1.01300093-.8562733-1.01300093H4.02076116l-.03139645-4.15758099c0-.45291925.36939958-.82227743.82293996-.82227743l6.23207083-.0078675v2.50522893c0 .81316771.659793 1.47358178 1.4735818 1.47358178l3.4775876-.00782608.0262146 11.21918722c0 .4542443-.3686957.8236025-.822236.8236025z" fillOpacity=".87" fill="#000"></path><path d="M2.71970437 13.6958855v-1.840625h1.56513671v1.840625h1.05654297V9.28807304H4.28484108v1.74980466H2.71970437V9.28807304H1.65710671v4.40781246h1.06259766zm5.551802 0v-3.5874023h1.32294921v-.82041016H5.91017824v.82041016h1.29873047v3.5874023h1.06259766zm3.02014583 0v-1.0292968l-.1029297-2.1100586 1.0686523 3.1393554h.7023438l1.065625-3.1363281-.1029297 2.1070313v1.0292968h1.0625977zm7.3689453 0v-.8173828h-1.849707V9.28807304h-1.0625977v4.40781246h2.9123047z" fill="#FFF"></path></g></svg>
                                        </div>
                                        <div>HTML5</div>
                                    </div>
                                    <Crown className="h-5 w-5 text-amber-400 shrink-0" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <Card className="shadow-sm flex-grow rounded-lg flex flex-col gap-4 p-4">
                    <FlipBookPreview flipbookId={flipbookId} component={"detailsPage"} />
                    <div className="flex gap-5 items-center">
                        <Button
                            variant="outline"
                            onClick={() => {
                                window.open(`/public-flipbook/${flipbookId}`, "_blank");
                            }}
                            className="text-primary cursor-pointer font-medium"
                        >
                            <Eye className="h-4 w-4 mr-2" />
                            View live
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => {
                                navigate(`/editor/${flipbookId}`);
                            }}
                            className="text-primary cursor-pointer font-medium"
                        >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => {
                                navigate(`/customize/${flipbookId}`);
                            }}
                            className="text-primary cursor-pointer font-medium"
                        >
                            <SlidersHorizontal className="h-4 w-4 mr-2" />
                            Customize
                        </Button>
                    </div>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Share</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 flex-wrap">
                        <FacebookShareButton url={shareUrl} quote={"Check out this flipbook!"}>
                            <Button variant="outline">
                                <img className="w-7" src="/assets/social/facebook.png" alt="Facebook" />
                            </Button>
                        </FacebookShareButton>
                        <TwitterShareButton url={shareUrl} title={"Check out this flipbook!"}>
                            <Button variant="outline">
                                <img className="w-7" src="/assets/social/twitter.png" alt="Twitter" />
                            </Button>
                        </TwitterShareButton>
                        <WhatsappShareButton url={shareUrl} title={"Check out this flipbook!"}>
                            <Button variant="outline">
                                <img className="w-7" src="/assets/social/whatsapp.png" alt="Whatsapp" />
                            </Button>
                        </WhatsappShareButton>
                        <LinkedinShareButton url={shareUrl} title={"Check out this flipbook!"}>
                            <Button variant="outline">
                                <img className="w-7" src="/assets/social/linkedin.png" alt="Linkedin" />
                            </Button>
                        </LinkedinShareButton>
                        <Button variant="outline" onClick={() => {
                            navigate(`/send-email/${flipbookId}`)
                        }}>
                            <Mail /> Send Email
                        </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Input
                            value={`${import.meta.env.VITE_APP_URL}/public-flipbook/${flipbookId}`}
                            readOnly
                        />
                        <Button variant="outline" onClick={handleCopy}>
                            {copied ? (
                                <>
                                    <Check className="h-4 w-4 mr-2" />
                                    Copied
                                </>
                            ) : (
                                <>
                                    <Copy className="h-4 w-4 mr-2" />
                                    Copy
                                </>
                            )}
                        </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="publication"
                            checked={checkedIsVisible}
                            onCheckedChange={handleToggleIsVisible}
                        />
                        <Label htmlFor="publication" className="text-sm font-medium leading-none">
                            Show publication on my profile
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="publish"
                            checked={checkedIsPublishDtVisible}
                            onCheckedChange={handleToggleIsPublishDtVisible}
                        />
                        <Label htmlFor="publish" className="text-sm font-medium leading-none">
                            Show publish date
                        </Label>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Order printed copies</CardTitle>
                    <CardDescription>Order high-quality printed copies of your publication from our print partner, Peecho.</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center gap-2">
                    <Button disabled>Order printed copies</Button>
                    <Crown className="h-5 w-5 text-amber-400 shrink-0" />
                </CardContent>
            </Card>
        </div>
    )
}
