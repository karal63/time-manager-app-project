import { GoPlus } from "react-icons/go";
import AddTimeRangePanel from "../components/AddTimeRangePanel.jsx";

import { useEffect, useRef } from "react";
import { useTimeRangeStore } from "../store.js";
import ZoomZone from "../components/ZoomZone.jsx";

const Planner = () => {
    const {
        setPlannerZoneRef,
        timeRangePanel,
        setTimeRangePanel,
        updateTimeRangePanel,
    } = useTimeRangeStore();

    const plannerZoneRef = useRef(null);

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

    return (
        <section
            ref={plannerZoneRef}
            className="h-[calc(100vh-68px)] bg-hero-pattern bg-contain relative flex-center flex-col "
        >
            {/* absolute elements */}
            <div
                className={`absolute flex items-start gap-5 transition-all ${
                    timeRangePanel.isOpen ? "right-0" : "-right-[350px]"
                } `}
            >
                {/* button that shows add time range component */}
                <button
                    className={`relative top-5 bg-gradient-to-tr from-pink-600 to-yellow-300 rounded-full p-[.2rem] transition-all z-30 ${
                        timeRangePanel.isOpen ? "rotate-[45deg] left-12" : ""
                    }`} // changed to 20 to be on top of the scroll zone
                    onClick={() => openTimeRangePanel()}
                >
                    <div className="h-full w-full rounded-full bg-white">
                        <GoPlus className="text-5xl" />
                    </div>
                </button>

                {/* AddTimeRangePanel */}
                <AddTimeRangePanel />
            </div>

            <ZoomZone />
        </section>
    );
};

export default Planner;
