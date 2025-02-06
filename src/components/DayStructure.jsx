import { useEffect } from "react";
import { useTimeRangeStore } from "../store";
import SingleBlock from "./SingleBlock";

const DayStructure = () => {
    const { timeRanges, getTimeRangesFromLocalStorage } = useTimeRangeStore();

    useEffect(() => {
        getTimeRangesFromLocalStorage();
    }, [getTimeRangesFromLocalStorage]);

    return (
        <>
            {timeRanges.map((range, i) => (
                <SingleBlock key={i} range={range} />
            ))}
        </>
    );
};

export default DayStructure;
