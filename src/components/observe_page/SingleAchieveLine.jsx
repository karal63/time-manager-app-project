import { useEffect, useState } from "react";
import { useTimeRangeStore } from "../../store";

const SingleAchieveLine = ({ achieve }) => {
    const [isSelected, setIsSelected] = useState(false);
    const [editedValues, setEditedValues] = useState({
        name: achieve.name,
        category: achieve.category,
        time: achieve.time,
    });

    const {
        selectAchievement,
        isEditingAchievements,
        isSavedAchievements,
        editAchievement,
        setIsSavedAchievements,
        setDraggedAchievement,
        isTimeAxisOpen,
    } = useTimeRangeStore();

    const selectLine = (e) => {
        setIsSelected(!isSelected);
        selectAchievement(e.target.checked, achieve);
    };

    const dragLine = () => {
        setDraggedAchievement(achieve);
    };

    // 1. store selected objects in an array in the store when changing the value above
    // 2. create functions that will respond for clicking butttons on manipulating bar
    // 3. for example you clicked delete, the function will find selected items and filter them from the generall achievements array
    // 4. override your prev achievements

    // Create warning before deleting

    useEffect(() => {
        if (isSavedAchievements) {
            editAchievement(achieve.id, editedValues);
            setIsSavedAchievements(false);
        }
    }, [isSavedAchievements]);

    return (
        <tr
            draggable={!isEditingAchievements}
            onDragStart={dragLine}
            className={`border-b-[1px] border-gray-200 cursor-alias ${
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

            <td className="py-2 px-4">
                {isEditingAchievements && isSelected ? (
                    <input
                        type="text"
                        value={editedValues.name}
                        onChange={(e) =>
                            setEditedValues({
                                ...editedValues,
                                name: e.target.value,
                            })
                        }
                        className="border-[1px] rounded-md px-2 w-full"
                    />
                ) : (
                    <p className="border-[1px] border-transparent max-w-max overflow-hidden text-left">
                        {achieve.name.length > 50 ? (
                            isTimeAxisOpen ? (
                                <p>{achieve.name.slice(0, 50)}...</p>
                            ) : (
                                <p>{achieve.name.slice(0, 90)}</p>
                            )
                        ) : (
                            achieve.name
                        )}
                    </p>
                )}
            </td>

            <td className="py-2 px-4">
                {isEditingAchievements && isSelected ? (
                    <input
                        type="text"
                        value={editedValues.category}
                        onChange={(e) =>
                            setEditedValues({
                                ...editedValues,
                                category: e.target.value,
                            })
                        }
                        className="border-[1px] rounded-md px-2 w-full"
                    />
                ) : (
                    achieve.category
                )}
            </td>

            <td className="py-2 px-4">{achieve.time}</td>
        </tr>
    );
};

export default SingleAchieveLine;
