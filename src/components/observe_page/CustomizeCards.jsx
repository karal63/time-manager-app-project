import { useEffect } from "react";
import { useTimeRangeStore } from "../../store";

const CustomizeCards = ({
    isCardPanelOpen,
    setIsCardPanelOpen,
    setCardSetting,
}) => {
    const {
        taskMarks,
        selectMark,
        getFromLocalStorage,
        saveToLocalStorage,
        cancelMarks,
    } = useTimeRangeStore();

    const closePanel = () => {
        setIsCardPanelOpen(false);
    };

    useEffect(() => {
        getFromLocalStorage("taskMarks", "taskMarks");
    }, []);

    return (
        <div
            className={`w-[250px] min-w-[250px] bg-mainBackground flex-col border-[1px] border-mainLineColor rounded-xl px-6 pb-4 ${
                isCardPanelOpen ? "flex" : "hidden"
            }`}
        >
            <h1 className="font-semibold text-center text-xl pt-4 text-mainColor">
                Customize Your Card
            </h1>

            <ul className="my-6 flex flex-col gap-1">
                {taskMarks.map((mark) => (
                    <li
                        key={mark.id}
                        className="flex items-center gap-2 styled-table"
                    >
                        <input
                            type="checkbox"
                            id="checkbox"
                            onChange={() => selectMark(mark.id, !mark.selected)}
                            checked={mark.selected}
                            className="border border-mainLineColor"
                        />
                        <label htmlFor="checkbox" className="text-mainColor">
                            {mark.name}
                        </label>
                    </li>
                ))}
            </ul>

            <div className="flex justify-between items-center">
                <button
                    className="text-gray-500"
                    onClick={() => {
                        closePanel();
                        cancelMarks();
                    }}
                >
                    cancel
                </button>
                <button
                    className="rounded-lg px-4 py-1 border-[1px] text-mainColor hover:border-darkPink hover:text-darkPink transition-all"
                    onClick={() => {
                        closePanel();
                        saveToLocalStorage("taskMarks", taskMarks);
                    }}
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default CustomizeCards;
