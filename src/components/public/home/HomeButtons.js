import React from 'react'
import { NavLink } from "react-router-dom";
import "../../../styles/public/buttonsHome.scss"
import HomeAgendaCard from './HomeAgendaCard';
import { useAuth } from '../../../contexts/AuthContext';

const HomeButtons = () => {
  const { currentUser, logout } = useAuth();

  let buttonsUse = [
    { path: "/marcar-quadra", display: "Marque seu Horário", classes: 'btn btn-primary btns-home marqueSeuHorario', agenda: false, auth: false },
    { path: "/meus-agendamentos", display: "Próximo Agendamento", classes: 'btn btn-primary btns-home ', agenda: true, auth: true },
    { path: "/minhas-transferencias", display: "Transferencias", classes: 'btn btn-primary btns-home  ', agenda: false, auth: true  },
  ]
  return (
    <div className='buttonsHome'>
    { buttonsUse.map((item, index) => {
      if(!currentUser && !item.auth) {
        return <NavLink
            key={index}
            to={item.path}
            title={item.display}
            className={`${item.classes}${item.agenda ? `box-agenda` : "" }`}
            // className={ (navClass) => navClass.isActive ? `active__admin-menu ${item.classes}` : `${item.classes}`}
          >
            { !item.agenda ? <span className='nameBtnHome'>{item.display}</span> : <HomeAgendaCard item={item}/>}
        </NavLink>
      } else if( currentUser ){
        return <NavLink
        key={index}
        to={item.path}
        title={item.display}
        className={`${item.classes}${item.agenda ? `box-agenda` : "" }`}
        // className={ (navClass) => navClass.isActive ? `active__admin-menu ${item.classes}` : `${item.classes}`}
      >
        { !item.agenda ? <span className='nameBtnHome'>{item.display}</span> : <HomeAgendaCard item={item}/>}
    </NavLink>
      }

    }) }
    </div>
  )
}

export default HomeButtons
