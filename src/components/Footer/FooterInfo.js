import { NavLink } from "react-router-dom";

const FooterInfo = () => {
  return (
    <section>
      <h5>Информация</h5>
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink className="nav-link" to="/about.html">
            О магазине
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/catalog.html">
            Каталог
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/contacts.html">
            Контакты
          </NavLink>
        </li>
      </ul>
    </section>
  );
};

export default FooterInfo;
