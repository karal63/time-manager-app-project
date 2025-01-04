import { useEffect, useRef, useState } from "react";
import { useTimeRangeStore } from "../store";
import SingleBlock from "./SingleBlock";

const DayStructure = () => {
    const { timeRanges } = useTimeRangeStore();

    return (
        <>
            {timeRanges.map((range, i) => (
                <SingleBlock key={i} range={range} />
            ))}
        </>
    );
};

export default DayStructure;
