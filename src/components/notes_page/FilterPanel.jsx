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
                    <label className="mr-2 text-mainColor">Sort by: </label>
                    <select
                        name=""
                        id=""
                        className="border-[1px] border-mainLineColor text-mainColor px-2 py-1 rounded-md cursor-pointer outline-none mr-4 bg-transparent"
                        onChange={(e) => setSortMethod(e.target.value)}
                    >
                        <option
                            value="Date (A to Z)"
                            className="bg-mainBackground"
                        >
                            Date (A to Z)
                        </option>
                        <option
                            value="Date (Z to A)"
                            className="bg-mainBackground"
                        >
                            Date (Z to A)
                        </option>
                        <option
                            value="Importance"
                            className="bg-mainBackground"
                        >
                            Improtance
                        </option>
                        <option value="Currency" className="bg-mainBackground">
                            Currency
                        </option>
                        <option value="Newest" className="bg-mainBackground">
                            Newest
                        </option>
                        <option value="Oldest" className="bg-mainBackground">
                            Oldest
                        </option>
                        <option
                            value="Without date"
                            className="bg-mainBackground"
                        >
                            Without date
                        </option>
                    </select>
                </div>

                <div className="relative">
                    <input
                        type="text"
                        className="py-1 border-[1px] border-mainLineColor text-mainColor rounded-md pl-2 pr-10 outline-none w-full bg-transparent"
                        onChange={updateQuery}
                        value={searchInput}
                        placeholder="Search..."
                    />
                    <CiSearch className="absolute right-3 top-1/2 translate-y-[-50%] text-xl text-mainColor" />
                </div>
            </form>
        </div>
    );
};

export default FilterPanel;
