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
        minutes,
        setMinutes,
        setHours,
        seconds,
        setSeconds,
        setAchievement,
        currentAchievement,
        hours,
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
            intervalRef.current = setInterval(() => {
                if (minutes > 59) {
                    setHours(hours);
                    setMinutes(-1);
                }
                if (seconds >= 59) {
                    setMinutes(minutes);
                    setSeconds(-1);
                } else {
                    setSeconds(seconds);
                }
                const newAchievement = {
                    ...currentAchievement,
                    time: `${String(hours).padStart(2, "0")}:${String(
                        minutes
                    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`,
                };

                saveToLocalStorage("currentAchievement", newAchievement);
                console.log(newAchievement);
                setAchievement(newAchievement);
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [isRunning, seconds, minutes, hours, currentAchievement]);

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
