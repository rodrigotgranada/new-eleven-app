import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/public/nav.scss";

const SubNav = ({ admin, rule }) => {
  // console.log("RULE", rule);
  let admin__nav;
  admin
    ? (admin__nav = [
        { path: "admin/home", display: "Home" },
        { path: "admin/agenda", display: "Agenda", rule: false },
        { path: "admin/permanentes", display: "Permanentes", rule: false },
        { path: "admin/bloqueios", display: "Bloqueios", rule: false },
        { path: "admin/usuarios", display: "Usuários", rule: true },
        { path: "admin/quadras", display: "Quadras", rule: true },
        { path: "admin/logs", display: "Logs", rule: true },
      ])
    : (admin__nav = [
        { path: "marcar-quadra", display: "Marcar Quadra" },
        { path: "meus-agendamentos", display: "Meus Agendamentos" },
        { path: "minhas-transferencias", display: "Minhas transferencias" },
      ]);

  return (
    // <SubContainer>
    <nav className="sub-nav">
      {/* <nav> */}
      <ul>
        {admin__nav.map((item, index) => {
          if (rule) {
            return (
              <li key={index}>
                <NavLink
                  to={item.path}
                  title={item.display}
                  className={(navClass) =>
                    navClass.isActive ? "active__admin-menu" : ""
                  }
                >
                  {item.display}
                </NavLink>
              </li>
            );
          } else {
            if (!item.rule) {
              return (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    title={item.display}
                    className={(navClass) =>
                      navClass.isActive ? "active__admin-menu" : ""
                    }
                  >
                    {item.display}
                  </NavLink>
                </li>
              );
            }
          }
        })}
      </ul>
      {/* </nav> */}
    </nav>
    // </SubContainer>
  );
};

export default SubNav;
