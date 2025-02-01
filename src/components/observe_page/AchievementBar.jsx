import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { categories } from "../../constants";

const DropDownCategoryMenu = () => {
    return (
        <ul className="border-[1px] border-gray-200">
            {categories.map((category) => (
                <li
                    className="w-full py-1 flex-center text-sm border-b-[1px] border-gray-100 bg-white"
                    key={category.id}
                >
                    {category.name}
                </li>
            ))}
        </ul>
    );
};

const AchievementBar = () => {
    const [seconds, setSeconds] = useState(0);
    const [minuts, setMinuts] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const [achievement, setAchievement] = useState({
        name: "",
        category: "",
    });

    let intervalRef = useRef(null);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                if (seconds >= 59) {
                    setMinuts((prevMinuts) => prevMinuts + 1);
                    setSeconds(0);
                } else {
                    setSeconds((prevSeconds) => prevSeconds + 1);
                }
            }, 250);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [isRunning, seconds]);

    return (
        <div className="flex w-full items-center gap-5 bg-gray-50 border-[1px] px-4 py-2">
            {/* Dropdown list */}
            <div className="flex flex-col max-h-[37.6px]">
                <button className="px-4 py-2 rounded-sm bg-purple-200 border-[1px] border-gray-300 text-sm">
                    Testing
                </button>

                <DropDownCategoryMenu />
            </div>

            <form className="w-full">
                <input
                    type="text"
                    className="bg-transparent outline-none w-full"
                    placeholder="What did you achive?"
                    onChange={(e) =>
                        setAchievement({
                            ...achievement,
                            name: e.target.value,
                        })
                    }
                />
            </form>

            <span className="text-xl">
                {String(minuts).padStart(2, "0")}:
                {String(seconds).padStart(2, "0")}
            </span>

            <button
                className="bg-darkPink rounded-lg px-5 py-2 text-base text-white w-24"
                onClick={() => {
                    setIsRunning(!isRunning);
                }}
            >
                {isRunning ? "Stop" : "Start"}
            </button>
        </div>
    );
};

export default AchievementBar;
