import { useEffect, useRef, useState } from "react";

import { MdEdit } from "react-icons/md";
import { HiOutlineTrash } from "react-icons/hi2";
import { SlLockOpen } from "react-icons/sl";
import { SlLock } from "react-icons/sl";

import { useTimeRangeStore } from "../store";

const BlockMenu = ({ closeBlockMenu, blockMenu, range, entireSectionRef }) => {
    const {
        deleteTimeRange,
        togglePopup,
        setPopup,
        setBlockMenuRef,
        setTimeRangePanel,
        updateTimeRangePanel,
        setIsLockedRange,
    } = useTimeRangeStore();
    const menuRef = useRef(null);

    const [isLocked, setIsLocked] = useState(range.locked);

    useEffect(() => {
        setIsLocked(range.locked);
    }, [range]);

    useEffect(() => {
        // Closing context | Function | Closing when clicking right click outside the block
        const handleBlockMenu = (e) => {
            if (!entireSectionRef.current.contains(e.target)) {
                closeBlockMenu();
            }
        };

        // Closing context | Function | Closing when clicking left click outside the block
        const handleLeftClick = (e) => {
            if (!menuRef.current.contains(e.target)) {
                closeBlockMenu();
            }
        };

        window.addEventListener("click", handleLeftClick);
        window.addEventListener("contextmenu", handleBlockMenu);

        return () => {
            removeEventListener("click", handleLeftClick);
            removeEventListener("contextmenu", handleBlockMenu);
        };
    }, []);

    useEffect(() => {
        setBlockMenuRef(menuRef.current);
    }, [setBlockMenuRef]);

    const deleteBlock = () => {
        deleteTimeRange(range);
        togglePopup(true);
        setPopup(true, "Time range deleted from your timeline.");
        closeBlockMenu();
    };

    const editBlock = () => {
        setTimeRangePanel(true, "Edit");
        updateTimeRangePanel(range);
        closeBlockMenu();
    };

    const handleLock = () => {
        console.log(isLocked);
        setIsLockedRange(range, isLocked ? false : true);
    };

    return (
        <div
            ref={menuRef}
            className="absolute bg-mainBackground border border-mainLineColor shadow-main rounded-lg z-50 flex flex-col py-1"
            style={{
                top: `${blockMenu.y}px`,
                left: `${blockMenu.x}px`,
            }}
        >
            {!isLocked && (
                <button
                    className="flex gap-2 hover:bg-mainHoverColor pl-3 pr-5 py-2 w-full transition-all text-mainColor"
                    onClick={editBlock}
                >
                    <span className="text-2xl text-darkPink">
                        <MdEdit />
                    </span>{" "}
                    Edit
                </button>
            )}
            {!isLocked && (
                <button
                    className="flex gap-2 hover:bg-mainHoverColor pl-3 pr-5 py-2 w-full transition-all text-mainColor"
                    onClick={deleteBlock}
                >
                    <span className="text-2xl text-darkPink">
                        <HiOutlineTrash />
                    </span>{" "}
                    Delete
                </button>
            )}
            <button
                className="flex gap-2 hover:bg-mainHoverColor pl-3 pr-5 py-2 w-full transition-all text-mainColor"
                onClick={handleLock}
            >
                <span className="text-2xl text-darkPink">
                    {isLocked ? <SlLock /> : <SlLockOpen />}
                </span>{" "}
                {isLocked ? "Unlock" : "Lock"}
            </button>
            {/* Maybe duplcate button */}
        </div>
    );
};

export default BlockMenu;
