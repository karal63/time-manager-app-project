// icons
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import { useTimeRangeStore } from "../../store";
import CurrentTaskCards from "./CurrentTaskCards";
import AchievementBar from "./AchievementBar";
import AchievementTable from "./AchievementTable";
import ManipulateAchieveBar from "./ManipulateAchieveBar";

const CurrentTask = () => {
    const { isTimeAxisOpen, setIsTimeAxisOpen } = useTimeRangeStore();

    return (
        <section className="w-full h-[550px] pl-10 pr-10">
            <div className="flex items-center gap-6 pt-3 pb-9">
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
