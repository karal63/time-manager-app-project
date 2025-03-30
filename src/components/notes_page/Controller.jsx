import { useEffect, useState } from "react";
import { SlNote } from "react-icons/sl";
import { SlLock } from "react-icons/sl";
import { VscSettings } from "react-icons/vsc";
import { useNotesStore } from "../../notesStore";
import { SlLockOpen } from "react-icons/sl";

const Controller = () => {
    const {
        setIsFilterPanelOpen,
        isFilterPanelOpen,
        isHandleBarOpen,
        setIsHandleBarOpen,
        notesRef,
        setEditingNote,
        setNote,
    } = useNotesStore();
    const [isHovering, setIsHovering] = useState(false);

    const scrollToTop = () => {
        if (notesRef.current) {
            notesRef.current.scrollTo({
                top: 0,
            });
        }
    };

    const handleMainBar = () => {
        setIsHandleBarOpen(!isHandleBarOpen);

        if (!isHandleBarOpen) {
            scrollToTop();
        } else {
            setEditingNote(false, {});
            setNote({
                name: "",
                date: "",
                priority: {
                    currency: false,
                    important: false,
                },
            });
        }
    };

    const openMainBar = () => {
        if (!isMobileDevice()) {
            scrollToTop();
            setIsHandleBarOpen(true);
        }
    };

    const handleFilterBar = () => {
        setIsFilterPanelOpen(!isFilterPanelOpen);
    };

    const isMobileDevice = () => {
        return window.matchMedia("(max-width: 768px)").matches;
    };

    return (
        <div
            className="absolute right-7 max-sm:right-4 bottom-4 flex-center rounded-full"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <button
                className={`text-2xl text-black w-14 h-14 flex-center rounded-full bg-pink-200 z-10 transition-all duration-300 ease-in-out transform ${
                    isHovering
                        ? "scale-110 text-darkPink border-darkPink"
                        : "scale-100"
                }`}
                onClick={openMainBar}
            >
                <SlNote />
            </button>

            {/* Expanding Section (Sliding Left) */}
            <div
                className={`absolute bottom-1/2 translate-y-[50%] right-2 bg-white border-[1px] shadow-main rounded-3xl h-10 flex items-center transition-all duration-300 overflow-hidden ${
                    isHovering ? "w-[100px]" : "w-0"
                }`}
            >
                <button onClick={handleMainBar} className="w-full h-full">
                    {isHandleBarOpen ? (
                        <SlLockOpen className="text-2xl ml-3 text-black" />
                    ) : (
                        <SlLock className="text-2xl ml-3 text-black" />
                    )}
                </button>
            </div>

            {/* Sliding Up (Settings Icon) */}
            <div
                className={`absolute right-1/2 translate-x-[50%] mb-2 border-[1px] shadow-main rounded-3xl w-10 flex justify-center
                     items-center transition-all duration-300 overflow-hidden ${
                         isHovering ? "h-[40px] bottom-full" : "h-0 bottom-0"
                     } ${
                    isFilterPanelOpen
                        ? "bg-black text-white"
                        : "bg-white text-black"
                }`}
            >
                <button
                    onClick={handleFilterBar}
                    className="w-full h-full flex-center"
                >
                    <VscSettings className="text-2xl" />
                </button>
            </div>
        </div>
    );
};

export default Controller;
