import { useEffect, useRef, useState } from "react";
import { useTimeRangeStore } from "../store";

const SingleBlock = ({ range }) => {
    const { dayStructure } = useTimeRangeStore();
    const { timeStart, timeEnd } = range;
    const [height, setHeight] = useState();
    const block = useRef(null);

    const currentMark = dayStructure.find((s) => s.time === range.timeStart);
    const endTimeMark = dayStructure.find((s) => s.time === range.timeEnd);
    const width = endTimeMark.positionX - currentMark.positionX + 2;

    // not accomplished yet
    useEffect(() => {
        console.log(width);
        if (width <= 60) {
            setHeight((40 * width) / 10);
        }
        if (width > 60 && width <= 240) {
            setHeight((100 * width) / 100);
        }
        if (width > 240 && width <= 360) {
            setHeight((240 * width) / 1000);
        }
        if (width > 360) {
            setHeight(40);
        }
    }, [width, range, height]);

    const animateBlockHover = () => {
        block.current.style.height = `${height + 10}px`;
    };

    const resetBlockAnimation = () => {
        block.current.style.height = `${height}px`;
    };

    return (
        <div
            ref={block}
            className={`absolute bg-blue-500 bg-opacity-20 shadow-main border-[1px] border-b-0 border-blue-300 py-1 px-3 rounded-tr-lg rounded-tl-lg h-10 transition-all hover:h-${2} cursor-pointer`}
            style={{
                left: `${currentMark.positionX + 18}px`,
                bottom: `${currentMark.positionY - 35}px`,
                width: `${endTimeMark.positionX - currentMark.positionX + 2}px`,
                height: `${height}px`,
            }}
            onMouseOver={animateBlockHover}
            onMouseLeave={resetBlockAnimation}
        >
            {range.name}
        </div>
    );
};

// The problem is that if i scroll my scrolling zone and then resize the page the block position is unnormous
// No idea how to fix that

export default SingleBlock;
