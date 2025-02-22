import { useEffect } from "react";
import { headRow } from "../../constants";
import { useTimeRangeStore } from "../../store";
import SingleAchieveLine from "./SingleAchieveLine";
import WarningWindow from "./WarningWindow";

const AchievementTable = () => {
    const {
        achievements,
        initializeAchievements,
        selectedAchievements,
        disableEditing,
    } = useTimeRangeStore();

    useEffect(() => {
        initializeAchievements();
    }, []);

    useEffect(() => {
        if (selectedAchievements.length === 0) {
            disableEditing();
        }
    }, [selectedAchievements]);

    return (
        <section className="mt-2">
            <WarningWindow />

            {achievements.length > 0 ? (
                <div className="h-[calc(100vh-231px)] overflow-y-auto">
                    <table className="w-full table-auto border-collapse styled-table">
                        <thead className="sticky top-0 bg-mainBackground z-10">
                            <tr className="text-sm font-semibold">
                                <th></th>
                                {headRow.map((el) => (
                                    <th
                                        key={el.id}
                                        className="py-2 px-4 text-left after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-gray-300 text-mainColor"
                                        style={{
                                            width: el.width,
                                            maxWidth: el.width,
                                        }}
                                    >
                                        {el.value}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {achievements
                                .slice()
                                .reverse()
                                .map((achieve) => (
                                    <SingleAchieveLine
                                        key={achieve.id}
                                        achieve={achieve}
                                    />
                                ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="mt-5 text-center text-gray-400 text-xl">
                    No achievements...
                </p>
            )}
        </section>
    );
};

export default AchievementTable;
