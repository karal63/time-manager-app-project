import { useEffect, useState } from "react";
import { timeRangesVert } from "../../constants/index";
import { useTimeRangeStore } from "../../store";

const SingleVertBlock = ({ timeRange, distance }) => {
    const { setCurrentTimeRanges } = useTimeRangeStore();
    const [marks, setMarks] = useState({
        currentMark: "",
        endTimeMark: "",
    });
    const { timeStart, timeEnd } = timeRange;

    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const [isCurrent, setIsCurrent] = useState(false);

    const getMinutes = (time) => {
        return time.split(":")[1];
    };

    // getting minuts from time
    const getHours = (time) => {
        return time.split(":")[0];
    };

    useEffect(() => {
        if (getMinutes(timeStart) === "00" && getMinutes(timeEnd) === "00") {
            const newCurrentMark = timeRangesVert.find(
                (s) => s.time === timeStart
            );
            const newEndMark = timeRangesVert.find((s) => s.time === timeEnd);

            setMarks({
                currentMark: newCurrentMark,
                endTimeMark: newEndMark,
            });

            // Setting height to the time range
            setHeight(newEndMark.positionY - newCurrentMark.positionY);
        } else {
            let newTimeStart = `${getHours(timeStart)}:00`;
            let newTimeEnd = `${getHours(timeEnd)}:00`;

            let timeStartMinuts = Number(getMinutes(timeStart));
            let timeEndMinuts = Number(getMinutes(timeEnd));

            const newCurrentMark = {
                ...timeRangesVert.find((s) => s.time === newTimeStart),
            };

            const newEndMark = {
                ...timeRangesVert.find((s) => s.time === newTimeEnd),
            };

            // Adding minuts
            newCurrentMark.positionY =
                newCurrentMark.positionY + timeStartMinuts * 1.13;
            newEndMark.positionY = newEndMark.positionY + timeEndMinuts * 1.13;

            setHeight(newEndMark.positionY - newCurrentMark.positionY);

            setMarks({
                currentMark: {
                    ...newCurrentMark,
                },
                endTimeMark: {
                    ...newEndMark,
                },
            });
        }
    }, [timeRange]);

    useEffect(() => {
        if (height < 50) {
            setWidth(220);
        } else if (height > 50 && height < 100) {
            setWidth(200);
        } else if (height > 100 && height < 150) {
            setWidth(180);
        } else if (height > 150 && height < 200) {
            setWidth(160);
        } else {
            setWidth(50);
        }
    }, [height]);

    const getTotalMinutes = (time) => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
    };

    useEffect(() => {
        const currentDate = new Date();
        const currentMinutes =
            currentDate.getHours() * 60 + currentDate.getMinutes();

        const startMinutes = getTotalMinutes(timeStart);
        const endMinutes = getTotalMinutes(timeEnd);

        if (currentMinutes >= startMinutes && currentMinutes <= endMinutes) {
            setIsCurrent(true);
            setCurrentTimeRanges(timeRange);
        } else {
            setIsCurrent(false);
        }
    }, [distance]); // Dependency array

    return (
        <div
            className={`absolute left-20 rounded-md border-[1px] border-gray-300 shadow-main flex-center overflow-hidden ${
                isCurrent
                    ? "bg-blue-400 border-[2px] border-blue-600 z-10"
                    : "bg-blue-300 opacity-50"
            }`}
            style={{
                top: marks.currentMark.positionY + "px",
                height: height + "px",
                width: width + "px",
            }}
        >
            {timeRange.name}
        </div>
    );
};

export default SingleVertBlock;
