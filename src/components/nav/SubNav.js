import React from "react";
import { NavLink } from "react-router-dom";
import { SubContainer } from "./styles";

const SubNav = ({ admin }) => {
  let admin__nav;
  admin
    ? (admin__nav = [{ path: "admin/permanentes", display: "Permanentes" }])
    : (admin__nav = [{ path: "marcar-quadra", display: "Marcar Quadra" }]);

  return (
    <SubContainer>
      <nav>
        <ul>
          {admin__nav.map((item, index) => (
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
          ))}
        </ul>
      </nav>
    </SubContainer>
  );
};

export default SubNav;
