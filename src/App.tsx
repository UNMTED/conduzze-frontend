import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer/Footer";
import NavBar from "./components/navbar/NavBar";
import Home from "./pages/home/Home";

function App() {
    return (
        <>
            <ToastContainer />
            <BrowserRouter>
                <NavBar />
                <div className="min-h-[80vh]">
                    <Routes>
                        <Route
                            path="/"
                            element={<Home />}
                        />
                    </Routes>
                </div>
                <Footer />
            </BrowserRouter>
        </>
    );
}

export default App;
