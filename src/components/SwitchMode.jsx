import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SwitchMode = () => {
    const [action, setAction] = useState(
        location.pathname === "/planner" ? "create" : "observe"
    );

    useEffect(() => {
        setAction(location.pathname === "/planner" ? "create" : "observe");
    }, [location.pathname]);

    return (
        <div className="absolute top-3 right-5 flex bg-gray-300 rounded-3xl">
            <Link
                to="/planner"
                className={`z-20 pl-4 pr-8 py-2 text-lg relative rounded-3xl ${
                    action === "create" ? "text-white" : ""
                }`}
                onClick={() => setAction("create")}
            >
                Create
            </Link>
            <Link
                to="/planner/observe"
                className={`z-10 py-2 pr-3 text-lg relative rounded-3xl rounded-tl-0 rounded-bl-0 ${
                    action === "observe" ? "text-white" : ""
                }`}
                onClick={() => setAction("observe")}
            >
                Observe
            </Link>

            <div
                className={`absolute h-full w-1/2 bg-darkPink rounded-3xl transition-all duration-300 ease-in-out ${
                    action === "create" ? "translate-x-0" : "translate-x-full"
                }`}
            ></div>
        </div>
    );
};

export default SwitchMode;
