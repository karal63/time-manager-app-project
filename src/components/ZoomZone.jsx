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

                setZoomLevel((prevZoomLevel) => {
                    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
                    let newZoomLevel = prevZoomLevel * zoomFactor;

                    newZoomLevel = Math.max(0.58, Math.min(2.1, newZoomLevel));
                    if (newZoomLevel === prevZoomLevel) return prevZoomLevel;

                    const rect = zoomZoneRef.current.getBoundingClientRect();
                    const cursorX = (e.clientX - rect.left) / rect.width;
                    const cursorY = (e.clientY - rect.top) / rect.height;

                    let newTransformOrigin;

                    if (newZoomLevel > 1) {
                        newTransformOrigin = `${cursorX * 100}% ${
                            cursorY * 100
                        }%`;
                    } else {
                        newTransformOrigin = "50%";
                    }

                    zoomZoneRef.current.style.transformOrigin =
                        newTransformOrigin;
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
                className="flex-center flex-col h-[100vh] w-[100vw] z-10 relative"
                style={{
                    // transform: `scale(${zoomLevel})`,
                    transformOrigin: "center",
                }}
            >
                {/* day structure */}
                {<DayStructure zoomLevel={zoomLevel} />}

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
