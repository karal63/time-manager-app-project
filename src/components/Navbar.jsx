import { Link } from "react-router-dom";

const Navbar = () => {
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
                <div></div>
            </div>
        </section>
    );
};

export default Navbar;
