import { useState } from "react";
import CurrentTask from "../components/observe_page/CurrentTask";
import TimeAxis from "../components/observe_page/TimeAxis";

const ObservePlan = () => {
    const [isTimeAxisOpen, setIsTimeAxisOpen] = useState(true);

    return (
        <section className="h-[calc(100vh-68px)] bg-contain relative pl-20 flex bg-white">
            <div className="w-full flex">
                <TimeAxis isTimeAxisOpen={isTimeAxisOpen} />
                <CurrentTask
                    isTimeAxisOpen={isTimeAxisOpen}
                    setIsTimeAxisOpen={setIsTimeAxisOpen}
                />
            </div>
        </section>
    );
};

export default ObservePlan;
