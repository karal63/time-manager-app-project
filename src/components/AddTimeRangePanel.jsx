import { useEffect, useRef, useState } from "react";
import { useTimeRangeStore } from "../store";

const AddTimeRangePanel = ({ setIsAddingPanelOpen }) => {
    // example of time range
    const [timeRange, setTimeRange] = useState({
        id: 0,
        name: "",
        desc: "",
        timeStart: "",
        timeEnd: "",
        duration: "",
    });

    // destructuring time range
    const { name, timeStart, timeEnd, desc } = timeRange;

    // getting from useTimeRangeStore
    const { togglePopup, timeRanges } = useTimeRangeStore();

    // textarea ref
    let textareaRef = useRef();

    // making textarea dynamic
    const handleInput = (e) => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
        setTimeRange({ ...timeRange, desc: e.target.value });
    };

    // function that response for what will happen when we click add time range button
    const handleSubmit = (e) => {
        e.preventDefault();
        togglePopup(true);
        setIsAddingPanelOpen(false);
        timeRanges.push(timeRange);
    };

    return (
        <section
            className={`h-[calc(100vh-68px)] w-[350px] rounded-md shadow-main bg-white overflow-hidden  px-5 pt-5 pb-10 flex flex-col 
                z-10 transition-all duration-75`}
        >
            <h1 className="text-xl flex-center text-darkPink font-medium text-nowrap mb-5">
                Add a new Time Range
            </h1>

            <form
                className="mt-9 h-full flex flex-col justify-between"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col gap-2">
                    {/* Activity Name */}
                    <label>
                        <span className="block pl-1 text-md mb-1 font-thin text-nowrap">
                            How would you name your activity?
                        </span>

                        {/* name input */}
                        <input
                            type="text"
                            onChange={(e) =>
                                setTimeRange({
                                    ...timeRange,
                                    name: e.target.value,
                                })
                            }
                            className="border-[1px] w-full py-2 px-2 rounded-lg outline-gray-200 hover:outline-1"
                        />
                    </label>

                    {/* Activity Start & End time */}
                    <label className="mt-5">
                        <span className="block pl-1 text-md mb-1 font-thin text-nowrap ">
                            Select time
                        </span>

                        <div className="flex gap-5">
                            <div className="flex flex-col w-full">
                                <input
                                    type="time"
                                    className="border-[1px] py-2 px-2 rounded-lg outline-gray-200"
                                    value={timeStart}
                                    onChange={(e) =>
                                        setTimeRange({
                                            ...timeRange,
                                            timeStart: e.target.value,
                                        })
                                    }
                                />
                                <p className="flex-center">Start</p>
                            </div>

                            <span className="text-2xl text-gray-400 flex justify-center">
                                |
                            </span>

                            <div className="flex flex-col w-full">
                                <input
                                    type="time"
                                    className="border-[1px] py-2 px-2 rounded-lg outline-gray-200"
                                    value={timeEnd}
                                    onChange={(e) =>
                                        setTimeRange({
                                            ...timeRange,
                                            timeEnd: e.target.value,
                                        })
                                    }
                                />
                                <p className="flex-center">End</p>
                            </div>
                        </div>
                    </label>

                    {/* Activity Description */}
                    <label className="mt-5">
                        <span className="block pl-1 text-md mb-1 font-thin text-nowrap">
                            How would you describe your activity?
                        </span>

                        <textarea
                            ref={textareaRef}
                            className="resize-none border-[1px] py-2 px-2 rounded-lg outline-gray-200 w-full
                     min-h-[50px] max-h-[300px] overflow-hidden text-sm"
                            value={desc}
                            onChange={handleInput}
                        ></textarea>
                    </label>
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    className="bg-darkPink text-white py-1 rounded-lg text-xl hover:shadow-main hover:bg-pink-700 transition-all"
                >
                    Create
                </button>
            </form>
        </section>
    );
};

export default AddTimeRangePanel;
