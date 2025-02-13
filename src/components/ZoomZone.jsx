import { useEffect, useRef, useState } from "react";
import { useTimeRangeStore } from "../store";
import DayStructure from "./DayStructure";
import SingleTimeMark from "./SingleTimeMark";

const ZoomZone = () => {
    const { dayStructure } = useTimeRangeStore();
    const globalBlockRef = useRef(null);
    const zoomZoneRef = useRef(null);
    const [zoomLevel, setZoomLevel] = useState(1);

    useEffect(() => {
        const zoom = (e) => {
            if (
                zoomZoneRef.current &&
                globalBlockRef.current &&
                globalBlockRef.current.contains(e.target) &&
                e.ctrlKey
            ) {
                e.preventDefault();

                const rect = zoomZoneRef.current.getBoundingClientRect();

                setZoomLevel((prevZoomLevel) => {
                    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
                    const newZoomLevel = Math.min(
                        Math.max(prevZoomLevel * zoomFactor, 0.58),
                        2.1
                    );

                    if (newZoomLevel === prevZoomLevel) return prevZoomLevel;

                    // Calculating cursor position as percentages
                    const cursorX =
                        ((e.clientX - rect.left) / rect.width) * 100;
                    const cursorY =
                        ((e.clientY - rect.top) / rect.height) * 100;

                    // Applying zoom and setting transform origin | enebles side scrolling
                    zoomZoneRef.current.style.transformOrigin = `${cursorX}% ${cursorY}%`;
                    zoomZoneRef.current.style.transform = `scale(${newZoomLevel})`;

                    return newZoomLevel;
                });
            }
        };

        window.addEventListener("wheel", zoom, { passive: false });
        return () => window.removeEventListener("wheel", zoom);
    }, []);

    return (
        <div ref={globalBlockRef} className="w-full h-full relative">
            <div
                ref={zoomZoneRef}
                className="flex-center flex-col absolute h-full w-full z-10"
            >
                {/* day structure */}
                {<DayStructure />}

                {/* timeline */}
                <div className="flex">
                    <div className="h-[2px] w-[500px] bg-gradient-to-r from-transparent to-gray-500"></div>
                    <div className="h-[2px] w-[1336px] bg-gray-500"></div>
                    <div className="h-[2px] w-[500px] bg-gradient-to-l from-transparent to-gray-500"></div>
                </div>

                {/* time marks */}
                <ul className="flex gap-5">
                    {dayStructure.map((mark) => (
                        <SingleTimeMark
                            key={mark.id}
                            mark={mark}
                            zoomLevel={zoomLevel}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ZoomZone;
