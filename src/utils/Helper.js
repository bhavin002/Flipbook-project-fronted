import { duplicateContactFormApi } from "@/service/contactForm.service";
import { duplicateProductApi } from "@/service/product.service";
import { duplicateQuestionFormApi } from "@/service/question.service";
import { duplicateQuizApi } from "@/service/quiz.service";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";
import { DeviceType } from "./enum";


export const addStage = (mainStage, setMainStage, index, setSelectedIndex) => {
    const temp = JSON.parse(JSON.stringify(mainStage[index]));
    const stage = {
        stageref: { current: JSON.parse(temp.stageref.current) },
        CANVAS_WIDTH: mainStage[0].CANVAS_WIDTH,
        CANVAS_HEIGHT: mainStage[0].CANVAS_HEIGHT,
        shapes: [],
        selectedShapes: [],
        background: "#fff"
    }
    mainStage.splice(index + 1, 0, stage);
    setMainStage([...mainStage]);
    // setTimeout(() => {
    setSelectedIndex(index + 1);
    // }, 0);
}

export const duplicateStage = (mainStage, setMainStage, index, setSelectedIndex) => {
    const temp = JSON.parse(JSON.stringify(mainStage[index]));
    temp.shapes = mainStage[index].stageref && mainStage[index].stageref.current ? mainStage[index].stageref.current.children[0].children[1].children.map(e => JSON.parse(JSON.stringify(e.attrs))) : (mainStage[index].shapes || []);
    temp.shapes.forEach(element => { element.id = uuid() })
    temp.stageref.current = JSON.parse(temp.stageref.current);
    temp.selectedShapes = [];
    mainStage.splice(index + 1, 0, temp);
    setMainStage([...mainStage]);
    // setTimeout(() => {
        setSelectedIndex(index + 1)
    // }, 0);

}

export const deleteStage = (mainStage, setMainStage, index, selectedIndex, setSelectedIndex) => {
    if (mainStage.length == 1) return;
    mainStage.length - 1 == index && setSelectedIndex(index - 1);
    mainStage.length - 1 == selectedIndex && setSelectedIndex(selectedIndex - 1);
    if (index < mainStage.length - 1) {
        // const temp = JSON.parse(JSON.stringify(mainStage[index + 1]));
        // temp.shapes = JSON.parse(temp.stageref.current).children[0].children[1].children.map(e => e.attrs)
        // temp.stageref.current = JSON.parse(temp.stageref.current);
        // temp.selectedShapes = [];
        mainStage.splice(index, 1)
        mainStage.length == 1 && setSelectedIndex(0);
        setMainStage([...mainStage])
    } else {
        mainStage.splice(index, 1)
        setMainStage([...mainStage])
    }
    // setPageCounter(pageCounter - 1);
}

export function serializationStage(mainStage) {
    const temp = JSON.parse(JSON.stringify(mainStage));
    temp.shapes = mainStage.stageref && mainStage.stageref.current ? mainStage.stageref.current.children[0].children[1].children.map(e => e.attrs) : mainStage.shapes || [];
    temp.shapes = JSON.parse(JSON.stringify(temp.shapes))
    temp.shapes.forEach(element => { element.id = uuid() })
    temp.stageref.current = JSON.parse(temp.stageref.current);
    temp.selectedShapes = [];
    return temp;
}

export function deleteShape(mainStage, setMainStage, selectedIndex) {
    const tempSelectedShapes = mainStage[selectedIndex].selectedShapes;
    mainStage[selectedIndex].shapes = mainStage[selectedIndex].shapes.filter((innerShape) => {
        return !(tempSelectedShapes.some(e => e.attrs.id === innerShape.id))
    })
    mainStage[selectedIndex].selectedShapes = [];
    setMainStage([...mainStage]);
}

export function addIntercationDataToMainStage(mainStage, setMainStage, selectedShape, selectedIndex, output) {
    mainStage[selectedIndex].stageref.current.children[0].children[1].children.find(e => {
        if (e.attrs.id === selectedShape[0].attrs.id) {
            e.attrs.htmlData = {
                ...e.attrs.htmlData,
                ...output.data
            };
            return true;
        }
    });

    mainStage[selectedIndex].shapes = mainStage[selectedIndex].stageref.current.children[0].children[1].children.map(e =>
        JSON.parse(JSON.stringify(e.attrs))
    ) || [];

    const temp = JSON.parse(JSON.stringify(mainStage[selectedIndex]));
    temp.selectedShapes = [];
    temp.stageref = null;
    setMainStage([...mainStage]);
}

export const restrictNumericInput = (e, allowDecimal = true) => {
    const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
    const isValidKey = allowDecimal ? /[0-9.]/.test(e.key) : /[0-9]/.test(e.key);

    if (!isValidKey && !allowedKeys.includes(e.key)) {
        e.preventDefault();
    }

    if (allowDecimal && e.key === '.' && e.target.value.includes('.')) {
        e.preventDefault();
    }
};


const addEntryInDB = async (htmlType, id, setIsLoading) => {
    if (!id) return { data: true };
    switch (htmlType) {
        case "shop-area":
        case "shop-button":
            try {
                setIsLoading(true);
                const response = await duplicateProductApi(id);
                return response;
            } catch (error) {
                toast.error("Failed to duplicate product", {
                    description: error.message || "Oops! Something went wrong.",
                });
                return null;
            } finally {
                setIsLoading(false);
            }
        case "quiz":
            try {
                setIsLoading(true);
                const response = await duplicateQuizApi(id);
                return response;
            } catch (error) {
                toast.error("Failed to duplicate quiz", {
                    description: error.message || "Oops! Something went wrong.",
                });
                return null;
            } finally {
                setIsLoading(false);
            }
        case "contact-form":
            try {
                setIsLoading(true);
                const response = await duplicateContactFormApi(id);
                return response;
            } catch (error) {
                toast.error("Failed to duplicate contact form", {
                    description: error.message || "Oops! Something went wrong.",
                });
                return null;
            } finally {
                setIsLoading(false);
            }
        case "question":
            try {
                setIsLoading(true);
                const response = await duplicateQuestionFormApi(id);
                return response;
            } catch (error) {
                toast.error("Failed to duplicate question", {
                    description: error.message || "Oops! Something went wrong.",
                });
                return null;
            } finally {
                setIsLoading(false);
            }
        default:
            return { data: true };
    }
}

export const duplicateShapes = async (mainStage, selectedIndex, setMainStage, setIsLoading, selectedShape) => {
    if (!selectedShape || selectedShape.length === 0) return;
    
    // We handle duplication of all selected shapes properly
    const selectedShapesAttrs = mainStage[selectedIndex]?.selectedShapes.map((e) => e.attrs);
    const newShapes = [];

    for (const shape of selectedShapesAttrs) {
        const response = await addEntryInDB(shape.htmlType, shape.htmlData?.variantId, setIsLoading);
        if (!response?.data) continue;

        const { variantId, ...restHtmlData } = shape.htmlData || {};
        newShapes.push({
            ...JSON.parse(JSON.stringify(shape)),
            id: uuid(),
            x: shape.x + 30,
            y: shape.y + 30,
            htmlData: {
                ...restHtmlData,
                ...(typeof response.data === 'string' && { variantId: response.data })
            }
        });
    }

    if (newShapes.length === 0) return;

    setMainStage(prevState => {
        const updatedState = [...prevState];
        updatedState[selectedIndex] = {
            ...updatedState[selectedIndex],
            shapes: [...(updatedState[selectedIndex].shapes || []), ...newShapes],
            selectedShapes: [] // Selection will be updated by nodes being recreated
        };
        return updatedState;
    });
};

export const handlePasteShapes = async (clipboard, selectedIndex, setMainStage, setIsLoading, currentFlipbookId) => {
    if (!clipboard || !clipboard.shapes || clipboard.shapes.length === 0) return;

    const newShapes = [];
    const isSameStage = clipboard.sourceFlipbookId === currentFlipbookId && clipboard.sourceStageIndex === selectedIndex;

    for (const shape of clipboard.shapes) {
        const response = await addEntryInDB(shape.htmlType, shape.htmlData?.variantId, setIsLoading);
        if (!response?.data) continue;

        const { variantId, ...restHtmlData } = shape.htmlData || {};
        newShapes.push({
            ...JSON.parse(JSON.stringify(shape)),
            id: uuid(),
            x: isSameStage ? shape.x + 30 : shape.x,
            y: isSameStage ? shape.y + 30 : shape.y,
            htmlData: {
                ...restHtmlData,
                ...(typeof response.data === 'string' && { variantId: response.data })
            }
        });
    }

    if (newShapes.length === 0) return;

    setMainStage(prevState => {
        const updatedState = [...prevState];
        updatedState[selectedIndex] = {
            ...updatedState[selectedIndex],
            shapes: [...(updatedState[selectedIndex].shapes || []), ...newShapes],
            selectedShapes: []
        };
        return updatedState;
    });
};

export const copyInAllPages = async (mainStage, selectedIndex, setMainStage, setIsLoading, selectedShapes) => {
    for (let index = 0; index < mainStage.length; index++) {
        if (selectedIndex !== index) {
            for (const shape of selectedShapes) {
                const response = await addEntryInDB(shape.attrs.htmlType, shape.attrs.htmlData?.variantId, setIsLoading);

                if (!response?.data) continue;

                const { variantId, ...restHtmlData } = shape.attrs.htmlData || {};
                mainStage[index].shapes.push({
                    ...shape.attrs,
                    id: uuid(),
                    htmlData: {
                        ...restHtmlData,
                        ...(typeof response.data === 'string' && { variantId: response.data })
                    }
                });
            }
        }
    }

    setMainStage([...mainStage]);
}

export const IsPublished = () => {
    const currentUrlBasePath = window.location.pathname.split('/')[1];
    if (currentUrlBasePath === "public-flipbook") {
        return true;
    }
    return false;
}

export const detectDeviceType = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const width = window.innerWidth;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Regular expressions for mobile and tablet detection
    const mobileRegex = /android|iphone|ipod|webos|blackberry|iemobile|opera mini/i;
    const tabletRegex = /tablet|ipad|playbook|android(?!.*mobile)/i;

    // Check for tablets first
    if (tabletRegex.test(userAgent) || (isTouchDevice && width > 768 && width <= 1024)) {
        return DeviceType.TABLET;
    }
    // Check for mobile devices
    else if (mobileRegex.test(userAgent) || (isTouchDevice && width <= 768)) {
        return DeviceType.MOBILE
    }
    // Default to desktop
    else {
        return DeviceType.DESKTOP
    }
}

export const isPngImage = (src) => {
  if (!src) return false;

  const srcStr = String(src).toLowerCase();

  // Base64 PNG
  if (srcStr.startsWith('data:image/png')) return true;

  // URL check
  try {
    const url = new URL(src, window.location.href);
    const pathname = url.pathname;
    
    // Check if pathname ends with .png (ignoring query params which are handled by URL parser)
    if (pathname.endsWith('.png')) return true;
  } catch (e) {
    // Fallback if URL parsing fails
    const cleanSrc = srcStr.split('?')[0];
    if (cleanSrc.endsWith('.png')) return true;
  }

  return false;
};
