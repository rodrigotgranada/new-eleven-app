import { useState } from "react";
import "../../../styles/admin/listQuadra.scss";
import EditQuadra from "../../admin/modal/EditQuadra";
import CardQuadra from "./CardQuadra";

const ListQuadra = (props) => {
  const [ModalOpenEdit, setModalOpenEdit] = useState(false);

  // const {
  //   getDataWhereId: getModalidades,
  //   data: modalidades,
  //   loading: carregaModalidades,
  // } = useGetData();

  // useEffect(() => {
  //   // console.log("props", props.quadra?.esportes);
  //   getModalidades("modalidades", "in", props.quadra?.esportes);
  // }, []);

  // useEffect(() => {
  //   if (modalidades.length > 0) {
  //     console.log("props", props.quadra?.esportes);
  //     console.log("modalidae", modalidades);
  //   }
  // }, [modalidades]);

  return (
    <>
      {/* {carregaModalidades && <div>Carregando.....</div>} */}

      {
        // modalidades.length > 0 &&
        <div className="listaQuadrasStyle" key={props.index}>
          <EditQuadra
            title="Edit Quadra"
            isOpen={ModalOpenEdit}
            setIsOpen={setModalOpenEdit}
            hasFooter={true}
            editarQuadra={props.quadra}
            id={props.quadra?.id}
          />

          <CardQuadra
            quadra={props.quadra}
            setModalOpenEdit={setModalOpenEdit}
          />
          {/* <div
            onClick={() => {
              setModalOpenEdit(true);
            }}
          >
            <p>
              {props.quadra?.numero} - {props.quadra?.name} -{" "}
              {props.quadra?.esportes?.map((esporte, index) => {
                // console.log("minha modalidade", esporte);
                return (
                  <ListModalidade key={index} id={esporte} />
                  // <span key={index}>
                  //   {esporte.display}
                  //   {index + 1 == modalidades.length ? "" : " / "}
                  // </span>
                );
              })}
            </p>
            <img
              src={props.quadra?.foto ? props.quadra?.foto : null}
              alt={props.quadra?.name}
              id={props.quadra?.id}
              height={"150rem"}
              width={"250rem"}
            />
          </div> */}

          {/* {props.editQuadra} */}
        </div>
      }
    </>
  );
};

export default ListQuadra;
