import { useTimeRangeStore } from "../../store";
import gridImage from "../../assets/graph2.png";

const TimeAxis = ({ isTimeAxisOpen }) => {
    const { dayStructure } = useTimeRangeStore();

    // make bottom side scrollable, replace position fixed

    return (
        <div
            className={`${
                isTimeAxisOpen ? "w-[400px] min-w-[400px]" : "w-0"
            } h-full relative overflow-x-hidden overflow-y-auto`}
            style={{
                clipPath: "inset(0 0 0 0)",
            }}
        >
            <div className="sticky top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent z-20"></div>
            <div
                className="bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent z-20"
                style={{
                    position: "fixed",
                }}
            ></div>

            <div
                className="absolute w-full flex justify-end top-0 right-0 pr-4 bg-contain bg-"
                style={{
                    backgroundImage: `url(${gridImage})`,
                }}
            >
                <ul className="flex flex-col gap-10 my-10">
                    {dayStructure.map((mark) => (
                        <li key={mark.id} className="flex items-center">
                            <span className="text-lg">{mark.time}</span>
                            <div className="w-4 h-[2px] bg-black ml-2"></div>
                        </li>
                    ))}
                </ul>
                <div className="w-[2px] bg-[#1e1e1e] z-10"></div>
            </div>
        </div>
    );
};

export default TimeAxis;
