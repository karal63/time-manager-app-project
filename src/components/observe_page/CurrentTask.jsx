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
        <section className="w-full pl-10 pr-10 relative">
            {/* Right Side */}
            <section className="flex items-start mt-10">
                <div>
                    <div className="flex items-center gap-3 pb-9">
                        <button
                            className="border-[1px] border-mainLineColor rounded-lg px-3 py-3 text-mainColor"
                            onClick={() => setIsTimeAxisOpen(!isTimeAxisOpen)}
                        >
                            {isTimeAxisOpen ? (
                                <FaArrowLeftLong />
                            ) : (
                                <FaArrowRightLong />
                            )}
                        </button>
                        <p className="text-darkPink font-medium text-xl text-center">
                            Current Time Ranges
                        </p>
                    </div>
                    <CurrentTaskCards />
                </div>

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
