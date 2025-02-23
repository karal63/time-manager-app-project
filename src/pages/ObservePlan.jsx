import CurrentTask from "../components/observe_page/CurrentTask";
import TimeAxis from "../components/observe_page/TimeAxis";

const ObservePlan = () => {
    return (
        <section className="h-[calc(100vh-68px)] bg-contain relative sm:pl-16 flex bg-mainBackground">
            <div className="w-full flex">
                <TimeAxis />
                <CurrentTask />
            </div>
        </section>
    );
};

export default ObservePlan;
