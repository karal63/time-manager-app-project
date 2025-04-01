const CommentsPanel = () => {
    return (
        <div className="absolute w-[300px] h-[calc(100vh-68px)] right-0 top-full bg-mainBackground border-l border-mainLineColor">
            <div className="w-full absolute bottom-5 right-0 px-4">
                <textarea
                    placeholder="Write comment here..."
                    className="block w-full bg-mainHoverColor text-left px-4 pt-2 pb-14 rounded-md outline-none resize-none"
                ></textarea>

                <button className="absolute right-6 bottom-2 bg-darkPink text-white active:bg-darkPinkTransp px-3 py-1 rounded-md transition-all">
                    Add
                </button>
            </div>
        </div>
    );
};

export default CommentsPanel;
