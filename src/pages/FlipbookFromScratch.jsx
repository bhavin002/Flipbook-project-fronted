import { useEffect, useState } from "react";
import {
    Card,
    CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getData } from "@/utils/datas";
import { CreateFlipbookApi, GetPageLayoutsApi } from "@/service/flipbook.service";
import { Loader } from "@/components/ui/loader";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingButton from "@/utils/LoadingButton";
import { CreateTemplateApi } from "@/service/flipbook.service";
import { CreateAdminTemplateApi } from "@/service/template.service";


export default function FlipbookFromScratch() {
    const [isLoading, setIsLoading] = useState(true);
    const [templates, setTemplates] = useState([]);
    const [isFlipbookCreating, setIsFlipbookCreating] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const isTemplate = queryParams.get("ct") === "template";

    useEffect(() => {
        const getPageLayout = async () => {
            try {
                setIsLoading(true);
                const response = await GetPageLayoutsApi();

                if (response.data && response.data.length) {
                    //  select the first template if no template is selected
                    setSelectedTemplate(response.data[0].name);
                    setWidth(response.data[0].width || 1224);
                    setHeight(response.data[0].height || 792);
                    setTemplates(response.data);
                }
            } catch (error) {
                toast.error("Page Layout fetch failed", {
                    description: error.message || "Oops! Something went wrong.",
                });
            } finally {
                setIsLoading(false);
            }
        }
        getPageLayout();
    }, [])

    const pageLayoutData = getData("pageLayoutData");

    const [selectedTemplate, setSelectedTemplate] = useState("Tabloid");
    const [width, setWidth] = useState(selectedTemplate.width || 1224);
    const [height, setHeight] = useState(selectedTemplate.height || 792);

    const handleTemplateSelect = (template) => {
        setSelectedTemplate(template.name);
        setWidth(template.width);
        setHeight(template.height);
    };

    const handleWidthChange = (e) => {
        setWidth(parseInt(e.target.value) || 0);
    };

    const handleHeightChange = (e) => {
        setHeight(parseInt(e.target.value) || 0);
    };

    const create = async () => {
        try {
            setIsFlipbookCreating(true);
            let response;
            if (isTemplate) {
                response = await CreateTemplateApi({
                    width: width,
                    height: height,
                    pages: [{
                        "pageData": JSON.stringify({
                            stageref: null,
                            CANVAS_WIDTH: width,
                            CANVAS_HEIGHT: height,
                            shapes: [],
                            selectedShapes: [],
                            background: "#fff"
                        })
                    }]
                });
                const templateId = response.data.bookId;
                navigate(`/editor/${templateId}`);
            } else {
                response = await CreateFlipbookApi({
                    width: width,
                    height: height,
                    pages: [{
                        "pageData": JSON.stringify({
                            stageref: null,
                            CANVAS_WIDTH: width,
                            CANVAS_HEIGHT: height,
                            shapes: [],
                            selectedShapes: [],
                            background: "#fff"
                        })
                    }]
                });
                const flipBookId = response.data.bookId;
                navigate(`/editor/${flipBookId}`);
            }
        } catch (error) {
            toast.error(isTemplate ? "Template creation failed" : "Flipbook creation failed", {
                description: error.message || "Oops! Something went wrong.",
            });
        } finally {
            setIsFlipbookCreating(false);
        }
    }

    // const create = async () => {
    //     try {
    //         setIsFlipbookCreating(true);
    //         const response = await CreateAdminTemplateApi({
    //             width: width,
    //             height: height,
    //             pages: [{
    //                 "pageData": JSON.stringify({
    //                     stageref: null,
    //                     CANVAS_WIDTH: width,
    //                     CANVAS_HEIGHT: height,
    //                     shapes: [],
    //                     selectedShapes: [],
    //                     background: "#fff"
    //                 })
    //             }]
    //         })
    //         const templateId = response.data.bookId;
    //         navigate(`/admin-editor/${templateId}`);
    //     } catch (error) {
    //         toast.error("Template creation failed", {
    //             description: error.message || "Oops! Something went wrong.",
    //         });
    //     } finally {
    //         setIsFlipbookCreating(false);
    //     }
    // }

    return (
        <>
            {isLoading && <Loader />}
            <div className="flex flex-col items-center w-full justify-center bg-gradient-to-r from-purple-50 to-purple-200">
                <div className="max-w-4xl w-full flex flex-col items-center p-4">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-purple-500">Choose Your Flipbook Size</h1>
                        <p className="text-lg text-gray-600 max-w-lg mx-auto">to create a beautiful flipbook from scratch</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-10 w-full">
                        {templates.map((template) => (
                            <div
                                key={template._id}
                                className={`transform transition-all duration-300 ${selectedTemplate === template.name ? 'scale-105' : 'scale-100'
                                    } hover:-translate-y-1 active:translate-y-0`}
                            >
                                <Card
                                    className={`cursor-pointer transition-all h-full duration-200 flex flex-col items-center justify-between p-2 ${selectedTemplate === template.name
                                        ? 'ring-2 ring-primary bg-purple-50 shadow-lg'
                                        : 'ring-1 ring-gray-200 hover:ring-purple-300 hover:shadow-md'
                                        }`}
                                    onClick={() => handleTemplateSelect(template)}
                                >
                                    <CardContent className="p-0 flex flex-col items-center justify-center h-full w-full relative">
                                        <div className="flex items-center justify-center my-4" style={{
                                            height: pageLayoutData[template.name].styleHeight,
                                            width: pageLayoutData[template.name].styleWidth
                                        }}>
                                            {pageLayoutData[template.name].svg}
                                        </div>

                                        {selectedTemplate === template.name && (
                                            <div className="absolute top-0 right-0 mt-1 mr-1">
                                                <CheckCircle size={18} className="text-purple-600 fill-purple-100" />
                                            </div>
                                        )}

                                        <div className="mt-2 text-center w-full pb-1">
                                            <p className={`text-sm font-semibold ${selectedTemplate === template.name
                                                ? 'text-purple-700'
                                                : 'text-gray-700'
                                                }`}>
                                                {template.name}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {template.width} × {template.height} px
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 mb-10 w-full bg-gray-50 p-4 rounded-lg">
                        <p className="font-medium text-gray-700">Custom dimensions (pixels)</p>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <Label htmlFor="width" className="whitespace-nowrap text-gray-600">Width</Label>
                                <Input
                                    id="width"
                                    type="number"
                                    className="w-24 focus:ring-2 focus:ring-primary"
                                    value={width}
                                    onChange={handleWidthChange}
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <Label htmlFor="height" className="whitespace-nowrap text-gray-600">Height</Label>
                                <Input
                                    id="height"
                                    type="number"
                                    className="w-24 focus:ring-2 focus:ring-primary"
                                    value={height}
                                    onChange={handleHeightChange}
                                />
                            </div>
                        </div>
                    </div>

                    <Button size="lg" className="text-[16px]" disabled={isFlipbookCreating} onClick={() => { create() }}>
                        {
                            isFlipbookCreating ? <LoadingButton /> : "Create"
                        }
                    </Button>
                </div>
            </div>
        </>

    );
}