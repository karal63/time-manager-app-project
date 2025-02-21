import { useEffect, useRef } from "react";
import { useTimeRangeStore } from "../store";

const SingleTimeMark = ({ mark, zoomLevel }) => {
    const { setRangePosition, plannerZoneRef, addTimeRangePanelRef } =
        useTimeRangeStore();

    const { time } = mark;

    const rect = useRef(null);
    let timeoutId = useRef();

    useEffect(() => {
        if (rect.current) {
            const pos = rect.current.getBoundingClientRect();
            const parentPos = rect.current.offsetParent.getBoundingClientRect(); // Get parent position

            setRangePosition({
                ...mark,
                positionX: Math.round((pos.x - parentPos.x) / zoomLevel), // Adjust position based on parent
                positionY: Math.round((pos.y - parentPos.y) / zoomLevel),
            });
        }
    }, [zoomLevel]); // Trigger repositioning when zooming

    useEffect(() => {
        const handleResize = () => {
            if (rect.current) {
                const pos = rect.current.getBoundingClientRect();
                const parentPos =
                    rect.current.offsetParent.getBoundingClientRect(); // Get parent position

                setRangePosition({
                    ...mark,
                    positionX: Math.round((pos.x - parentPos.x) / zoomLevel), // Adjust position based on parent
                    positionY: Math.round((pos.y - parentPos.y) / zoomLevel),
                });
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [zoomLevel]);

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
