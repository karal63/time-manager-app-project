import { useEffect, useRef, useState } from "react";
import { useTimeRangeStore } from "../store";

const AddTimeRangePanel = () => {
    // Getting states from useTimeRangeStore
    const { addTimeRange, timeRangePanel, setTimeRangePanel, editTimeRange } =
        useTimeRangeStore();

    // example of time range
    const [timeRange, setTimeRange] = useState({
        id: "",
        name: "",
        desc: "",
        timeStart: "",
        timeEnd: "",
    });

    useEffect(() => {
        setTimeRange({
            id: timeRangePanel.id,
            name: timeRangePanel.name,
            desc: timeRangePanel.description,
            timeStart: timeRangePanel.timeStart,
            timeEnd: timeRangePanel.timeEnd,
        });
    }, [timeRangePanel]);

    // Destructuring time range
    const { name, timeStart, timeEnd, desc } = timeRange;

    // Setting panel ref in storage

    const [errorMessage, setErrorMessage] = useState({
        type: "",
        message: "",
    });

    // Textarea ref
    let textareaRef = useRef();

    // Making textarea dynamic
    const handleInput = (e) => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }

        if (desc.length > 400) {
            setErrorMessage({
                message: "Description cannot exceed 500 characters.",
                type: "desc",
            });
        } else {
            setErrorMessage({
                errorMessage: "",
                type: "",
            });
        }

        setTimeRange({ ...timeRange, desc: e.target.value });
    };

    // Function that responses for what will happen when we submit
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validating inputs
        if (desc.length > 500) {
            return setErrorMessage({
                type: "desc",
                message: "Description cannot exceed 500 characters.",
            });
        } else {
            setErrorMessage({
                type: "",
                message: "",
            });
        }

        setTimeRangePanel(false, "");

        // Time start and time end order validation

        const { timeStart, timeEnd } = timeRange;
        const [hoursStart, minutesStart] = timeStart.split(":").map(Number);
        const [hoursEnd, minutesEnd] = timeEnd.split(":").map(Number);

        let durationHours = hoursEnd - hoursStart;
        let durationMinutes = minutesEnd - minutesStart;

        let newTimeRange = { ...timeRange };

        if (durationHours < 0) {
            newTimeRange = {
                ...timeRange,
                timeStart: timeEnd,
                timeEnd: timeStart,
            };
        } else if (hoursStart === hoursEnd && durationMinutes < 0) {
            newTimeRange = {
                ...timeRange,
                timeStart: timeEnd,
                timeEnd: timeStart,
            };
        }

        // Adding range to the array of ranges
        switch (timeRangePanel.type) {
            case "Create":
                addTimeRange(newTimeRange);
                break;
            case "Edit":
                editTimeRange(newTimeRange);
        }

        // Clears inputs
        setTimeRange({
            name: "",
            desc: "",
            timeStart: "",
            timeEnd: "",
            duration: "",
        });
    };

    return (
        <section
            className={`h-[calc(100vh-68px)] w-[350px] rounded-md shadow-main bg-mainBackground overflow-hidden px-5 pt-7 pb-10 flex flex-col 
                 transition-all duration-75 z-20`} // changed to 20 to be on top of the scroll zone
        >
            <h1 className="text-xl flex-center text-pink-400 font-medium text-nowrap mb-5">
                {timeRangePanel.type} Time Range
            </h1>

            <form
                className="mt-9 h-full flex flex-col justify-between"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col gap-2">
                    {/* Activity Name */}
                    <label>
                        <span className="block pl-1 text-md mb-1 font-thin text-nowrap text-mainColor">
                            What would you name your activity?
                        </span>

                        {/* name input */}
                        <input
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setTimeRange({
                                    ...timeRange,
                                    name: e.target.value,
                                })
                            }
                            className="border-[1px] border-mainLineColor w-full py-2 px-2 rounded-lg outline-gray-200 hover:outline-1 bg-transparent text-mainColor"
                        />
                    </label>

                    {/* Activity Start & End time */}
                    <label className="mt-5">
                        <span className="block pl-1 text-md mb-1 font-thin text-nowrap text-mainColor">
                            Please select a time.
                        </span>

                        <div className="flex gap-5">
                            <div className="flex flex-col w-full">
                                <input
                                    type="time"
                                    className="input border-[1px] border-mainLineColor py-2 px-2 rounded-lg outline-gray-200 bg-transparent text-mainColor"
                                    value={timeStart}
                                    onChange={(e) => {
                                        setTimeRange({
                                            ...timeRange,
                                            timeStart: e.target.value,
                                        });
                                    }}
                                />
                                <p className="flex-center text-sm text-mainColor">
                                    Start Time
                                </p>
                            </div>

                            <div className="flex flex-col w-full">
                                <input
                                    type="time"
                                    className="input border-[1px] border-mainLineColor py-2 px-2 rounded-lg outline-gray-200 bg-transparent text-mainColor"
                                    value={timeEnd}
                                    onChange={(e) =>
                                        setTimeRange({
                                            ...timeRange,
                                            timeEnd: e.target.value,
                                        })
                                    }
                                />
                                <p className="flex-center text-sm text-mainColor">
                                    End Time
                                </p>
                            </div>
                        </div>
                    </label>

                    {/* Activity Description */}
                    <label className="mt-5">
                        <span className="block pl-1 text-md mb-1 font-thin text-nowrap text-mainColor">
                            How would you like to describe your activity?
                        </span>

                        <textarea
                            ref={textareaRef}
                            className={`resize-none  py-2 px-2 rounded-lg border-[1px] border-mainLineColor outline-gray-200 w-full
                     min-h-[50px] max-h-[180px] text-sm bg-transparent text-mainColor`}
                            value={desc}
                            onChange={handleInput}
                        ></textarea>
                    </label>
                </div>

                <div className="flex flex-col">
                    {/* Error message */}
                    <p className="text-sm text-red-600 mb-2">
                        {errorMessage.message}
                    </p>

                    {/* Submit button */}
                    <button
                        type="submit"
                        className="bg-darkPink text-white py-1 rounded-lg text-xl hover:shadow-main hover:bg-pink-700 transition-all disabled:bg-mainHoverColor disabled:text-disabledBtn disabled:shadow-none"
                        disabled={
                            name === ""
                                ? true
                                : timeStart === ""
                                ? true
                                : timeEnd === ""
                                ? true
                                : false
                        }
                    >
                        {timeRangePanel.type}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default AddTimeRangePanel;
