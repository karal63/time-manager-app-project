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
            <div className="border-[1px] border-mainLineColor rounded-xl flex py-1 px-1 gap-1 max-h-[45.6px]">
                <button
                    className={`${
                        selectedAchievements.length
                            ? "hover:bg-mainHoverColor"
                            : ""
                    } rounded-xl px-2 py-2 transition-all text-mainColor`}
                    onClick={deleteRecords}
                    disabled={!selectedAchievements.length}
                >
                    <BsTrash3
                        className={`text-xl ${
                            !selectedAchievements.length && "text-disabledBtn"
                        }`}
                    />
                </button>
                <button
                    className={`${
                        selectedAchievements.length
                            ? "hover:bg-mainHoverColor"
                            : ""
                    } rounded-xl px-2 py-2 transition-all text-mainColor`}
                    disabled={!selectedAchievements.length}
                    onClick={enableEditing}
                >
                    <GoPencil
                        className={`text-xl ${
                            !selectedAchievements.length && "text-disabledBtn"
                        }`}
                    />
                </button>

                <button
                    className={`${
                        selectedAchievements.length
                            ? "hover:bg-mainHoverColor"
                            : ""
                    } rounded-xl px-2 py-2 transition-all text-mainColor`}
                    disabled={!selectedAchievements.length}
                    onClick={duplicateAchievement}
                >
                    <IoDuplicateOutline
                        className={`text-xl ${
                            !selectedAchievements.length && "text-disabledBtn"
                        }`}
                    />
                </button>

                {isEditingAchievements && (
                    <button
                        className="hover:bg-mainHoverColor rounded-xl px-2 py-2 text-sm text-mainColor"
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
