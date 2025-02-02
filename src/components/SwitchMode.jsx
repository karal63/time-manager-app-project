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

    useEffect(() => {}, [location.pathname]);

    return (
        <div className="relative ">
            <button
                className="flex items-center border-[1px] border-pink-300 rounded-md px-3 py-1"
                onClick={() => setIsDropDown(!isDropDown)}
            >
                <span className="text-2xl mr-3">
                    {selectedMode === "Editing" ? <GoPencil /> : <GoPencil />}
                </span>
                <p className="text-lg">{selectedMode}</p>
                <span className="text-2xl ml-1">
                    <MdKeyboardArrowDown />
                </span>
            </button>

            {isDropDown && (
                <div className="absolute top-[3.2rem] right-0 z-20 w-[300px] rounded-lg bg-white shadow-main">
                    <ul>
                        <li className=" hover:bg-gray-100 cursor-pointer text-[1.1rem] transition-all">
                            <button
                                className="px-4 py-2 flex items-center justify-between w-full"
                                onClick={() => setMode("Editing")}
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl text-darkPink">
                                        <GoPencil />
                                    </span>
                                    Editing
                                </div>

                                <div>
                                    {selectedMode === "Editing" ? (
                                        <IoCheckmarkOutline />
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </button>
                        </li>

                        <li className=" hover:bg-gray-100 cursor-pointer text-[1.1rem] transition-all">
                            <button
                                className="px-4 py-2 flex items-center justify-between w-full"
                                onClick={() => setMode("Viewing")}
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl text-darkPink">
                                        <GoEye />
                                    </span>
                                    Viewing
                                </div>

                                <div>
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
