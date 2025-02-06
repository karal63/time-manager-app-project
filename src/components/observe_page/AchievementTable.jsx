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
        console.log(selectedAchievements);
    }, [selectedAchievements]);

    return (
        <section className="mt-4">
            <WarningWindow />

            <table className="w-full table-auto border-collapse styled-table">
                <thead>
                    <tr className="text-sm font-semibold border-b border-gray-200">
                        {/* Extra space */}
                        <th></th>
                        {headRow.map((el) => (
                            <th
                                key={el.id}
                                className="py-2 px-4 text-left"
                                style={{
                                    width: el.width,
                                }}
                            >
                                {el.value}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {achievements.map((achieve) => (
                        <SingleAchieveLine key={achieve.id} achieve={achieve} />
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default AchievementTable;
