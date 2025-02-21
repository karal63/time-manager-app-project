import { useEffect, useRef } from "react";

import { MdEdit } from "react-icons/md";
import { HiOutlineTrash } from "react-icons/hi2";
import { useTimeRangeStore } from "../store";

const BlockMenu = ({ closeBlockMenu, blockMenu, range, entireSectionRef }) => {
    const {
        deleteTimeRange,
        togglePopup,
        setPopup,
        setBlockMenuRef,
        setTimeRangePanel,
        updateTimeRangePanel,
    } = useTimeRangeStore();
    const menuRef = useRef(null);

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

    return (
        <div
            ref={menuRef}
            className="absolute bg-mainBackground border border-mainLineColor shadow-main rounded-lg z-50 flex flex-col py-2"
            style={{
                top: `${blockMenu.y}px`,
                left: `${blockMenu.x}px`,
            }}
        >
            <button
                className="flex gap-2 hover:bg-mainHoverColor pl-3 pr-5 py-2 w-full transition-all text-mainColor"
                onClick={editBlock}
            >
                <span className="text-2xl text-darkPink">
                    <MdEdit />
                </span>{" "}
                Edit
            </button>
            <button
                className="flex gap-2 hover:bg-mainHoverColor pl-3 pr-5 py-2 w-full transition-all text-mainColor"
                onClick={deleteBlock}
            >
                <span className="text-2xl text-darkPink">
                    <HiOutlineTrash />
                </span>{" "}
                Delete
            </button>
            {/* Maybe duplcate button */}
        </div>
    );
};

export default BlockMenu;
