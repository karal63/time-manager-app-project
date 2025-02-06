import { BsTrash3 } from "react-icons/bs";
import { GoPencil } from "react-icons/go";
import { useTimeRangeStore } from "../../store";

const ManipulateAchieveBar = () => {
    const {
        setWarningWindow,
        selectedAchievements,
        enableEditing,
        isEditingAchievements,
        setIsSavedAchievements,
        disableEditing,
    } = useTimeRangeStore();

    const deleteRecords = () => {
        setWarningWindow(true);
    };

    const saveAchievements = () => {
        setIsSavedAchievements(true);
        disableEditing();
    };

    return (
        <section className="mt-10 flex-center">
            <div className="border-[1px] rounded-full h-[40px] px-4 flex gap-3">
                <button
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
                    disabled={!selectedAchievements.length}
                    onClick={enableEditing}
                >
                    <GoPencil
                        className={`text-xl ${
                            !selectedAchievements.length && "text-gray-300"
                        }`}
                    />
                </button>

                {isEditingAchievements && (
                    <button className="ml-5" onClick={saveAchievements}>
                        Save
                    </button>
                )}
            </div>
        </section>
    );
};

export default ManipulateAchieveBar;
