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
        <ul className="border-[1px] border-gray-200 absolute top-9 w-full max-h-[300px] overflow-x-hidden overflow-scroll z-20">
            {categories.map((category) => (
                <li
                    className="w-full text-md border-b-[1px] border-gray-100 bg-gray-50"
                    key={category.id}
                >
                    <button
                        className="w-full h-full py-2 text-left pl-3 hover:bg-gray-200"
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
    } = useTimeRangeStore();
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [achievement, setAchievement] = useState({
        name: "",
        category: "None",
        time: "",
    });
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const [isDraggedAchievement, setIsDraggedAchievement] = useState(false);

    let intervalRef = useRef(null);

    const resetTime = () => {
        setMinutes(0);
        setSeconds(0);
        setHours(0);
    };

    const clearAchievements = () => {
        setAchievement({
            name: "",
            category: "None",
            time: "",
        });
    };

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                if (minutes > 59) {
                    setHours((prevHours) => prevHours + 1);
                    setMinutes(0);
                }
                if (seconds >= 59) {
                    setMinutes((prevMinutes) => prevMinutes + 1);
                    setSeconds(0);
                } else {
                    setSeconds((prevSeconds) => prevSeconds + 1);
                }
                setAchievement({
                    ...achievement,
                    time: `${String(hours).padStart(2, "0")}:${String(
                        minutes
                    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`,
                });
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [isRunning, seconds, minutes, achievement]);

    useEffect(() => {
        if (!isRunning) {
            if (achievement.name && achievement.time) {
                if (draggableAchievement.id && isDraggedAchievement) {
                    editAchievement(draggableAchievement.id, achievement);
                    setDraggedAchievement({});
                    setIsDraggedAchievement(false);
                } else {
                    addAchievement(achievement);
                }
                clearAchievements();
                resetTime();
            }
        }
    }, [isRunning, addAchievement]);

    const runStopper = () => {
        setIsRunning(!isRunning);
    };

    const applyDraggableAchieve = () => {
        setIsDraggedAchievement(true);
        setAchievement({
            ...achievement,
            name: draggableAchievement.name,
            category: draggableAchievement.category,
            time: draggableAchievement.time,
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
        });
        resetTime();
    };

    return (
        <div
            onDragOver={(e) => {
                e.preventDefault();
            }}
            onDrop={() => {
                applyDraggableAchieve();
            }}
            className="flex w-full items-center bg-gray-50 border-[1px] pr-4 h-[53px] relative rounded-md"
        >
            <form className="w-full h-full">
                <input
                    type="text"
                    className="bg-transparent outline-none w-full h-full px-4 block"
                    placeholder="What are you working on?"
                    onChange={(e) =>
                        setAchievement({
                            ...achievement,
                            name: e.target.value,
                        })
                    }
                    value={achievement.name}
                />
            </form>

            {/* Category */}
            {/* Dropdown list */}
            <div className="relative flex items-center">
                <button
                    className="bg-blue-100 bg-opacity-65 min-w-[115px] px-1 py-1 rounded-md text-nowrap text-gray-700 border-[1px] border-gray-300 hover:border-blue-300 
                    shadow-sm hover:shadow-none max-w-max flex justify-center items-center gap-1 transition-all"
                    onClick={() => setIsDropDownOpen(!isDropDownOpen)}
                >
                    <span>{achievement.category}</span>
                    <MdKeyboardArrowDown className="text-xl" />
                </button>

                {isDropDownOpen && (
                    <DropDownCategoryMenu
                        setAchievement={setAchievement}
                        achievement={achievement}
                        setIsDropDownOpen={setIsDropDownOpen}
                    />
                )}
            </div>

            {/* Time */}
            <span className="text-2xl ml-5">
                {String(hours).padStart(2, "0")}:
                {String(minutes).padStart(2, "0")}:
                {String(seconds).padStart(2, "0")}
            </span>

            <button
                className="text-lg bg-darkPink hover:bg-pink-500 active:bg-darkPink transition-all ml-2 rounded-md py-1 px-7 text-white shadow-main"
                onClick={runStopper}
            >
                {isRunning ? "Stop" : "Start"}
            </button>

            {/* Showing info if achievement is dragged */}
            {isDraggedAchievement && (
                <button
                    className="absolute right-0 -top-6 text-sm text-gray-400"
                    onClick={cancelEditing}
                >
                    Click here to cancel editing.
                </button>
            )}
        </div>
    );
};

export default AchievementBar;
