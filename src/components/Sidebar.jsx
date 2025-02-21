import { PiNotePencil } from "react-icons/pi";
import { CiCalendar } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import { CiViewBoard } from "react-icons/ci";

import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useTimeRangeStore } from "../store";

const Sidebar = () => {
    const { initializeProjectName, projectName, setProjectName } =
        useTimeRangeStore();
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation(); // Get current location

    const sidebarRef = useRef();

    useEffect(() => {
        initializeProjectName();
    }, []);

    return (
        <section
            ref={sidebarRef}
            className={`${
                isOpen ? "w-[280px]" : "w-16"
            } absolute left-0 top-[68px] h-[calc(100vh-68px)] shadow-lg bg-mainBackground transition-[width] pl-2 ${
                isOpen ? "pr-10" : ""
            } flex flex-col justify-between z-20 max-sm:hidden border-r border-mainLineColor`} // changed to 20 to be on top of the scroll zone
            onMouseLeave={() => {
                setIsOpen(false);
            }}
        >
            <div>
                {isOpen && location.pathname.startsWith("/planner") ? (
                    <div className="mt-6 ml-3">
                        <p className="text-xl text-mainColor">
                            Project&nbsp;name
                        </p>

                        <div className="mt-2">
                            <input
                                type="text"
                                className="px-4 py-2 border-[1px] border-transparent rounded-md text-md w-full text-md hover:bg-mainHoverColor outline-gray-300 bg-transparent text-mainColor"
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="mt-6 h-[77.6px]"></div>
                )}

                <div className="mt-10">
                    <hr
                        className={`border-none h-[1px] bg-mainLineColor ${
                            isOpen ? "-mr-8" : "-ml-2"
                        }`}
                    />
                    <p
                        className={`mt-1 text-center text-gray-400 ${
                            isOpen ? "" : "-ml-2"
                        }`}
                    >
                        Apps
                    </p>

                    <ul className="mt-2 max-w-max">
                        <li>
                            <Link
                                to="/planner"
                                className="flex items-center gap-3 "
                                onMouseOver={() => setIsOpen(true)}
                            >
                                <CiCalendar className="text-5xl text-mainColor min-w-12 min-h-12 p-2 hover:bg-mainHoverColor hover:rounded-xl" />

                                {isOpen ? (
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
                                onMouseOver={() => setIsOpen(true)}
                            >
                                <CiViewBoard className="text-5xl text-mainColor min-w-12 min-h-12 p-2 hover:bg-mainHoverColor hover:rounded-xl" />

                                {isOpen ? (
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
                                onMouseOver={() => setIsOpen(true)}
                            >
                                <PiNotePencil className="text-5xl text-mainColor min-w-12 min-h-12 p-2 hover:bg-mainHoverColor hover:rounded-xl" />
                                {isOpen ? (
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

            {isOpen && (
                <div className="mb-10 flex flex-col items-center">
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
