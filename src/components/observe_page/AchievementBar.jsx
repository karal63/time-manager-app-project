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
        <ul className="border-[1px] border-gray-200 absolute top-9 w-full max-h-[300px] overflow-x-hidden overflow-scroll">
            {categories.map((category) => (
                <li
                    className="w-full text-md border-b-[1px] border-gray-100 bg-white"
                    key={category.id}
                >
                    <button
                        className="w-full h-full py-2"
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
    const { addAchievement, achievements } = useTimeRangeStore();
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

    let intervalRef = useRef(null);

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
                addAchievement(achievement);
                setMinutes(0);
                setSeconds(0);
            }
        }
    }, [isRunning, addAchievement]);

    const runStopper = () => {
        setIsRunning(!isRunning);
    };

    return (
        <div className="flex w-full items-center bg-gray-50 border-[1px] px-4 py-2">
            <form className="w-full">
                <input
                    type="text"
                    className="bg-transparent outline-none w-full"
                    placeholder="What are you working on?"
                    onChange={(e) =>
                        setAchievement({
                            ...achievement,
                            name: e.target.value,
                        })
                    }
                />
            </form>

            {/* Category */}
            {/* Dropdown list */}
            <div className="relative">
                <button
                    className="bg-blue-400 bg-opacity-65 border-[1px] border-gray-400 px-6 py-1 rounded-md text-nowrap text-white w-[150px] flex justify-center items-center gap-1"
                    onClick={() => setIsDropDownOpen(!isDropDownOpen)}
                >
                    <span>{achievement.category}</span>
                    <MdKeyboardArrowDown className="text-2xl" />
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
                className="text-lg min-w-20 bg-darkPink ml-2 rounded-md py-1 text-white"
                onClick={runStopper}
            >
                {isRunning ? "Stop" : "Start"}
            </button>
        </div>
    );
};

export default AchievementBar;
