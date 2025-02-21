import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import PopupWindow from "./components/PopupWindow";

//pages
import Notes from "./pages/Notes";
import Planner from "./pages/Planner";
import PageNotFound from "./pages/PageNotFound";
import ObservePlan from "./pages/ObservePlan";

import { useEffect } from "react";
import { useTimeRangeStore } from "./store";

const App = () => {
    const { initializeDarkMode, isDarkMode } = useTimeRangeStore();

    // Initializing dark mode
    useEffect(() => {
        initializeDarkMode();
    }, []);

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add("darkMode");
        }
    }, [isDarkMode]);

    return (
        <BrowserRouter>
            <Navbar />
            <Sidebar />
            <PopupWindow />
            <Routes>
                <Route path="/" element={<Navigate to="/planner" />} />
                <Route path="/planner" element={<Planner />} />
                <Route path="/planner/observe" element={<ObservePlan />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
