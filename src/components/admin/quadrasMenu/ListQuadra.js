import { useState } from "react";
import "../../../styles/admin/listQuadra.scss";
import CardQuadra from "./CardQuadra";

const ListQuadra = (props) => {
  const [ModalOpenEdit, setModalOpenEdit] = useState(false);

  return (
    <>
      {
        <div className="listaQuadrasStyle" key={props.index}>
          <CardQuadra quadra={props.quadra} />
        </div>
      }
    </>
  );
};

export default ListQuadra;
