import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function SettingSingleSignOn() {
    return (
        <div className="p-6 max-w-[100vw] overflow-auto space-y-8">
            <div className="p-6 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                <h1 className="text-2xl font-bold mb-2">Single Sign-On</h1>
                <p className="text-gray-500">Enable your company’s employees to directly authenticate on Flipsnack with the company login.</p>
            </div>
            <Card className="shadow-none border-none">
                <CardContent className="flex flex-col items-center">
                    <svg width="200" height="200" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">
                        <path d="m103.61 74.074-2.334.898 1.034 2.685 2.515-1.398-1.215-2.185Zm-68.733 4.991.154 2.496 1.873-.116.412-1.831-2.439-.549ZM36 146.986h2.5v-2.429l-2.428-.07-.072 2.499Zm0 .014h-2.5v2.5H36V147Zm103.901-53.72-2.49.223.177 1.968 1.955.283.358-2.474Zm-33.958-20.104C100.39 58.746 86.394 48.5 70 48.5v5c14.258 0 26.442 8.908 31.276 21.472l4.667-1.796ZM70 48.5c-18.35 0-33.697 12.836-37.562 30.016l4.878 1.098C40.68 64.665 54.04 53.5 70 53.5v-5ZM34.724 76.57C15.624 77.746.5 93.606.5 113h5c0-16.736 13.052-30.424 29.531-31.44l-.307-4.99ZM.5 113c0 19.8 15.765 35.917 35.428 36.485l.144-4.998C19.105 143.997 5.5 130.087 5.5 113h-5Zm33 33.986V147h5v-.014h-5ZM36 149.5h1v-5h-1v5Zm1 0h99v-5H37v5Zm99 0c16.292 0 29.5-13.208 29.5-29.5h-5c0 13.531-10.969 24.5-24.5 24.5v5Zm29.5-29.5c0-14.847-10.966-27.129-25.241-29.195l-.716 4.949C151.394 97.469 160.5 107.673 160.5 120h5Zm-50-46.5c11.477 0 20.903 8.79 21.911 20.003l4.98-.447C141.154 79.288 129.588 68.5 115.5 68.5v5Zm-10.675 2.758A21.888 21.888 0 0 1 115.5 73.5v-5c-4.751 0-9.222 1.23-13.105 3.389l2.43 4.37Z" fill="#7b39ed">
                        </path>
                        <path d="M123 48.5V43c0-22.091-17.909-40-40-40S43 20.909 43 43v20" stroke="#7b39ed" stroke-width="5" stroke-linejoin="round"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M89 109.395c3.587-2.075 6-5.953 6-10.395 0-6.627-5.373-12-12-12s-12 5.373-12 12c0 4.442 2.413 8.32 6 10.395V117a6 6 0 1 0 12 0v-7.605Z" fill="#7b39ed">
                        </path>
                    </svg>
                    <div className="space-y-4 flex flex-col items-center">
                        <p className="text-lg font-semibold">No SSO connections yet</p>
                        <p className="text-gray-500 text-center">Setup your connection now and enable direct authentication.</p>
                        <Button>
                            Create SSO connection
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}