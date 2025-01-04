import { useEffect, useRef } from "react";
import { useTimeRangeStore } from "../store";

const SingleTimeMark = ({ mark }) => {
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
    }, [setRangePosition]);

    useEffect(() => {
        const handleZoom = (e) => {
            // update mark position only when resizing whole page
            if (e.ctrlKey && !plannerZoneRef.contains(e.target)) {
                if (timeoutId.current) {
                    clearTimeout(timeoutId.current);
                }

                setTimeout(() => {
                    const pos = rect.current.getBoundingClientRect();
                    console.log(pos.y);
                    console.log(rect.current.offsetTop);

                    setRangePosition({
                        ...mark,
                        positionX: Math.round(pos.x, 1),
                        positionY: Math.round(pos.y, 1),
                    });
                }, [10]);
            }
        };

        window.addEventListener("wheel", handleZoom, { passive: false });

        return () => {
            window.removeEventListener("wheel", handleZoom);
        };
    }, [plannerZoneRef]);

    return (
        <li ref={rect} className="flex flex-col items-center">
            <div className="w-[2px] h-3 bg-black"></div>
            <span className="text-gray-400">{time}</span>
        </li>
    );
};

export default SingleTimeMark;
