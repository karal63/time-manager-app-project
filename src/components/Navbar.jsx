import { Link, useLocation } from "react-router-dom";
import SwitchMode from "./SwitchMode";

import { MdNightsStay } from "react-icons/md";
import { LuSun } from "react-icons/lu";
import { IoMenu } from "react-icons/io5";
import { GoComment } from "react-icons/go";

import { useTimeRangeStore } from "../store";

const Navbar = () => {
    const url = useLocation();
    const {
        isDarkMode,
        setIsDarkMode,
        isSidebarOpen,
        setIsSidebarOpen,
        isCommentPanelOpen,
        setIsCommentPanelOpen,
    } = useTimeRangeStore();

    const toggleMode = () => {
        document.body.classList.toggle("darkMode");
        setIsDarkMode(!isDarkMode);
    };

    return (
        <section className="border-b-[1px] border-mainLineColor relative z-30 h-[68px] max-h-[68px] flex items-center bg-mainBackground">
            <div className="px-10 flex items-center justify-between max-sm:justify-center w-full relative">
                {/* Device only sidebar button */}
                <button
                    className="hidden max-sm:flex justify-center items-center absolute left-3 w-10 h-10 text-2xl text-darkPink"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    <IoMenu />
                </button>

                {/* nav left side */}
                <Link to="/planner" className="text-xl">
                    <div className="flex gap-10">
                        <div className="relative py-1 font-medium">
                            <span className="z-10 relative text-mainColor">
                                Product
                            </span>
                            <span className="bg-darkPink py-1 px-2 ml-1 relative rounded-lg text-white">
                                IVE
                            </span>

                            {/* bubbles style */}
                            <div>
                                <span className="bubble absolute right-10 top-1 -z-10 w-4 h-4 bg-pink-400 bg-opacity-70 rounded-full"></span>
                                <span className="bubble absolute right-10 top-6 -z-10 w-3 h-3 bg-pink-400 bg-opacity-50 rounded-full"></span>
                                <span className="bubble absolute right-14 top-6 -z-10 w-2 h-2 bg-pink-400 bg-opacity-60 rounded-full"></span>
                                <span className="bubble absolute right-16 top-2 -z-10 w-[7px] h-[7px] bg-pink-400 bg-opacity-40 rounded-full"></span>
                                <span className="bubble absolute right-14 top-4 -z-10 w-[7px] h-[7px] bg-pink-400 bg-opacity-40 rounded-full"></span>
                                <span className="bubble absolute right-[70px] top-4 -z-10 w-[5px] h-[5px] bg-pink-400 bg-opacity-30 rounded-full"></span>
                                <span className="bubble absolute right-[70px] top-7 -z-10 w-[5px] h-[5px] bg-pink-400 bg-opacity-30 rounded-full"></span>
                            </div>
                        </div>

                        {url.pathname === "/planner" && <SwitchMode />}
                    </div>
                </Link>

                <div className="flex items-center gap-2 max-sm:absolute max-sm:right-3 max-sm:top-0">
                    {url.pathname === "/planner" && (
                        <button
                            className={`text-2xl w-10 h-10 rounded-full hover:bg-mainHoverColor flex-center mr-2 ${
                                isCommentPanelOpen
                                    ? "text-darkPink"
                                    : "text-mainColor"
                            }`}
                            onClick={() =>
                                setIsCommentPanelOpen(!isCommentPanelOpen)
                            }
                        >
                            <GoComment />
                        </button>
                    )}

                    <button
                        onClick={toggleMode}
                        className="text-2xl w-10 h-10 rounded-full hover:bg-mainHoverColor flex-center text-darkPink"
                    >
                        {isDarkMode ? <LuSun /> : <MdNightsStay />}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Navbar;
