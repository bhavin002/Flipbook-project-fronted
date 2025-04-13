import { v4 as uuid } from "uuid";


export const addStage = (mainStage, setMainStage, index, setSelectedIndex) => {
    const temp = JSON.parse(JSON.stringify(mainStage[index]));
    // mainStage.forEach(element => {
    // const temp = JSON.parse(JSON.stringify(element));
    // element.shapes = JSON.parse(temp.stageref.current).children[0].children[1].children.map(e => e.attrs)
    // });
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
    setTimeout(() => {
        setSelectedIndex(index + 1);
    }, 0);
}

export const duplicateStage = (mainStage, setMainStage, index, setSelectedIndex) => {
    const temp = JSON.parse(JSON.stringify(mainStage[index]));
    // mainStage[index].stageref.current.children[0].children[1].children.map(e => e.attrs)
    // temp.shapes = JSON.parse(temp.stageref.current).children[0].children[1].children.map(e => e.attrs)
    temp.shapes = mainStage[index].stageref.current.children[0].children[1].children.map(e => JSON.parse(JSON.stringify(e.attrs)))
    temp.shapes.forEach(element => { element.id = uuid() })
    temp.stageref.current = JSON.parse(temp.stageref.current);
    temp.selectedShapes = [];
    mainStage.splice(index + 1, 0, temp);
    setMainStage([...mainStage]);
    setTimeout(() => {
        setSelectedIndex(index + 1)
    }, 0);

}

export const deleteStage = (mainStage, setMainStage, index, selectedIndex, setSelectedIndex) => {
    if(mainStage.length == 1) return;
    mainStage.length - 1 == index && setSelectedIndex(index - 1);
    mainStage.length - 1 == selectedIndex && setSelectedIndex(selectedIndex - 1);
    if (index < mainStage.length - 1) {
        const temp = JSON.parse(JSON.stringify(mainStage[index + 1]));
        temp.shapes = JSON.parse(temp.stageref.current).children[0].children[1].children.map(e => e.attrs)
        temp.stageref.current = JSON.parse(temp.stageref.current);
        temp.selectedShapes = [];
        mainStage.splice(index, 2, temp)
        mainStage.length == 1 && setSelectedIndex(0);
        setMainStage([...mainStage])
    } else {
        mainStage.splice(index, 1)
        setMainStage([...mainStage])
    }
}

export function serializationStage(mainStage) {
    const temp = JSON.parse(JSON.stringify(mainStage));
    temp.shapes = mainStage.stageref.current.children[0].children[1].children.map(e => e.attrs);
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