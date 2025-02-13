const BlockInfo = ({ children }) => {
    return (
        <div
            className="absolute -top-10 w-[90px] bg-gray-700 text-white text-[.7rem] rounded-md flex-center py-2
      border-gray-900 z-50 before:w-2 before:h-2 before:absolute before:right-1/2 before:translate-x-[50%]
        before:-bottom-1 before:bg-gray-700 before:rotate-45
        "
        >
            {children}
        </div>
    );
};

export default BlockInfo;
