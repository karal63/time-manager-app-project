import { IoIosArrowBack } from "react-icons/io";

import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <div className="flex flex-col justify-center items-center bg-hero-pattern h-[calc(100vh-68px)] bg-contain ">
            <h1 className="text-3xl font-bold mb-5 text-darkPink">
                Page not found
            </h1>

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
