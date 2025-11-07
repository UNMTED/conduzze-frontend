import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./components/footer/Footer";
import { NavBar } from "./components/navbar/NavBar";
import Corrida from "./pages/corrida/Corrida";
import Home from "./pages/home/Home";

function App() {
    return (
        <>
            <ToastContainer />
            <BrowserRouter>
                <div className="min-h-screen text-white bg-linear-to-bl from-people-color-dark to-people-color-light">
                    <div className="max-w-7xl min-h-[95vh] px-20 mx-auto">
                        <NavBar />
                        <Routes>
                            <Route
                                path="/"
                                element={<Home />}
                            />
                            <Route
                                path="/home"
                                element={<Home />}
                            />
                            <Route
                                path="/corridas"
                                element={<Corrida />}
                            />
                            <Route
                                path="/motoristas"
                                // element={<Motoristas />}
                            />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </BrowserRouter>
        </>
    );
}

export default App;
