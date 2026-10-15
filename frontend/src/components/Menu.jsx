import { NavLink } from "react-router";

export default function Menu() {
  return (
    <header className="menu">
      <span className="menu__logo">HabitLog</span>
      <nav className="menu__links">
        <NavLink to="/" end>Inicio</NavLink>
        <NavLink to="/registro">Registrar</NavLink>
        <NavLink to="/lista">Hábitos</NavLink>
      </nav>
    </header>
  );
}