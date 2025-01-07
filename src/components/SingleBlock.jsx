import { useEffect, useRef, useState } from "react";
import { useTimeRangeStore } from "../store";
import BlockMenu from "./BlockMenu";

const SingleBlock = ({ range }) => {
    const { dayStructure, blockMenuRef } = useTimeRangeStore();
    const { timeStart, timeEnd } = range;
    const [height, setHeight] = useState();
    const [blockMenu, setBlockMenu] = useState({
        isOpen: false,
        x: "",
        y: "",
    });
    const blockRef = useRef(null);
    const entireSectionRef = useRef(null);

    const currentMark = dayStructure.find((s) => s.time === timeStart);
    const endTimeMark = dayStructure.find((s) => s.time === timeEnd);
    const width = endTimeMark.positionX - currentMark.positionX + 2;

    // Setting basic height to the block
    // You can add more height if you want
    useEffect(() => {
        console.log(width);
        if (width <= 60) {
            setHeight((40 * width) / 10);
        }
        if (width > 60 && width <= 240) {
            setHeight((150 * width) / 100);
        }
        if (width > 240 && width <= 360) {
            setHeight((240 * width) / 1000);
        }
        if (width > 360) {
            setHeight(40);
        }
    }, [width, range]);

    // Open context | function
    const openBlockMenu = (e) => {
        e.preventDefault();

        const x = e.clientX;
        const y = e.clientY;

        setBlockMenu({
            isOpen: true,
            x,
            y,
        });
    };

    // Close context | function
    const closeBlockMenu = () => {
        setBlockMenu({
            isOpen: false,
            x: "",
            y: "",
        });
    };

    // Block animation
    useEffect(() => {
        if (blockMenu.isOpen) {
            blockRef.current.classList.add("block-transition");
        } else {
            blockRef.current.classList.remove("block-transition");
        }
    }, [blockMenu]);

    return (
        <div ref={entireSectionRef}>
            {blockMenu.isOpen && (
                <BlockMenu
                    closeBlockMenu={closeBlockMenu}
                    blockMenu={blockMenu}
                    range={range}
                    entireSectionRef={entireSectionRef}
                />
            )}
            <div
                ref={blockRef}
                className={`absolute bg-opacity-40 shadow-main border-[1px] border-b-0
                 py-1 px-3 rounded-tr-lg rounded-tl-lg h-0 cursor-pointer text-sm flex justify-center
                 transition-all ease-in-out delay-50 bg-blue-500 duration-200`}
                style={{
                    left: `${currentMark.positionX + 18}px`,
                    bottom: `${currentMark.positionY - 35}px`,
                    width: `${
                        endTimeMark.positionX - currentMark.positionX + 2
                    }px`,
                    height: `${height}px`,
                }}
                onContextMenu={(e) => openBlockMenu(e)}
            >
                {range.name}
            </div>
        </div>
    );
};

export default SingleBlock;
