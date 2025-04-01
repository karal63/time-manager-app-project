import { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { GoPencil } from "react-icons/go";
import { GoEye } from "react-icons/go";
import { IoCheckmarkOutline } from "react-icons/io5";
import { useTimeRangeStore } from "../store";

const SwitchMode = () => {
    const { setCurrentMode } = useTimeRangeStore();
    const [isDropDown, setIsDropDown] = useState(false);
    const [selectedMode, setSelectedMode] = useState("Editing");

    const setMode = (value) => {
        setSelectedMode(value);
        setIsDropDown(false);
    };

    useEffect(() => {
        setCurrentMode(selectedMode);
    }, [selectedMode]);

    return (
        <div className="relative max-sm:hidden">
            <button
                className="flex items-center border-[1px] border-mainLineColor hover:bg-mainHoverColor rounded-md px-3 py-1 transition-all"
                onClick={() => setIsDropDown(!isDropDown)}
            >
                <span className="text-2xl mr-3 text-mainColor">
                    {selectedMode === "Editing" ? <GoPencil /> : <GoPencil />}
                </span>
                <p className="text-lg text-mainColor">{selectedMode}</p>
                <span className="text-2xl ml-1 text-mainColor">
                    <MdKeyboardArrowDown />
                </span>
            </button>

            {isDropDown && (
                <div className="absolute top-[3.2rem] left-0 z-20 w-[300px] rounded-lg bg-mainBackground shadow-main border border-mainLineColor">
                    <ul>
                        <li className="hover:bg-mainHoverColor cursor-pointer text-[1.1rem] transition-all rounded-tr-lg rounded-tl-lg">
                            <button
                                className="px-4 py-2 flex items-center justify-between w-full"
                                onClick={() => setMode("Editing")}
                            >
                                <div className="flex items-center gap-2 text-mainColor">
                                    <span className="text-2xl text-darkPink">
                                        <GoPencil />
                                    </span>
                                    Editing
                                </div>

                                <div className="text-mainColor">
                                    {selectedMode === "Editing" ? (
                                        <IoCheckmarkOutline />
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </button>
                        </li>

                        <li className="hover:bg-mainHoverColor cursor-pointer text-[1.1rem] transition-all rounded-br-lg rounded-bl-lg">
                            <button
                                className="px-4 py-2 flex items-center justify-between w-full"
                                onClick={() => setMode("Viewing")}
                            >
                                <div className="flex items-center gap-2 text-mainColor">
                                    <span className="text-2xl text-darkPink">
                                        <GoEye />
                                    </span>
                                    Viewing
                                </div>

                                <div className="text-mainColor">
                                    {selectedMode === "Viewing" ? (
                                        <IoCheckmarkOutline />
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SwitchMode;
