import ReactDOM from "react-dom";
import { useTimeRangeStore } from "../../store";
import { useEffect, useRef } from "react";

const WarningWindow = () => {
    const {
        warningWindow,
        setWarningWindow,
        selectedAchievements,
        deleteSelectedAchievements,
    } = useTimeRangeStore();
    const modalRef = useRef(null);

    const deleteRecords = () => {
        deleteSelectedAchievements();
        setWarningWindow(false);
    };

    useEffect(() => {
        const handleClick = (e) => {
            if (e.target === modalRef.current) {
                setWarningWindow(false);
            }
        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        warningWindow.isOpen &&
        ReactDOM.createPortal(
            <div
                ref={modalRef}
                className="absolute top-0 z-30 w-full h-full bg-modal flex-center"
            >
                <div className="bg-white py-5 px-6 rounded-lg">
                    <h1 className="mx-4 text-lg font-semibold ">
                        Are you sure you want to delete selected achievements?
                    </h1>
                    <h1 className="mx-4 text-sm text-center text-gray-500">
                        You will not be able to restore your achievements.
                    </h1>

                    <table className="mt-7 w-full table-auto border-collapse styled-table">
                        <thead>
                            {selectedAchievements.map((el) => (
                                <tr
                                    key={el.id}
                                    className={`${
                                        el.id % 2 === 1
                                            ? "bg-gray-100"
                                            : "bg-white"
                                    } `}
                                >
                                    <td className="text-sm px-4 py-1">
                                        {el.name}
                                    </td>
                                    <td className="text-sm px-4 py-1">
                                        {el.category}
                                    </td>
                                    <td className="text-sm px-4 py-1">
                                        {el.time}
                                    </td>
                                </tr>
                            ))}
                        </thead>
                        <tbody></tbody>
                    </table>

                    <div className="flex justify-between items-center mt-8">
                        <button
                            className="text-sm"
                            onClick={() => setWarningWindow(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-darkPink text-white px-2 py-1 rounded-lg"
                            onClick={deleteRecords}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>,
            document.body
        )
    );
};

export default WarningWindow;
