import { Link, useLocation } from "react-router-dom";
import SwitchMode from "./switchMode";

const Navbar = () => {
    const url = useLocation();
    console.log(url);
    console.log(url.pathname === "/planner");

    return (
        <section className="border-b-[1px] relative z-20">
            <div className="bg-white py-5 px-10">
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
                {url.pathname === "/planner" ||
                url.pathname === "/planner/observe" ? (
                    <SwitchMode />
                ) : (
                    ""
                )}
            </div>
        </section>
    );
};

export default Navbar;
