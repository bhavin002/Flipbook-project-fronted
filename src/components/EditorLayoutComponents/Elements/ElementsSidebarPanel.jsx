import { ChartBarBig, ChartNoAxesCombined, ChartPie, Image, ImagePlay, Shapes, Smile, Table, Video } from "lucide-react"
import { useState } from "react"
import StockPhotosView from "./StockPhotosView"
import StockVideosView from "./StockVideosView"
import ShapesView from "./ShapesView"
import GIFsView from "./GIFsView"
import StickersView from "./StickersView"

export default function ElementsSidebarPanel() {
    const [currentView, setCurrentView] = useState(null)

    const elements = [
        {
            title: "Graphics",
            widget: [
                {
                    text: 'Stock photos',
                    icon: <Image />,
                    view: <StockPhotosView onBackClick={() => setCurrentView(null)} />
                },
                {
                    text: 'Stock videos',
                    icon: <Video />,
                    view: <StockVideosView onBackClick={() => setCurrentView(null)} />
                },
                {
                    text: 'Shapes',
                    icon: <Shapes />,
                    view: <ShapesView onBackClick={() => setCurrentView(null)} />
                },
                {
                    text: 'GIFs',
                    icon: <ImagePlay />,
                    view: <GIFsView onBackClick={() => setCurrentView(null)} />
                },
                {
                    text: 'Stickers',
                    icon: <Smile />,
                    view: <StickersView onBackClick={() => setCurrentView(null)} />
                }
            ]
        },
        {
            title: "Charts",
            widget: [
                {
                    text: 'Line chart',
                    icon: <ChartNoAxesCombined />
                },
                {
                    text: 'Pie chart',
                    icon: <ChartPie />
                },
                {
                    text: 'Bar chart',
                    icon: <ChartBarBig />
                },
                {
                    text: 'Table',
                    icon: <Table />
                }
            ]
        }
    ]

    // If a graphics view is selected, render that view
    if (currentView) {
        return currentView
    }

    // Main panel view
    return (
        <div className="px-6 pt-6 pb-2 space-y-4 flex flex-col h-[100vh]">
            <div className="h-0 overflow-y-auto flex-grow">
                <div className="space-y-4">
                    {elements.map((section, index) => (
                        <div key={index}>
                            <div className="mb-2 text-sm font-semibold">{section.title}</div>
                            <div className="grid grid-cols-3 gap-4">
                                {section.widget.map((item, itemIndex) => (
                                    <div 
                                        key={itemIndex} 
                                        className="cursor-pointer flex flex-col items-center"
                                        onClick={() => section.title === "Graphics" ? setCurrentView(item.view) : null}
                                    >
                                        <div className="rounded-lg h-14 w-full bg-primary hover:bg-violet-700 flex justify-center items-center">
                                            <div className="w-10 h-8 relative flex justify-center items-center">
                                                {item.icon}
                                            </div>
                                        </div>
                                        <div className="text-center mt-2 text-xs">{item.text}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}