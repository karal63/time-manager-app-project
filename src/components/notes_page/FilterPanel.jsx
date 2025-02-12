import { useState } from "react";
import { useNotesStore } from "../../notesStore";

import { CiSearch } from "react-icons/ci";

const FilterPanel = () => {
    const { setSortMethod, isFilterPanelOpen, setSearchQuery } =
        useNotesStore();

    const [searchInput, setSearchInput] = useState("");

    const updateQuery = (e) => {
        setSearchInput(e.target.value);
        setSearchQuery(e.target.value);
    };

    if (!isFilterPanelOpen) {
        return;
    }

    return (
        <div className="px-10 max-sm:px-4 py-5">
            <form className="flex max-sm:flex-col max-sm:gap-3">
                <div>
                    <label className="mr-2">Sort by: </label>
                    <select
                        name=""
                        id=""
                        className="border-[1px] px-2 py-1 rounded-md cursor-pointer outline-none mr-4"
                        onChange={(e) => setSortMethod(e.target.value)}
                    >
                        <option value="Date (A to Z)">Date (A to Z)</option>
                        <option value="Date (Z to A)">Date (Z to A)</option>
                        <option value="Importance">Improtance</option>
                        <option value="Currency">Currency</option>
                        <option value="Newest">Newest</option>
                        <option value="Oldest">Oldest</option>
                        <option value="Without date">Without date</option>
                    </select>
                </div>

                <div className="relative">
                    <input
                        type="text"
                        className="py-1 border-[1px] rounded-md pl-2 pr-10 outline-none w-full"
                        onChange={updateQuery}
                        value={searchInput}
                    />
                    <CiSearch className="absolute right-3 top-1/2 translate-y-[-50%] text-xl" />
                </div>
            </form>
        </div>
    );
};

export default FilterPanel;
