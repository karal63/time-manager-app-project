import { useRef, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { FaGithub } from "react-icons/fa";

import { Link } from "react-router-dom";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef();
    const buttonRef = useRef(null);

    let openTimeoutId = null;

    const handleDelayOpen = (e, type) => {
        switch (type) {
            case "enter":
                if (openTimeoutId) {
                    clearTimeout(openTimeoutId);
                }
                openTimeoutId = setTimeout(() => {
                    setIsOpen(true);
                }, 300);
                break;
            case "leave":
                if (openTimeoutId) {
                    clearTimeout(openTimeoutId);
                }
                if (
                    sidebarRef.current &&
                    buttonRef.current &&
                    !sidebarRef.current.contains(e.target) &&
                    !buttonRef.current.contains(e.target)
                ) {
                    setIsOpen(false);
                }
                break;
        }
    };

    const handleDelayClose = (e, type) => {
        switch (type) {
            case "enter":
                if (openTimeoutId) {
                    clearTimeout(openTimeoutId);
                }
                break;
            case "leave":
                openTimeoutId = setTimeout(() => {
                    setIsOpen(false);
                }, 400);
                break;
        }
    };

    return (
        <>
            <section
                className={`fixed top-0 ${
                    isOpen ? "left-0" : "-left-[280px]"
                } w-[280px] bg-white h-full flex z-10 shadow-xl`}
                id="sidebar"
                ref={sidebarRef}
                onMouseEnter={(e) => handleDelayClose(e, "enter")}
                onMouseLeave={(e) => handleDelayClose(e, "leave")}
            >
                {/* content */}
                <div className="w-[100%] z-10 bg-white pt-32 pb-5 flex flex-col justify-between">
                    <ul className="w-full">
                        <li>
                            <Link
                                to="/planner"
                                className="hover:bg-darkPinkTransp transition-all block py-2 px-5 text-xl mx-4 rounded-xl"
                                onClick={() => setIsOpen(false)}
                            >
                                Projektant
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/notes"
                                className="hover:bg-darkPinkTransp transition-all block py-2 px-5 text-xl mx-4 rounded-xl"
                                onClick={() => setIsOpen(false)}
                            >
                                Twoje notatki
                            </Link>
                        </li>
                    </ul>

                    <div className="flex flex-col items-center">
                        <ul className="mb-5 flex gap-3 text-3xl">
                            <li>
                                <a
                                    href="https://github.com/karal63"
                                    target="_blank"
                                >
                                    <FaGithub />
                                </a>
                            </li>
                            <li>
                                <FaGithub />
                            </li>
                            <li>
                                <FaGithub />
                            </li>
                        </ul>

                        <span className="text-gray-500">
                            ©Productive | All rights reserved
                        </span>
                    </div>
                </div>

                {/* side button */}
                <div className="relative flex items-center z-10 bg-transparent">
                    <button
                        className="py-10 rounded-tr-2xl rounded-br-2xl bg-darkPink absolute top-[50%] translate-y-[-50%]"
                        onClick={() => {
                            setIsOpen(!isOpen);
                        }}
                        onMouseEnter={(e) => handleDelayOpen(e, "enter")}
                        onMouseLeave={(e) => handleDelayOpen(e, "leave")}
                        ref={buttonRef}
                    >
                        {isOpen ? (
                            <MdKeyboardArrowLeft className="text-3xl pointer-events-none" />
                        ) : (
                            <MdKeyboardArrowRight className="text-3xl pointer-events-none" />
                        )}
                    </button>
                </div>
            </section>
        </>
    );
};

export default Sidebar;
