import { useEffect, useState } from "react";
import CustomizeCards from "./CustomizeCards";
import { useTimeRangeStore } from "../../store";
import { Link } from "react-router-dom";

const CurrentTaskCards = () => {
    const {
        taskMarks,
        getFromLocalStorage,
        setPrevTaskMarks,
        currentTimeRanges,
        setTimeRangePanel,
    } = useTimeRangeStore();
    const [isCardPanelOpen, setIsCardPanelOpen] = useState(false);

    const [cardSettings, setCardSetting] = useState({
        name: taskMarks.find((el) => el.name === "Name").selected,
        desc: taskMarks.find((el) => el.name === "Description").selected,
        duration: taskMarks.find((el) => el.name === "Duration").selected,
    });

    useEffect(() => {
        getFromLocalStorage("taskMarks", "taskMarks");
    }, []);

    useEffect(() => {
        setCardSetting({
            name: taskMarks.find((el) => el.name === "Name").selected,
            desc: taskMarks.find((el) => el.name === "Description").selected,
            duration: taskMarks.find((el) => el.name === "Duration").selected,
        });
    }, [taskMarks]);

    const getDuration = (timeRange) => {
        const { timeStart, timeEnd } = timeRange;

        const [hoursStart, minutesStart] = timeStart.split(":").map(Number);
        const [hoursEnd, minutesEnd] = timeEnd.split(":").map(Number);

        let durationHours = hoursEnd - hoursStart;
        let durationMinutes = minutesEnd - minutesStart;

        if (durationMinutes < 0) {
            durationHours -= 1;
            durationMinutes += 60;
        }

        return `${durationHours}h ${durationMinutes}m`;
    };

    return (
        <>
            {isCardPanelOpen ? (
                <CustomizeCards
                    isCardPanelOpen={isCardPanelOpen}
                    setIsCardPanelOpen={setIsCardPanelOpen}
                    setCardSetting={setCardSetting}
                />
            ) : (
                <div className="flex flex-col gap-3 w-[250px] min-w-[250px] relative">
                    {cardSettings.name ||
                    cardSettings.desc ||
                    cardSettings.duration
                        ? currentTimeRanges.map((timeRange) => (
                              <div
                                  key={timeRange.id}
                                  className="bg-darkPink px-3 pt-6 pb-4 rounded-md shadow-main relative"
                              >
                                  <h1 className="text-white font-semibold text-xl pb-1">
                                      {cardSettings.name ? timeRange.name : ""}
                                  </h1>
                                  <div className="h-[1px] w-full bg-white mb-2"></div>
                                  <p className="text-gray-300 w-[70%]">
                                      {cardSettings.desc && timeRange.desc}
                                  </p>

                                  {cardSettings.duration && (
                                      <span className="absolute bottom-0 right-0 text-sm bg-white px-2 py-1 rounded-br-md rounded-tl-md">
                                          {getDuration(timeRange)}
                                      </span>
                                  )}
                              </div>
                          ))
                        : ""}

                    {currentTimeRanges.length === 0 ? (
                        <div className="text-center text-gray-400">
                            Waiting for tasks...
                        </div>
                    ) : (
                        ""
                    )}

                    {currentTimeRanges.length === 0 ? (
                        <Link
                            to={"/planner"}
                            className="bg-darkPink hover:bg-pink-500 py-2 rounded-lg text-white text-center transition-all"
                            onClick={() => {
                                setTimeRangePanel(true, "Create");
                            }}
                        >
                            Create Time Range
                        </Link>
                    ) : (
                        <button
                            className="border-2 border-dashed border-gray-300 py-2 rounded-lg text-gray-300"
                            onClick={() => {
                                setIsCardPanelOpen(true);
                                setPrevTaskMarks();
                            }}
                        >
                            Customize
                        </button>
                    )}
                </div>
            )}
        </>
    );
};

export default CurrentTaskCards;
