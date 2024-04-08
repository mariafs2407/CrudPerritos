import React, { useEffect, useState } from "react";
import "./App.css";
import ModalAgregar from "./ModalAgregar";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import ModalEditar from "./ModalEditar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDog ,faPenToSquare,faEraser} from '@fortawesome/free-solid-svg-icons';

function App() {
  const [perritos, setPerritos] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [idEliminar, setIdEliminar] = useState("");
  const [perritoSeleccionado, setPerritoSeleccionado] = useState(null);

  const leerPerritos = () => {
    const rutaServicio = "http://localhost:5000/api/perritos";
    fetch(rutaServicio)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPerritos(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error al obtener perritos:", error);
      });
  };

  useEffect(() => {
    leerPerritos();
  }, []);

  const handleEliminar = (id) => {
    setIdEliminar(id);
    console.log("Perrito eliminado:", id);
    Swal.fire({
      title: "¿Está seguro de eliminar este perrito?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Si",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/api/perritos/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Respuesta del servidor:", data);
            leerPerritos();
          })
          .catch((error) => {
            console.error("Error al eliminar perrito:", error);
          });
      } else if (result.isDenied) {
        Swal.fire("No se guardaron los cambios", "", "info");
      }
    });
  };

  const actualizarPerritos = () => {
    leerPerritos();
  };

  return (
    <div className="container">
      <h1 className="my-4 ">Lista de Perritos</h1>

      <div className="col-12 d-flex -justify-content-between">
        <button
          className="btn btn-warning ml-4 mt-3 text-white  "
          onClick={() => setModalShow(true)}
        >
          <FontAwesomeIcon icon={faDog} bounce style={{color: "#f9fafb",}} className="p-1"/>
          Nuevo Perrito
        </button>
      </div>

      <ModalAgregar
        show={modalShow}
        onHide={() => setModalShow(false)}
        actualizarPerritos={actualizarPerritos}
      />

      {perritoSeleccionado && (
        <ModalEditar
          show={modalShow}
          onHide={() => {
            setModalShow(false);
            setPerritoSeleccionado(null); 
          }}
          perro={perritoSeleccionado}
          actualizarPerritos={actualizarPerritos}
        />
      )}

      <table className="table  table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Nombre</th>
            <th>Raza</th>
            <th>Color</th>
            <th>Edad</th>
            <th>Fecha de ingreso</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {perritos.map((item) => (
            <tr key={item.id}>
              <td>{item.nombre}</td>
              <td>{item.raza}</td>
              <td>{item.color}</td>
              <td>{`${item.edad} años`}</td>
              <td>{item.fechaing}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary m-2"
                  onClick={() => {
                    setPerritoSeleccionado(item);
                    setModalShow(true);
                  }}
                >
                  <FontAwesomeIcon icon={faPenToSquare} style={{color: "#ffffff",}} />
                  Editar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleEliminar(item._id)}
                >
                  <FontAwesomeIcon icon={faEraser} style={{color: "#ffffff",}} />
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
