import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import { NavBar } from "./components/navbar/NavBar";
// import Corrida from "./pages/corrida/Corrida";
import Home from "./pages/home/Home";
// import Motoristas from "./pages/motoristas/Motoristas";
// import { Usuarios } from "./pages/usuarios/Usuarios";
// import Cadastro from "./pages/cadastro/Cadastro";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="min-h-screen font-[Poppins] text-white bg-linear-to-bl from-people-color-dark to-people-color-light">
          <div className="px-20">
            <div className="max-w-7xl mx-auto">
              <NavBar />
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route
                  path="/corridas"
                  // element={<Corridas />}
                />
                <Route
                  path="/motoristas"
                  // element={<Motoristas />}
                />
                {/* <Route
                                    path="/usuarios"
                                    // element={<Usuarios />}
                                />
                                <Route
                                    path="/cadastro"
                                    // element={<Cadastro />}
                                /> */}
              </Routes>
            </div>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
