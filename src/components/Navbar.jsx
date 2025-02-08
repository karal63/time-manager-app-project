import { Link, useLocation } from "react-router-dom";
import SwitchMode from "./SwitchMode";

const Navbar = () => {
    const url = useLocation();

    return (
        <section className="border-b-[1px] relative z-30 h-[68px] max-h-[68px] flex items-center bg-white">
            <div className="px-10 flex items-center justify-between max-sm:justify-center w-full">
                {/* nav left side */}
                <div>
                    <Link to="/planner" className="text-xl font-medium">
                        <span className="z-10 relative">Product</span>
                        <span className="bg-darkPink py-1 px-2 ml-1 relative rounded-lg text-white">
                            IVE
                        </span>
                    </Link>
                </div>

                {/* nav right side */}
                {url.pathname === "/planner" && <SwitchMode />}
            </div>
        </section>
    );
};

export default Navbar;
