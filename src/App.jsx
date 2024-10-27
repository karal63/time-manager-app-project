import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

//pages
import Notes from "./pages/Notes";
import Planner from "./pages/Planner";
import PageNotFound from "./pages/PageNotFound";
import ObservePlan from "./pages/ObservePlan";

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Sidebar />
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
