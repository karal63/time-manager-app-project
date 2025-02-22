import { GoPlus } from "react-icons/go";
import AddTimeRangePanel from "../components/AddTimeRangePanel.jsx";

import { useEffect, useRef } from "react";
import { useTimeRangeStore } from "../store.js";
import ZoomZone from "../components/ZoomZone.jsx";

import darkGridImage from "../assets/darkGrid_copy2.png";
import gridImage from "../assets/grid.png";

const Planner = () => {
    const {
        setPlannerZoneRef,
        timeRangePanel,
        setTimeRangePanel,
        updateTimeRangePanel,
        currentMode,
        isDarkMode,
        setAddTimeRangePanelRef,
    } = useTimeRangeStore();

    const plannerZoneRef = useRef(null);
    const addTimeRangePanelRef = useRef(null);

    useEffect(() => {
        if (plannerZoneRef.current) {
            setPlannerZoneRef(plannerZoneRef.current);
        }
    }, [plannerZoneRef.current]);

    const openTimeRangePanel = () => {
        setTimeRangePanel(!timeRangePanel.isOpen, "Create");
        updateTimeRangePanel({
            id: "",
            name: "",
            desc: "",
            timeStart: "",
            timeEnd: "",
        });
    };

    useEffect(() => {
        if (addTimeRangePanelRef.current) {
            setAddTimeRangePanelRef(addTimeRangePanelRef);
        }
    }, []);

    return (
        <section
            ref={plannerZoneRef}
            className="h-[calc(100vh-68px)] bg-contain relative flex-center flex-col pl-9"
            style={{
                backgroundImage: `url(${
                    isDarkMode ? darkGridImage : gridImage
                })`,
            }}
        >
            {/* absolute elements */}
            {currentMode === "Editing" && (
                <div
                    ref={addTimeRangePanelRef}
                    className={`absolute flex items-start  transition-all z-20 ${
                        timeRangePanel.isOpen ? "right-0" : "-right-[350px]"
                    } `}
                >
                    {/* button that shows add time range component */}
                    <div className="absolute top-5 -left-[70px] w-[50px] h-[50px] flex-center">
                        <button
                            className={`bg-gradient-to-tr bg-darkPink rounded-full shadow-main p-[.1rem] transition-all z-30 ${
                                timeRangePanel.isOpen ? "rotate-[45deg]" : ""
                            }`} // changed to 20 to be on top of the scroll zone
                            onClick={() => openTimeRangePanel()}
                        >
                            <div className="h-full w-full rounded-full bg-mainBackground text-mainColor">
                                <GoPlus className="text-5xl" />
                            </div>
                        </button>
                    </div>

                    {/* AddTimeRangePanel */}
                    <AddTimeRangePanel />
                </div>
            )}

            <ZoomZone />
        </section>
    );
};

export default Planner;
