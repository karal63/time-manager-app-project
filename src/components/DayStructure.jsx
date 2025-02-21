import { useEffect } from "react";
import { useTimeRangeStore } from "../store";
import SingleBlock from "./SingleBlock";

const DayStructure = ({ zoomLevel }) => {
    const { timeRanges, getTimeRangesFromLocalStorage } = useTimeRangeStore();

    useEffect(() => {
        getTimeRangesFromLocalStorage();
    }, [getTimeRangesFromLocalStorage]);

    return (
        <>
            {timeRanges.map((range) => (
                <SingleBlock
                    key={range.id}
                    range={range}
                    zoomLevel={zoomLevel}
                />
            ))}
        </>
    );
};

export default DayStructure;
