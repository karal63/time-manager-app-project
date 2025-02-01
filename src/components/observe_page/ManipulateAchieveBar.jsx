import { BsTrash3 } from "react-icons/bs";
import { GoPencil } from "react-icons/go";
import { useTimeRangeStore } from "../../store";

const ManipulateAchieveBar = () => {
    const { setWarningWindow, selectedAchievements } = useTimeRangeStore();

    const deleteRecords = () => {
        setWarningWindow(true);
    };

    return (
        <section className="mt-10 flex-center">
            <div className="border-[1px] rounded-full py-2 px-4 flex gap-3">
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
                <button disabled={!selectedAchievements.length}>
                    <GoPencil
                        className={`text-xl ${
                            !selectedAchievements.length && "text-gray-300"
                        }`}
                    />
                </button>
            </div>
        </section>
    );
};

export default ManipulateAchieveBar;
