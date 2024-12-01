import { useEffect, useRef, useState } from "react";
import { PiArrowClockwiseThin } from "react-icons/pi";
import { useTimeRangeStore } from "../store";

// store isPopupOpen in store and import it here, set when you click create time range show this popup
// make popup dynamic, the text depends of the popup type passed through the params

const PopupWindow = () => {
    const { isPopupOpen, togglePopup } = useTimeRangeStore();
    const [timeLeft, setTimeLeft] = useState(5);
    const popupWindowRef = useRef();

    useEffect(() => {
        if (isPopupOpen === true) {
            const intervalId = setInterval(() => {
                setTimeLeft((timeLeft) => (timeLeft -= 1));
            }, 1000);

            setTimeout(() => {
                togglePopup(false);
                clearInterval(intervalId);
                setTimeLeft(5);
            }, 5000);
        }
    }, [isPopupOpen]);
    return (
        <div
            ref={popupWindowRef}
            className={`absolute bottom-8 ${
                isPopupOpen ? "left-8" : "-left-[400px]"
            }    z-10 w-[350px] bg-gray-200 p-3 rounded-md shadow-main border-[1px] border-gray-300 transition-all`}
        >
            <h1>Time Range was created successfully</h1>
            <div className="mt-4 flex justify-between items-center gap-4">
                <div className="w-[35px] h-[35px] rounded-full flex-center relative">
                    <PiArrowClockwiseThin className="text-4xl" />
                    <span className="absolute right-1/2 top-1/2 translate-x-[50%] translate-y-[-50%]">
                        {timeLeft}
                    </span>
                </div>
                <button
                    className="px-3 py-1 border-[1px] border-gray-400 rounded-lg hover:bg-gray-400 transition-all"
                    onClick={() => togglePopup(false)}
                >
                    Undo
                </button>
            </div>
        </div>
    );
};

export default PopupWindow;
