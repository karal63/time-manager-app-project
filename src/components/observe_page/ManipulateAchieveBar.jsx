import { BsTrash3 } from "react-icons/bs";
import { GoPencil } from "react-icons/go";
import { IoDuplicateOutline } from "react-icons/io5";
import { useTimeRangeStore } from "../../store";

const ManipulateAchieveBar = () => {
    const {
        setWarningWindow,
        selectedAchievements,
        enableEditing,
        isEditingAchievements,
        setIsSavedAchievements,
        disableEditing,
        duplicateAchievement,
    } = useTimeRangeStore();

    const deleteRecords = () => {
        setWarningWindow(true);
    };

    const saveAchievements = () => {
        setIsSavedAchievements(true);
        disableEditing();
    };

    return (
        <section className="mt-4 flex-center">
            <div className="border-[1px] rounded-xl flex py-1 px-1 gap-1 max-h-[45.6px]">
                <button
                    className={`${
                        selectedAchievements.length ? "hover:bg-gray-100" : ""
                    } rounded-xl px-2 py-2 transition-all`}
                    onClick={deleteRecords}
                    disabled={!selectedAchievements.length}
                >
                    <BsTrash3
                        className={`text-xl ${
                            !selectedAchievements.length && "text-gray-300"
                        }`}
                    />
                </button>
                <button
                    className={`${
                        selectedAchievements.length ? "hover:bg-gray-100" : ""
                    } rounded-xl px-2 py-2 transition-all`}
                    disabled={!selectedAchievements.length}
                    onClick={enableEditing}
                >
                    <GoPencil
                        className={`text-xl ${
                            !selectedAchievements.length && "text-gray-300"
                        }`}
                    />
                </button>

                <button
                    className={`${
                        selectedAchievements.length ? "hover:bg-gray-100" : ""
                    } rounded-xl px-2 py-2 transition-all`}
                    disabled={!selectedAchievements.length}
                    onClick={duplicateAchievement}
                >
                    <IoDuplicateOutline
                        className={`text-xl ${
                            !selectedAchievements.length && "text-gray-300"
                        }`}
                    />
                </button>

                {isEditingAchievements && (
                    <button
                        className="hover:bg-gray-100 rounded-xl px-2 py-2 text-sm"
                        onClick={saveAchievements}
                    >
                        Save
                    </button>
                )}
            </div>
        </section>
    );
};

export default ManipulateAchieveBar;
