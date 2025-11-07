import { NavLink } from "react-router-dom";

export const NavBar = () => {
    const linkBase =
        "rounded py-1 px-4 hover:bg-white hover:text-black hover:cursor-pointer";
    const linkAtivo = "bg-white text-conduzze-dark";
    return (
        <>
            <div className=" flex justify-between pt-5 py-4  border-b border-white px-10">
                <img
                    src="https://ik.imagekit.io/yljuedpj1/Conduzz%C3%A9%20(2).png?updatedAt=1762468743907"
                    alt="Logo Conduzzé"
                    className="h-10 sm:h-12 md:h-10 m-2 w-auto object-contain"
                />
                <nav className="flex lg:text-xl xl:text-2xl justify-end gap-2 mt-4 mb-auto">
                    <NavLink
                        to="/home"
                        className={({ isActive }) =>
                            `${linkBase} ${isActive ? linkAtivo : ""}`
                        }
                    >
                        Início
                    </NavLink>

                    <NavLink
                        to="/corridas"
                        className={({ isActive }) =>
                            `${linkBase} ${isActive ? linkAtivo : ""}`
                        }
                    >
                        Corridas
                    </NavLink>
                    <NavLink
                        to="/motoristas"
                        className={({ isActive }) =>
                            `${linkBase} ${isActive ? linkAtivo : ""}`
                        }
                    >
                        Motoristas
                    </NavLink>
                    {/* <NavLink
                        to="/usuarios"
                        className={({ isActive }) =>
                            `${linkBase} ${isActive ? linkAtivo : ""}`
                        }
                    >
                        usuarios
                    </NavLink>
                    <NavLink
                        to="/cadastro"
                        className={({ isActive }) =>
                            `${linkBase} ${isActive ? linkAtivo : ""}`
                        }
                    >
                        Cadastro
                    </NavLink> */}
                </nav>
            </div>
        </>
    );
};
export default NavBar;