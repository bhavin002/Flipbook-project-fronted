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
    switch (htmlType) {
        case "shop-area":
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
    const response = await addEntryInDB(selectedShape[0].attrs.htmlType, selectedShape[0].attrs.htmlData?.variantId, setIsLoading);

    if (!response?.data) return;

    const selectedShapes = mainStage[selectedIndex]?.selectedShapes
        .map((e) => e.attrs)
        .map((e) => e.id);
    const tempShapes = mainStage[selectedIndex].stageref.current.children[0].children[1].children
        .filter((e, index) => selectedShapes.includes(e.attrs.id))
        .map((e) => e.attrs);
    const newShapes = tempShapes.map((e) => {
        const newID = uuid();
        return {
            ...e,
            id: newID,
            x: e.x,
            y: e.y,
            htmlData: {
                ...e.htmlData,
                variantId: response.data
            }
        };
    });
    mainStage[selectedIndex].shapes = mainStage[selectedIndex].stageref.current.children[0].children[1].children.map((e) =>
        JSON.parse(JSON.stringify(e.attrs))
    );
    newShapes.forEach((e) => {
        let index = mainStage[selectedIndex].shapes.findIndex((shape) => shape.id === e.id);
        mainStage[selectedIndex].shapes.splice(index, 0, e);
    });
    mainStage[selectedIndex].shapes.find((e, index) => {
        if (selectedShapes.includes(e.id)) {
            e.x += 30;
            e.y += 30;
        }
    });
    mainStage.splice(selectedIndex, 1, mainStage[selectedIndex]);
    setMainStage([...mainStage]);
};

export const IsPublished = () => {
    const currentUrlBasePath = window.top.location.pathname.split('/')[1];
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
    if (src.toLowerCase().endsWith('.png')) return true;
    if (src.startsWith('data:image/png')) return true;
    if (src.toLowerCase().includes('.png')) return true;
    return false;
};