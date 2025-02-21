import { useEffect, useMemo, useRef, useState } from "react";
import { useTimeRangeStore } from "../store";
import BlockMenu from "./BlockMenu";
import BlockInfo from "./BlockInfo";

const SingleBlock = ({ range, zoomLevel }) => {
    const { dayStructure, currentMode } = useTimeRangeStore();
    const { timeStart, timeEnd } = range;
    const [height, setHeight] = useState();
    const [blockMenu, setBlockMenu] = useState({
        isOpen: false,
        x: "",
        y: "",
    });
    const [isShowingInfo, setIsShowingInfo] = useState(false);
    const blockRef = useRef(null);
    const entireSectionRef = useRef(null);

    // getting minuts from time
    const getMinuts = (time) => {
        return time.split(":")[1];
    };

    // getting minuts from time
    const getHours = (time) => {
        return time.split(":")[0];
    };

    let currentMark = 0;
    let endTimeMark = 0;

    if (getMinuts(timeStart) === "00" && getMinuts(timeEnd) === "00") {
        currentMark = dayStructure.find((s) => s.time === timeStart);
        endTimeMark = dayStructure.find((s) => s.time === timeEnd);
    }

    if (getMinuts(timeStart) !== "00" || getMinuts(timeEnd) !== "00") {
        let newTimeStart = `${getHours(timeStart)}:00`;
        let newTimeEnd = `${getHours(timeEnd)}:00`;

        let timeStartMinuts = Number(getMinuts(timeStart));
        let timeEndMinuts = Number(getMinuts(timeEnd));

        currentMark = { ...dayStructure.find((s) => s.time === newTimeStart) };
        endTimeMark = { ...dayStructure.find((s) => s.time === newTimeEnd) };

        // Updating immutably
        currentMark.positionX = currentMark.positionX + timeStartMinuts;
        endTimeMark.positionX = endTimeMark.positionX + timeEndMinuts;
    }

    // == exact minuts | Algorithm
    // detect above things
    // if not detected check between what time it is ex. 14.37 is between 14 and 15
    // width between marks is 60px, get the position of 14:00 and add minuts (37)
    // the same thing with time end but remove minuts
    // set the position

    // Setting basic height to the block
    // You can add more height if you want
    const width = useMemo(() => {
        return endTimeMark.positionX - currentMark.positionX + 2;
    }, [endTimeMark.positionX, currentMark.positionX]);

    useEffect(() => {
        let newHeight;
        if (width <= 60) {
            newHeight = (40 * width) / 10;
        } else if (width > 60 && width <= 240) {
            newHeight = (150 * width) / 100;
            blockRef.current.style.zIndex = 20;
        } else if (width > 240 && width <= 360) {
            newHeight = (240 * width) / 1000;
            blockRef.current.style.zIndex = 30;
        } else if (width > 360) {
            newHeight = 40;
            blockRef.current.style.zIndex = 40;
        }

        // Only update height if it has changed
        setHeight((prevHeight) =>
            prevHeight !== newHeight ? newHeight : prevHeight
        );
    }, [width, range]);

    // Open context | function
    const openBlockMenu = (e) => {
        e.preventDefault();
        if (currentMode === "Editing") {
            if (!blockRef.current) return;

            const blockRect = blockRef.current.getBoundingClientRect();
            const parent = blockRef.current.offsetParent;
            const parentRect = parent.getBoundingClientRect();

            // Get scale factor from parent (handles zoom)
            const computedStyle = window.getComputedStyle(parent);
            const scaleX =
                parseFloat(
                    computedStyle.transform.split("(")[1]?.split(",")[0]
                ) || 1;
            const scaleY =
                parseFloat(
                    computedStyle.transform.split("(")[1]?.split(",")[3]
                ) || 1;

            // Cursor position inside block (adjusted for zoom)
            const cursorInBlockX = (e.pageX - blockRect.left) / scaleX;
            const cursorInBlockY = (e.pageY - blockRect.top) / scaleY;

            // Block position inside parent (adjusted for zoom)
            const blockPositionInParentX =
                (blockRect.left - parentRect.left) / scaleX;
            const blockPositionInParentY =
                (blockRect.top - parentRect.top) / scaleY;

            // Final positions relative to parent
            const x = blockPositionInParentX + cursorInBlockX;
            const y = blockPositionInParentY + cursorInBlockY;

            setBlockMenu({
                isOpen: true,
                x,
                y,
            });
        }
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

    // This function will be called when user hovers a single block for some time,
    // it will show additonal information about certain block
    const showInfo = () => {
        setIsShowingInfo(true);
    };

    const hideInfo = () => {
        setIsShowingInfo(false);
    };

    return (
        <div ref={entireSectionRef}>
            {/* Control window */}
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
                className={`absolute bg-opacity-40 shadow-main border-[1px] border-b-0 border-white
                 py-1 rounded-tr-lg rounded-tl-lg h-0 cursor-pointer text-[.7rem] flex flex-col items-center
                 transition-all ease-in-out delay-50 bg-blue-500 duration-200`}
                style={{
                    left: `${currentMark.positionX + 18}px`,
                    bottom: `${currentMark.positionY + 35}px`,
                    width: `${
                        endTimeMark.positionX - currentMark.positionX + 2
                    }px`,
                    height: `${height}px`,
                }}
                onMouseOver={showInfo}
                onMouseLeave={hideInfo}
                onContextMenu={(e) => openBlockMenu(e)}
            >
                <span
                    className="px-1 text-mainColor"
                    style={{
                        fontSize: zoomLevel > 1 ? 12 / zoomLevel : "0.7rem",
                    }}
                >
                    {range.name}
                </span>

                {isShowingInfo && (
                    <BlockInfo>
                        {timeStart} - {timeEnd}
                    </BlockInfo>
                )}
            </div>
        </div>
    );
};

export default SingleBlock;
