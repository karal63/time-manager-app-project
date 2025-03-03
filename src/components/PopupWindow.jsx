import { useEffect, useRef, useState } from "react";
import { PiArrowClockwiseThin } from "react-icons/pi";
import { useTimeRangeStore } from "../store";

// store isPopupOpen in store and import it here, set when you click create time range show this popup
// make popup dynamic, the text depends of the popup type passed through the params

const PopupWindow = () => {
    const { popup, togglePopup, deletedTimeRange, addTimeRange } =
        useTimeRangeStore();
    const { isOpen, message } = popup;
    const [timeLeft, setTimeLeft] = useState(5);
    const popupWindowRef = useRef();
    const intervalId = useRef(null);

    const undoDeleting = () => {
        togglePopup(false);
        setTimeLeft(5);
        if (deletedTimeRange) {
            addTimeRange(deletedTimeRange);
        }
        if (intervalId.current) {
            clearInterval(intervalId.current);
        }
    };

    useEffect(() => {
        if (isOpen) {
            setTimeLeft(5);

            intervalId.current = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);

            const timeoutId = setTimeout(() => {
                togglePopup(false);
                clearInterval(intervalId.current);
                setTimeLeft(5);
            }, 5000);

            return () => {
                clearInterval(intervalId.current);
                clearTimeout(timeoutId);
            };
        }
    }, [isOpen]);

    return (
        <div
            ref={popupWindowRef}
            className={`absolute bottom-8 ${
                isOpen
                    ? "left-8 opacity-100 blur-0"
                    : "-left-[400px] opacity-0 blur-xl"
            }    z-30 w-[325px] bg-mainHoverColor p-3 rounded-md shadow-main border-[1px] border-mainLineColor transition-all`}
        >
            <h1 className="text-mainColor">{message}</h1>
            <div className="mt-4 flex justify-between items-center gap-4">
                <div className="w-[35px] h-[35px] rounded-full flex-center relative">
                    <PiArrowClockwiseThin className="text-4xl text-mainColor" />
                    <span className="absolute right-1/2 top-1/2 translate-x-[50%] translate-y-[-50%] text-mainColor">
                        {timeLeft}
                    </span>
                </div>
                <button
                    className="px-3 py-1 border-[1px] border-gray-400 rounded-lg text-mainColor hover:text-darkPink hover:border-darkPink hover:shadow-main transition-all"
                    onClick={undoDeleting}
                >
                    Undo
                </button>
            </div>
        </div>
    );
};

export default PopupWindow;
