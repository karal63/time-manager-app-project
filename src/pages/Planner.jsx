import { GoPlus } from "react-icons/go";
import AddTimeRangePanel from "../components/addTimeRangePanel";

import { useRef, useState } from "react";
import { useTimeRangeStore } from "../store.js";

const Planner = () => {
    const [isAddingPanelOpen, setIsAddingPanelOpen] = useState(false);

    // getting from useTimeRangeStore
    const { dayStructur } = useTimeRangeStore();

    return (
        <section className="h-[calc(100vh-68px)] bg-hero-pattern bg-contain relative flex-center flex-col">
            {/* absolute elements */}
            <div
                className={`absolute -top-1 flex items-start gap-5 transition-all ${
                    isAddingPanelOpen ? "right-0" : "-right-[350px]"
                } `}
            >
                {/* button that shows add time range component */}
                <button
                    className={`relative top-5 bg-gradient-to-tr from-pink-600 to-yellow-300 rounded-full p-[.2rem] transition-all ${
                        isAddingPanelOpen ? "rotate-[45deg]" : ""
                    }`}
                    onClick={() => setIsAddingPanelOpen(!isAddingPanelOpen)}
                >
                    <div className="h-full w-full rounded-full bg-white">
                        <GoPlus className="text-5xl" />
                    </div>
                </button>

                {/* AddTimeRangePanel */}
                <AddTimeRangePanel
                    setIsAddingPanelOpen={setIsAddingPanelOpen}
                />
            </div>

            <div className="h-[2px] w-[1337px] bg-gray-500"></div>

            <ul className="flex gap-5 relative">
                {dayStructur.map((r) => (
                    <li key={r.time} className="flex flex-col items-center">
                        <div className="w-[2px] h-3 bg-black"></div>
                        <span className="text-gray-400">{r.time}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Planner;
