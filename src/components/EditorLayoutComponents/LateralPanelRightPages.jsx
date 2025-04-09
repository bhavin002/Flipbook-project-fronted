import { addStage, deleteStage, duplicateStage } from '@/utils/Helper';
import { ChevronsLeft, X } from 'lucide-react';
import { ReactSortable } from 'react-sortablejs';

const PageIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="19" className="text-gray-700">
        <path fill="currentColor" d="M1 4l2.937-2.938C5 0 5.5 0 6.5 0h6c.417 0 .77.146 1.063.437.291.292.437.646.437 1.063v16c0 .417-.146.771-.437 1.063A1.447 1.447 0 0112.5 19h-11c-.417 0-.77-.146-1.063-.437A1.447 1.447 0 010 17.5v-11C0 5 .708 4.292 1 4zm5-2L2 6h4V2zm6 15V2H8v4.5c0 .417-.146.77-.437 1.063A1.447 1.447 0 016.5 8H2v9h10z" />
    </svg>
);

const CoverIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="19" className="text-gray-700">
        <path fill="currentColor" d="M12 0a2 2 0 012 2v15a2 2 0 01-2 2H2a2 2 0 01-2-2V2a2 2 0 012-2h10zM2 2v15h1V2H2zm8.5 3a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-4a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5h4zM5 17h6a1 1 0 001-1V3a1 1 0 00-1-1H5v15z" />
    </svg>
);

const AddPageIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" className="text-white">
        <path fill="currentColor" d="M8.014 6.005H13.7c.166 0 .3.11.3.245v1.505c0 .135-.134.245-.3.245H8.014v5.696c0 .166-.11.3-.245.3h-1.5c-.136 0-.246-.134-.246-.3V8H.3C.134 8 0 7.89 0 7.755V6.25c0-.135.134-.245.3-.245h5.723V.3c0-.166.11-.3.246-.3h1.5c.135 0 .245.134.245.3v5.705z" />
    </svg>
);

export default function LateralPanelRightPages({ mainStage, selectedIndex, setSelectedIndex, setIsRightLateralCollapse, setMainStage, index, isExpanded, setIsExpanded }) {
    const toggleBtn = () => {
        setIsExpanded(!isExpanded);
    }

    const handleListChange = (newList) => {
        if (JSON.stringify(mainStage) !== JSON.stringify(newList)) {
            newList.forEach(ele => {
                ele.selectedShapes = [];
                ele.shapes = ele.stageref.current.children[0].children[1].children.map(e => JSON.parse(JSON.stringify(e.attrs)))
            })
            setMainStage(newList);
        } else {
            console.log("No changes in the list order.");
        }
    };
    const handleDragStart = (event) => {
        const draggedItemIndex = event.oldIndex;
        mainStage.forEach(element => {
            const temp = JSON.parse(JSON.stringify(element));
            element.shapes = JSON.parse(temp.stageref.current).children[0].children[1].children.map(e => e.attrs)
        });
        setMainStage(mainStage)
    };

    const handleDragEnd = (event) => {
        const newIndex = event.newIndex;
        setSelectedIndex(newIndex);
    };

    return (
        <div className='flex w-64 relative border border-gray-200'>
            <div className={`bg-white flex flex-col lateral-panel-right h-[calc(100%-50px)] absolute ${isExpanded ? ' right-0 w-[65vw] bg-white z-[11] border-r-2 rounded-l-sm transition-all' : 'w-full'}`}>
                <div className="flex items-center justify-between p-2 border-b">
                    <button className={`p-1 hover:bg-gray-100 rounded ${isExpanded ? 'rotate-180' : ''}`} onClick={toggleBtn} aria-label="Expand panel">
                        <ChevronsLeft />
                    </button>
                    <span className="font-medium text-[13px]">Pages</span>
                    <button className="p-1 hover:bg-gray-100 rounded" onClick={() => { isExpanded ? setIsExpanded(false) : setIsRightLateralCollapse(false) }} aria-label="Close panel">
                        <X />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <ReactSortable
                        className={`p-2 ${isExpanded && 'flex flex-wrap'}`}
                        list={mainStage}
                        setList={handleListChange}
                        animation="200"
                        easing="ease-out"
                        onStart={handleDragStart}
                        onEnd={handleDragEnd}
                    >
                        {mainStage.map((_, index) => (
                            <div
                                key={index}
                                className={`mb-2 p-2 rounded cursor-pointer page-list ${selectedIndex === index && 'selected'}`}

                            >
                                <div className="flex flex-col items-center cursor-move" onClick={() => setSelectedIndex(index)}
                                >
                                    <div className="w-24 h-32 bg-[#e8e8e8] flex items-center justify-center page-border">
                                        {index === 0 ? <CoverIcon /> : <PageIcon />}
                                    </div>
                                    <span className="mt-1 text-[11px] font-medium">{index + 1}</span>
                                </div>
                            </div>
                        ))}
                    </ReactSortable>
                </div>

                <div className="border-t border-b p-2">
                    <div className={`flex gap-2 ${isExpanded ? "justify-end" : 'justify-between'}`}>
                        <button onClick={() => addStage(mainStage, setMainStage, index, setSelectedIndex)} className="w-auto px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center">
                            <AddPageIcon />
                        </button>
                        <button onClick={() => duplicateStage(mainStage, setMainStage, index, setSelectedIndex)} className="w-auto px-3 py-2 text-gray-600 hover:bg-gray-100 rounded flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" className="text-gray-600">
                                <path fill="currentColor" d="M11 0a1 1 0 011 1v2h2a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1v-2H1a1 1 0 01-1-1V1a1 1 0 011-1h10zm2 5h-1v6a1 1 0 01-1 1H5v1h8V5zm-3-3H2v8h8V2z" />
                            </svg>
                        </button>
                        <button onClick={() => deleteStage(mainStage, setMainStage, index, selectedIndex, setSelectedIndex)} className="w-auto px-3 py-2 text-gray-600 hover:bg-gray-100 rounded flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="16"><path fillOpacity=".87" d="M12.758 3.023l-2.757-.026-.013-1.024c0-.85-.7-1.973-1.967-1.973L5.003.012c-1.184 0-1.983 1.11-1.983 1.961l-.008 1.044-2.69-.004c-.224 0-.322.745-.322.961 0 .216.06.994.284.994l.725.014-.002 8.936c0 1.148.608 2.082 1.795 2.082h7.405c1.187 0 1.79-.934 1.79-2.082l.005-8.911.739-.001c.15 0 .235-.327.259-.981-.012-.668-.093-1.002-.242-1.002zm-7.762-.515c0-.212.33-.529.766-.529l1.437-.002c.436 0 .783.319.783.53L7.987 3l-2.983.003-.008-.494zm-2.097 2.47l7.197.005.015 8.022c-.003.777-.363 1.016-1.106 1.016l-5.011-.007c-.743 0-1.065-.232-1.065-1.01l-.03-8.026zm2.047 1.53c-.313 0-.938.183-.938.414v.054c0 .344-.007 2.046-.02 5.107 0 .23.714.414 1.022.414.313 0 .99-.184.99-.414v-.851l.003-4.31c0-.23-.744-.415-1.057-.415zm3.04-.008c-.23 0-.982.184-.982.414v5.15c0 .23.773.415 1.001.415.23 0 .976-.185.976-.415l-.001-5.15c0-.23-.765-.414-.994-.414z"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
