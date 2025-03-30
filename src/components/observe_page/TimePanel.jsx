import { CiTimer } from "react-icons/ci";
import { RiPauseMiniLine } from "react-icons/ri";
import { GoTriangleRight } from "react-icons/go";

import { useState } from "react";
import { useTimeRangeStore } from "../../store";

const TimePanel = () => {
    const {
        currentAchievement,
        isRunning,
        hours,
        minutes,
        seconds,
        setIsRunning,
    } = useTimeRangeStore();
    const [isHovering, setIsHovering] = useState(false);

    const expendTimePanel = () => {
        setIsHovering(true);
    };

    const minimizeTimePanel = () => {
        setIsHovering(false);
    };

    return (
        currentAchievement.time &&
        location.pathname !== "/planner/observe" && (
            <div
                className={`absolute bottom-0 right-40 bg-pink-400 border border-mainLineColor w-[300px] px-2 py-[.3rem] rounded-tr-xl
            rounded-tl-xl transition-all z-20 cursor-pointer shadow-main
             before:absolute before:w-2 before:bg-pink-300 before:-left-2 before:bottom-0 before:rounded-tl-full before:transition-all
             after:absolute after:w-2 after:bg-pink-300 after:-right-2 after:bottom-0 after:rounded-tr-full after:transition-all
            ${
                isHovering
                    ? "h-[80px] after:h-8 before:h-8"
                    : "h-[40px] after:h-5 before:h-5"
            }`}
                onMouseOver={expendTimePanel}
                onMouseLeave={minimizeTimePanel}
            >
                {/* timer nav */}
                <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                        <span className="text-2xl text-white">
                            <CiTimer />
                        </span>
                        <p className="font-semibold">
                            {currentAchievement.name}
                        </p>
                    </div>
                    <p
                        className={`pr-3 text-xl ${
                            isRunning
                                ? "text-white"
                                : "text-gray-200 transition-all"
                        }`}
                    >
                        {String(hours).padStart(2, "0")}:
                        {String(minutes).padStart(2, "0")}:
                        {String(seconds).padStart(2, "0")}
                    </p>
                </div>

                {isHovering && (
                    <div className="mt-2 flex gap-1">
                        <button
                            className="bg-pink-300 border border-pink-300 w-12 rounded-md h-8 flex items-center justify-center hover:border-mainLineColor transition-all text-white
                            text-2xl"
                            onClick={() => setIsRunning(!isRunning)}
                        >
                            {isRunning ? (
                                <RiPauseMiniLine />
                            ) : (
                                <GoTriangleRight />
                            )}
                        </button>
                    </div>
                )}

                {/* ICON */}
            </div>
        )
    );
};

export default TimePanel;
