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

import { useEffect, useRef } from "react";
import { useTimeRangeStore } from "./store";
import TimePanel from "./components/observe_page/TimePanel";

const App = () => {
    const {
        initializeDarkMode,
        isDarkMode,
        isRunning,
        setMinutes,
        setHours,
        setSeconds,
        setAchievement,
        currentAchievement,
        saveToLocalStorage,
        initializeCurrentAchievement,
    } = useTimeRangeStore();

    // Initializing dark mode
    useEffect(() => {
        initializeDarkMode();
    }, []);

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add("darkMode");
        }
    }, [isDarkMode]);

    // === Script for running timer no matter on what page we are
    let intervalRef = useRef(null);

    useEffect(() => {
        if (isRunning) {
            let achievementCopy = { ...currentAchievement };
            console.log("achieve copy when started: ", achievementCopy);

            const startTime = new Date();
            let lastDiff = achievementCopy.diff || 0;

            // console.log(achievementCopy);

            intervalRef.current = setInterval(() => {
                const timeElapsed = Math.floor((new Date() - startTime) / 1000);

                const newDiff = lastDiff + timeElapsed;
                console.log(newDiff);

                // calculating time
                const diffSeconds = newDiff % 60;
                const diffMinutes = Math.floor((newDiff % 3600) / 60);
                const diffHours = Math.floor(newDiff / 3600);

                setSeconds(diffSeconds);
                setMinutes(diffMinutes);
                setHours(diffHours);

                achievementCopy = {
                    ...achievementCopy,
                    time: `${String(diffHours).padStart(2, "0")}:${String(
                        diffMinutes
                    ).padStart(2, "0")}:${String(diffSeconds).padStart(
                        2,
                        "0"
                    )}`,
                    diff: newDiff,
                };

                console.log(achievementCopy);

                // console.log("Updated diff:", achievementCopy);

                saveToLocalStorage("currentAchievement", achievementCopy);
                setAchievement(achievementCopy);
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [isRunning]);

    useEffect(() => {
        initializeCurrentAchievement();
    }, []);

    return (
        <BrowserRouter>
            <Navbar />
            <Sidebar />
            <PopupWindow />
            <TimePanel />
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
