import { useEffect, useState } from "react";
import CustomizeCards from "./CustomizeCards";
import { useTimeRangeStore } from "../../store";

import { TiPinOutline } from "react-icons/ti";

const CurrentTaskCards = () => {
    const { taskMarks, getFromLocalStorage, setPrevTaskMarks } =
        useTimeRangeStore();
    const [isCardPanelOpen, setIsCardPanelOpen] = useState(false);

    useEffect(() => {
        getFromLocalStorage("taskMarks", "taskMarks");
    }, []);

    return (
        <>
            {isCardPanelOpen ? (
                <CustomizeCards
                    isCardPanelOpen={isCardPanelOpen}
                    setIsCardPanelOpen={setIsCardPanelOpen}
                />
            ) : (
                <div className="flex flex-col gap-3 w-[250px] min-w-[250px] relative">
                    {taskMarks.map((mark) => {
                        if (mark.selected) {
                            return (
                                <div
                                    key={mark.id}
                                    className="bg-[#FCE4EC] border-[1px] border-[#DADADA] rounded-lg w-full px-3 py-5 shadow-main relative overflow-hidden"
                                >
                                    <p className="text-[#333333] mb-1 text-base">
                                        {mark.name}:
                                    </p>
                                    <p className="text-[#333333] font-bold text-2xl">
                                        {mark.data}
                                    </p>

                                    <TiPinOutline className="absolute -top-6 -right-6 z-10 text-8xl text-black text-opacity-10" />
                                </div>
                            );
                        }
                    })}

                    <button
                        className="border-2 border-dashed border-gray-300 py-2 rounded-lg text-gray-300"
                        onClick={() => {
                            setIsCardPanelOpen(true);
                            setPrevTaskMarks();
                        }}
                    >
                        Customize
                    </button>
                </div>
            )}
        </>
    );
};

export default CurrentTaskCards;
