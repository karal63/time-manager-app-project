import { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { FaGithub } from "react-icons/fa";

import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section
      className={`fixed ${
        isOpen ? "left-0" : "-left-[273px]"
      } w-[300px] bg-white h-[90.7vh] flex transition-all`}
    >
      {/* content */}
      <div className="w-[90%] z-10 bg-white pt-20 pb-5 flex flex-col justify-between">
        <ul className="w-full">
          <li>
            <Link className="hover:bg-darkPinkTransp transition-all block py-3 px-5 text-xl mx-4 rounded-lg">
              Projektant
            </Link>
          </li>
          <li>
            <Link className="hover:bg-darkPinkTransp transition-all block py-3 px-5 text-xl mx-4 rounded-lg">
              Twoje notatki
            </Link>
          </li>
        </ul>

        <div className="flex flex-col items-center">
          <ul className="mb-3 flex gap-3 text-3xl">
            <li>
              <FaGithub />
            </li>
            <li>
              <FaGithub />
            </li>
            <li>
              <FaGithub />
            </li>
          </ul>
          <span className="text-gray-500">Copyright Productive</span>
        </div>
      </div>

      {/* side button */}
      <div className="w-[10%] flex items-center z-10">
        <button
          className="py-10 rounded-tr-2xl rounded-br-2xl bg-darkPink"
          onClick={() => {
            setIsOpen(!isOpen); // Toggle the state
          }}
          onMouseOver={() => setIsOpen(true)}
        >
          <MdKeyboardArrowRight className="text-3xl" />
        </button>
      </div>

      {/* modal */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } h-full w-full fixed top-0 left-0 bg-modal`}
      ></div>
    </section>
  );
};

export default Sidebar;
