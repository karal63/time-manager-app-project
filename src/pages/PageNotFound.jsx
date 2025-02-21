import { IoIosArrowBack } from "react-icons/io";

import { Link } from "react-router-dom";
import { useTimeRangeStore } from "../store";

const PageNotFound = () => {
    const { isDarkMode } = useTimeRangeStore();

    return (
        <div
            className="flex flex-col items-center h-[calc(100vh-68px)] bg-contain pt-40"
            style={{
                backgroundImage: isDarkMode
                    ? 'url("src/assets/darkGrid_copy2.png")'
                    : 'url("src/assets/grid.png")',
            }}
        >
            <h1 className="text-4xl font-bold text-mainColor">404 Error</h1>
            <h1 className="text-3xl mb-10 text-darkPink">Page not found.</h1>

            <Link
                to="/"
                className="flex gap-2 items-center border-[1px] text-lg px-8 py-2 rounded-xl bg-darkPinkTransp hover:bg-darkPink transition-all"
            >
                <IoIosArrowBack className="text-xl" />
                Back to the home page
            </Link>
        </div>
    );
};

export default PageNotFound;
