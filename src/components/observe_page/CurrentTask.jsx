// icons
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import { TbTimeDurationOff } from "react-icons/tb";
import { useTimeRangeStore } from "../../store";
import CurrentTaskCards from "./CurrentTaskCards";
import AchievementBar from "./AchievementBar";
import AchievementTable from "./AchievementTable";
import ManipulateAchieveBar from "./ManipulateAchieveBar";
import { useEffect } from "react";

const CurrentTask = () => {
    const {
        isTimeAxisOpen,
        setIsTimeAxisOpen,
        isCurrentRangesOpen,
        setIsCurrentRangesOpen,

        initializePreferences,
    } = useTimeRangeStore();

    useEffect(() => {
        initializePreferences();
    }, []);

    return (
        <section className="w-full pl-10 pr-10 relative">
            {/* Right Side */}
            <section className="flex items-start mt-10">
                {/* buttons */}
                <div className="absolute bottom-4 left-4 flex flex-col gap-2 z-10">
                    <button
                        className="border-[1px] border-mainLineColor rounded-lg px-3 py-3 text-mainColor"
                        onClick={() =>
                            setIsCurrentRangesOpen(!isCurrentRangesOpen)
                        }
                    >
                        {isTimeAxisOpen ? (
                            <TbTimeDurationOff />
                        ) : (
                            <TbTimeDurationOff />
                        )}
                    </button>

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
                </div>

                {isCurrentRangesOpen && (
                    <div>
                        <div className="pb-9">
                            <p className="text-darkPink font-medium text-xl text-center">
                                Current Time Ranges
                            </p>
                        </div>
                        <CurrentTaskCards />
                    </div>
                )}

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
