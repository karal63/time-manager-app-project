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
                <div className="bg-mainBackground py-5 px-6 rounded-lg border border-mainLineColor">
                    <h1 className="mx-4 text-lg font-semibold text-center text-mainColor">
                        Are you sure you want to delete selected achievements?
                    </h1>
                    <h1 className="mx-4 text-sm text-center text-gray-500 text-mainColor">
                        This action cannot be undone. Once deleted, your
                        achievements cannot be restored.
                    </h1>

                    <div className="mt-7 w-full max-h-[300px] overflow-y-auto border border-mainLineColor rounded-md">
                        <table className="w-full table-auto border-collapse styled-table">
                            <tbody>
                                {selectedAchievements.map((el, i) => (
                                    <tr
                                        key={el.id}
                                        className={`${
                                            i % 2 === 1
                                                ? "bg-mainHoverColor"
                                                : "bg-mainBackground"
                                        } `}
                                    >
                                        <td className="text-sm px-4 py-1 text-mainColor">
                                            {el.name.length > 40 ? (
                                                <p>
                                                    {el.name.slice(0, 50)}
                                                    ...
                                                </p>
                                            ) : (
                                                el.name
                                            )}
                                        </td>
                                        <td className="text-sm px-4 py-1 text-mainColor">
                                            {el.category}
                                        </td>
                                        <td className="text-sm px-4 py-1 text-mainColor">
                                            {el.time}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-between items-center mt-8">
                        <button
                            className="text-sm text-mainColor"
                            onClick={() => setWarningWindow(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className="px-2 py-1 rounded-lg transition-all border-[1px] border-mainLineColor text-mainColor hover:border-darkPink hover:text-darkPink"
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
