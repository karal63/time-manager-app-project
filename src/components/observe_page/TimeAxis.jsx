import { useTimeRangeStore } from "../../store";
import { useEffect, useRef, useState } from "react";
import SingleVertBlock from "./SingleVertBlock";
import { timeRangesVert } from "../../constants/index";
import { IoMdArrowDropleft } from "react-icons/io";

import gridImage from "../../assets/graph2.png";
import darkGridImage from "../../assets/darkGraph.png";

const TimeAxis = () => {
    const {
        dayStructure,
        timeRanges,
        getTimeRangesFromLocalStorage,
        isTimeAxisOpen,
        isDarkMode,
    } = useTimeRangeStore();
    const [distance, setDistance] = useState(0);

    const fullArea = useRef(null);

    useEffect(() => {
        getTimeRangesFromLocalStorage();

        const intervalId = setInterval(() => {
            const currentTime = new Date();
            const hours = String(currentTime.getHours()).padStart(2, "0");
            const minutes = currentTime.getMinutes();

            const newTimeStart = timeRangesVert.find(
                (el) => el.time === `${hours}:00`
            );

            if (newTimeStart) {
                setDistance(newTimeStart.positionY + minutes * 1.13);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (fullArea.current) {
            fullArea.current.scrollTo({
                top: distance - 300,
                behavior: "smooth",
            });
        }
    }, [distance]);

    return (
        <div
            ref={fullArea}
            className={`${
                isTimeAxisOpen ? "w-[400px] min-w-[400px]" : "w-0"
            } h-full relative overflow-x-hidden overflow-y-auto`}
            style={{
                clipPath: "inset(0 0 0 0)",
            }}
        >
            {/* Gradient */}
            <div className="sticky top-0 left-0 w-full h-32 bg-gradient-to-b from-mainBackground to-transparent z-20"></div>
            {/* Top Gradient */}

            <div
                className="bottom-0 right-0 transform -translate-x-1/2 max-sm:-translate-x-1/3 w-[80%] h-32 bg-gradient-to-t from-mainBackground to-transparent z-30 pointer-events-none"
                style={{
                    position: "fixed",
                }}
            ></div>

            {/* Container */}
            <div
                className="absolute w-full flex justify-end top-0 right-0 pr-4 bg-contain bg-"
                style={{
                    backgroundImage: `url(${
                        isDarkMode ? darkGridImage : gridImage
                    })`,
                }}
            >
                <ul className="flex flex-col gap-10 my-10">
                    {dayStructure.map((mark) => (
                        <li key={mark.id} className="flex items-center">
                            <span className="text-lg text-mainColor">
                                {mark.time}
                            </span>
                            <div className="w-4 h-[2px] bg-timeIndicator ml-2"></div>
                        </li>
                    ))}
                </ul>
                <div className="w-[2px] bg-timeAxis z-10"></div>
                {/* Current time */}
                <div
                    className="w-full absolute z-20 transition-all"
                    style={{
                        top: distance + "px",
                    }}
                >
                    <div className="h-[2px] bg-red-500"></div>
                    <span className="absolute -right-[18px] -top-[14px] text-red-500 text-3xl">
                        <IoMdArrowDropleft />
                    </span>
                </div>

                <div className="absolute w-full h-full">
                    {timeRanges.map((timeRange) => (
                        <SingleVertBlock
                            key={timeRange.id}
                            timeRange={timeRange}
                            distance={distance}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TimeAxis;
