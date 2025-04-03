import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getData } from '@/utils/datas';
import { v4 as uuid } from "uuid";

const ShapesView = ({ onBackClick }) => {
    const svgItems = getData("svgItems");
    const shapes = [
        {
            id: uuid(),
            svg: svgItems["icon-1"]
        },
        {
            id: uuid(),
            svg: svgItems["icon-2"]
        },
        {
            id: uuid(),
            svg: svgItems["icon-5"]
        },
        {
            id: uuid(),
            svg: svgItems["icon-6"]
        },
        {
            id: uuid(),
            svg: svgItems["icon-9"]
        },
        {
            id: uuid(),
            svg: svgItems["icon-10"]
        },
        {
            id: uuid(),
            svg: svgItems["icon-13"]
        },
        {
            id: uuid(),
            svg: svgItems["icon-14"]
        },
        {
            id: uuid(),
            svg: svgItems["icon-33"]
        },
        {
            id: uuid(),
            svg: svgItems["icon-41"]
        },
        {
            id: uuid(),
            svg: svgItems["icon-21"]
        },
        {
            id: uuid(),
            svg: svgItems["icon-22"]
        },
        {
            id: uuid(),
            svg: svgItems["icon-25"]
        },
        {
            id: uuid(),
            svg: svgItems["icon-26"]
        },
        {
            id: uuid(),
            svg: svgItems["icon-29"]
        },
        {
            id: uuid(),
            svg: svgItems["icon-30"]
        },
        {
            id: uuid(),
            svg: svgItems["icon-4"]
        },
        {
            id: uuid(),
            svg: svgItems["icon-8"]
        },
        {
            id: uuid(),
            svg: svgItems["icon-12"]
        },
        {
            id: uuid(),
            svg: svgItems["icon-16"]
        },
        {
            id: uuid(),
            svg: svgItems["icon-24"]
        },
        {
            id: uuid(),
            width: "37px",
            svg: svgItems["icon-28"]
        },
        {
            id: uuid(),
            height: "29px",
            svg: svgItems["icon-32"]
        },
        {
            id: uuid(),
            svg: svgItems["icon-42"]
        },
        {
            id: uuid(),
            svg: svgItems["icon-43"]
        },
        {
            id: uuid(),
            height: "27px",
            svg: svgItems["icon-44"]
        },
        {
            id: uuid(),
            height: "27px",
            svg: svgItems["icon-45"]
        },
        {
            id: uuid(),
            svg: svgItems["icon-46"]
        },
        {
            id: uuid(),
            svg: svgItems["icon-47"]
        },
        {
            id: uuid(),
            svg: svgItems["icon-49"]
        }
    ];
    return (
        <div className="px-6 pt-6 pb-2 space-y-4 flex flex-col h-[100vh]">
            <div className="flex items-center gap-4">
                <Button
                    variant="outline"
                    className="text-primary"
                    onClick={onBackClick}
                >
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                Shapes
            </div>
            <div className="h-0 overflow-y-auto flex-grow">
                <div className="flex flex-wrap">
                    {shapes.map((shape) => {
                        return (
                            <div key={shape.id} className="shape-element-box">
                                <div className="shape-element">
                                    <div
                                        className="flex justify-center items-center"
                                        style={{
                                            height: shape.height || '54px',
                                            width: shape.width || '54px'
                                        }}
                                        dangerouslySetInnerHTML={{ __html: shape.svg }}
                                    ></div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default ShapesView; 