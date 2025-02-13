import { useEffect, useRef } from "react";
import { useTimeRangeStore } from "../store";

const SingleTimeMark = ({ mark, zoomLevel }) => {
    const { setRangePosition, plannerZoneRef } = useTimeRangeStore();

    const { time } = mark;

    const rect = useRef(null);
    let timeoutId = useRef();

    useEffect(() => {
        if (rect.current) {
            const pos = rect.current.getBoundingClientRect();
            setRangePosition({
                ...mark,
                positionX: Math.round(pos.x, 1),
                positionY: Math.round(pos.y, 1),
            });
        }
    }, []);

    useEffect(() => {
        const handleZoom = (e) => {
            if (
                e.ctrlKey &&
                plannerZoneRef &&
                !plannerZoneRef.contains(e.target)
            ) {
                timeoutId.current = setTimeout(() => {
                    const pos = rect.current.getBoundingClientRect();

                    setRangePosition({
                        ...mark,
                        positionX: Math.round(pos.x, 1),
                        positionY: Math.round(pos.y, 1),
                    });
                }, 10);
            }
        };

        window.addEventListener("wheel", handleZoom, { passive: false });

        return () => {
            window.removeEventListener("wheel", handleZoom);
            clearTimeout(timeoutId.current);
        };
    }, [plannerZoneRef]);

    return (
        <li ref={rect} className="flex flex-col items-center w-[37.98px]">
            <div className="w-[2px] h-3 bg-gradient-to-t from-transparent to-gray-500"></div>
            <span
                className={`text-gray-400 h-[24px]`}
                style={{
                    fontSize: zoomLevel > 1 ? 15 / zoomLevel : 16,
                }}
            >
                {time}
            </span>
        </li>
    );
};

export default SingleTimeMark;
