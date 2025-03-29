import { PiNotePencil } from "react-icons/pi";
import { CiCalendar } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import { CiViewBoard } from "react-icons/ci";

import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useTimeRangeStore } from "../store";

const Sidebar = () => {
    const {
        initializeProjectName,
        projectName,
        setProjectName,
        isSidebarOpen,
        setIsSidebarOpen,
    } = useTimeRangeStore();
    const location = useLocation(); // Get current location

    const sidebarRef = useRef();

    const isMobileDevice = () => {
        return window.matchMedia("(max-width: 768px)").matches;
    };

    const closeSidebar = () => {
        if (isMobileDevice()) {
            setIsSidebarOpen(false);
        }
    };

    useEffect(() => {
        initializeProjectName();
    }, []);

    return (
        <section
            ref={sidebarRef}
            className={`${
                isSidebarOpen
                    ? "max-sm:w-full w-[280px] px-2"
                    : "w-16 max-sm:w-0 px-2 max-sm:p-0"
            } absolute left-0 top-[68px] h-[calc(100vh-68px)] shadow-lg bg-mainBackground transition-[width] border-r border-mainLineColor max-sm:border-none
             flex flex-col justify-between z-30 overflow-hidden`} // changed to 20 to be on top of the scroll zone
            onMouseLeave={() => {
                setIsSidebarOpen(false);
            }}
        >
            <div>
                {isSidebarOpen && location.pathname.startsWith("/planner") ? (
                    <div className="mt-6 mx-3">
                        <p className="text-xl text-mainColor">
                            Project&nbsp;name
                        </p>

                        <div className="mt-2">
                            <input
                                type="text"
                                className="px-4 py-2 rounded-md text-md w-full text-md focus:bg-mainHoverColor outline-none bg-transparent text-mainColor"
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="mt-6 h-[76px]"></div>
                )}

                <div className="mt-10">
                    <hr
                        className={`border-none h-[1px] bg-mainLineColor w-full`}
                    />
                    <p className={`mt-1 text-center text-gray-400`}>Apps</p>

                    <ul className="mt-2 max-w-max">
                        <li>
                            <Link
                                to="/planner"
                                className="flex items-center gap-3 "
                                onMouseOver={() => setIsSidebarOpen(true)}
                                onClick={closeSidebar}
                            >
                                <CiCalendar className="text-5xl text-mainColor min-w-12 min-h-12 p-2 hover:bg-mainHoverColor hover:rounded-xl" />

                                {isSidebarOpen ? (
                                    <span className="text-xl text-mainColor">
                                        Planner
                                    </span>
                                ) : (
                                    ""
                                )}
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/planner/observe"
                                className="flex items-center gap-3 "
                                onMouseOver={() => setIsSidebarOpen(true)}
                                onClick={closeSidebar}
                            >
                                <CiViewBoard className="text-5xl text-mainColor min-w-12 min-h-12 p-2 hover:bg-mainHoverColor hover:rounded-xl" />

                                {isSidebarOpen ? (
                                    <span className="text-xl text-mainColor">
                                        Dashboard
                                    </span>
                                ) : (
                                    ""
                                )}
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/notes"
                                className="flex items-center gap-3"
                                onMouseOver={() => setIsSidebarOpen(true)}
                                onClick={closeSidebar}
                            >
                                <PiNotePencil className="text-5xl text-mainColor min-w-12 min-h-12 p-2 hover:bg-mainHoverColor hover:rounded-xl" />
                                {isSidebarOpen ? (
                                    <span className="text-xl text-mainColor">
                                        Notes
                                    </span>
                                ) : (
                                    ""
                                )}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {isSidebarOpen && (
                <div className="mb-10 max-sm:mb-28 flex flex-col items-center">
                    <ul className="flex gap-3">
                        <li>
                            <a
                                href="https://github.com/karal63"
                                className="text-3xl grayscale-1 hover:grayscale-0 text-mainColor"
                                target="_blank"
                            >
                                <FaGithub />
                            </a>
                        </li>
                    </ul>

                    <p className="mt-3 text-gray-500">
                        ©Copyright&nbsp;productIVE
                    </p>
                </div>
            )}
        </section>
    );
};

export default Sidebar;
