import { useEffect, useState } from "react";
import { useTimeRangeStore } from "../../store";

const SingleAchieveLine = ({ achieve }) => {
    const [isSelected, setIsSelected] = useState(false);

    const { selectAchievement } = useTimeRangeStore();

    const selectLine = (e) => {
        setIsSelected(!isSelected);
        selectAchievement(e.target.checked, achieve);
    };

    // 1. store selected objects in an array in the store when changing the value above
    // 2. create functions that will respond for clicking butttons on manipulating bar
    // 3. for example you clicked delete, the function will find selected items and filter them from the generall achievements array
    // 4. override your prev achievements

    // Create warning before deleting

    return (
        <tr
            className={`border-b border-gray-200 ${
                isSelected ? "bg-blue-50" : "bg-white"
            }`}
        >
            <td className="h-full pl-2">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name=""
                        id=""
                        checked={isSelected}
                        onChange={selectLine}
                    />
                </div>
            </td>
            <td className="py-2 px-4">{achieve.name}</td>
            <td className="py-2 px-4">{achieve.category}</td>
            <td className="py-2 px-4">{achieve.time}</td>
        </tr>
    );
};

export default SingleAchieveLine;
