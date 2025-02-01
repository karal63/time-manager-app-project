// icons
import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import { useTimeRangeStore } from "../../store";
import CurrentTaskCards from "./CurrentTaskCards";
import AchievementBar from "./AchievementBar";
import AchievementTable from "./AchievementTable";
import ManipulateAchieveBar from "./ManipulateAchieveBar";

const CurrentTask = ({ isTimeAxisOpen, setIsTimeAxisOpen }) => {
    const { timeRanges } = useTimeRangeStore();
    const [currentTime, setCurrentTime] = useState(new Date().getHours());

    // how to get current time range

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date().getHours());
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    // name a panel where the user can highlight what he accomplished during this time and how much time it tool
    // craate sort of table with numeric achivements
    // timer in panel

    return (
        <section className="w-full h-[550px] pl-10 pr-10">
            <div className="flex justify-between items-center pt-3 pb-9">
                <div className="flex items-center gap-6">
                    <button
                        className="border-[1px] rounded-lg px-3 py-3"
                        onClick={() => setIsTimeAxisOpen(!isTimeAxisOpen)}
                    >
                        {isTimeAxisOpen ? (
                            <FaArrowLeftLong />
                        ) : (
                            <FaArrowRightLong />
                        )}
                    </button>

                    <p className="text-darkPink font-medium text-xl">
                        Current Time Range
                    </p>
                </div>

                <p>
                    Next: <b>Work</b>
                </p>
            </div>

            {/* Right Side */}
            <section className="flex items-start">
                <CurrentTaskCards />

                <div className="ml-10 w-full">
                    <AchievementBar />
                    <ManipulateAchieveBar />
                    <AchievementTable />
                </div>
            </section>
        </section>
    );
};

export default CurrentTask;
