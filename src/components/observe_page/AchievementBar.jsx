import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { categories } from "../../constants";
import { useTimeRangeStore } from "../../store";

import { MdKeyboardArrowDown } from "react-icons/md";

const DropDownCategoryMenu = ({
    setAchievement,
    achievement,
    setIsDropDownOpen,
}) => {
    const handleClick = (category) => {
        setAchievement({
            ...achievement,
            category: category.name,
        });
        setIsDropDownOpen(false);
    };

    return (
        <ul className="border-[1px] border-mainLineColor absolute top-9 w-full max-h-[300px] overflow-x-hidden overflow-scroll z-20 bg-mainBackground">
            {categories.map((category) => (
                <li
                    className="w-full text-md border-b-[1px] border-gray-100 border-mainLineColor bg-lightGray text-mainColor"
                    key={category.id}
                >
                    <button
                        className="w-full h-full py-2 text-left pl-3 bg-transparent hover:bg-mainLineColor"
                        onClick={() => handleClick(category)}
                    >
                        {category.name}
                    </button>
                </li>
            ))}
        </ul>
    );
};

const AchievementBar = () => {
    const {
        addAchievement,
        draggableAchievement,
        editAchievement,
        setDraggedAchievement,
        currentAchievement,
        setAchievement,
        isRunning,
        setIsRunning,
        seconds,
        minutes,
        hours,
        setSeconds,
        setMinutes,
        setHours,
        clearTime,
        isDraggedAchievement,
        setIsDraggedAchievement,
    } = useTimeRangeStore();

    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const [isError, setIsError] = useState(false);

    const clearAchievements = () => {
        setAchievement({
            name: "",
            category: "None",
            time: "",
            diff: 0,
        });
    };

    const clearCurrentAchievement = () => {
        localStorage.removeItem("currentAchievement");
    };

    const saveAchieve = () => {
        if (currentAchievement.time) {
            if (!currentAchievement.name) {
                return setIsError(true);
            } else {
                setIsError(false);

                if (draggableAchievement.id && isDraggedAchievement) {
                    editAchievement(
                        draggableAchievement.id,
                        currentAchievement
                    );
                    setDraggedAchievement({});
                    setIsDraggedAchievement(false);
                } else {
                    addAchievement(currentAchievement);
                }
                clearAchievements();
                clearTime();
                clearCurrentAchievement();
            }
        }
    };

    const applyDraggableAchieve = () => {
        setIsDraggedAchievement(true);
        setIsRunning(false);

        setAchievement({
            name: draggableAchievement.name,
            category: draggableAchievement.category,
            time: draggableAchievement.time,
            diff: draggableAchievement.diff,
        });

        const time = draggableAchievement.time.split(":").map(Number);

        setMinutes(time[1]);
        setSeconds(time[2]);
        setHours(time[0]);
    };

    const cancelEditing = () => {
        setIsDraggedAchievement(false);
        setAchievement({
            name: "",
            category: "None",
            time: "",
            diff: 0,
        });
        clearTime();
        setIsRunning(false);
    };

    useEffect(() => {
        console.log(isDraggedAchievement);
    }, [isDraggedAchievement]);

    return (
        <div
            onDragOver={(e) => {
                e.preventDefault();
            }}
            onDrop={() => {
                applyDraggableAchieve();
            }}
            className={`flex w-full items-center bg-lightGray border-[1px] border-mainLineColor pr-4 h-[53px] relative rounded-md ${
                isError ? "border-red-600" : ""
            }`}
        >
            <form
                className="w-full h-full"
                onSubmit={(e) => e.preventDefault()}
            >
                <input
                    type="text"
                    className="bg-transparent text-mainColor outline-none w-full h-full px-4 block text-lg"
                    placeholder="What are you working on?"
                    onChange={(e) =>
                        setAchievement({
                            ...currentAchievement,
                            name: e.target.value,
                        })
                    }
                    value={currentAchievement.name}
                />
            </form>

            {/* Category */}
            {/* Dropdown list */}
            <div className="relative flex items-center">
                <button
                    className="bg-mainLineColor bg-opacity-65 min-w-[115px] px-1 py-1 rounded-md text-nowrap text-mainColor border-[1px] border-mainLineColor hover:border-blue-300 
                    shadow-sm hover:shadow-none max-w-max flex justify-center items-center gap-1 transition-[border]"
                    onClick={() => setIsDropDownOpen(!isDropDownOpen)}
                >
                    <span>{currentAchievement.category}</span>
                    <MdKeyboardArrowDown className="text-xl" />
                </button>

                {isDropDownOpen && (
                    <DropDownCategoryMenu
                        setAchievement={setAchievement}
                        achievement={currentAchievement}
                        setIsDropDownOpen={setIsDropDownOpen}
                    />
                )}
            </div>

            {/* Time */}
            <span className="text-xl ml-5 text-mainColor">
                {String(hours).padStart(2, "0")}:
                {String(minutes).padStart(2, "0")}:
                {String(seconds).padStart(2, "0")}
                {/* {currentAchievement.time} */}
            </span>

            {isRunning ? (
                <button
                    className="w-[115px] text-lg bg-darkPink active:bg-darkPink transition-all ml-2 rounded-md py-1 px-7 
        border-2 border-transparent buttonStart text-white "
                    onClick={() => {
                        setIsRunning(false);
                        saveAchieve();
                    }}
                >
                    Stop
                </button>
            ) : (
                <button
                    className="w-[115px] text-lg bg-darkPink active:bg-darkPink transition-all ml-2 rounded-md py-1 px-7 
            border-2 border-transparent buttonStart text-white "
                    onClick={() => setIsRunning(true)}
                >
                    Start
                </button>
            )}

            {/* Showing info if achievement is dragged */}
            {isDraggedAchievement && (
                <button
                    className="absolute right-0 -top-6 text-sm text-gray-400"
                    onClick={cancelEditing}
                >
                    Click here to cancel editing.
                </button>
            )}

            {isError && (
                <p className="absolute right-0 -top-6 text-sm text-red-400">
                    Name is required.
                </p>
            )}
        </div>
    );
};

export default AchievementBar;
