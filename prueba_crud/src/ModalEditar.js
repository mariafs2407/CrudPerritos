import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Modal from "./Modal";
import "sweetalert2/dist/sweetalert2.min.css";

const ModalEditar = ({ show, onHide, perro ,actualizarPerritos}) => {
  const [nombre, setNombre] = useState(perro.nombre || "");
  const [raza, setRaza] = useState(perro.raza || "");
  const [color, setColor] = useState(perro.color || "");
  const [edad, setEdad] = useState(perro.edad || ""); 

  // Update perrito
  const handleEditar = () => {
    const editadoPerrito = { nombre, raza, color, edad };
    console.log("Editar perrito:", editadoPerrito);

    Swal.fire({
      title: "¿Quieres guardar los cambios?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/api/perritos/${perro._id}`, {
          method: "PUT",
          body: JSON.stringify(editadoPerrito),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Respuesta del servidor:", data);
            actualizarPerritos();
          })
          .catch((error) => {
            console.error("Error al editar perrito:", error);
            Swal.fire("Error al editar perrito", "", "error");
          });
          onHide(); 
      } else if (result.isDenied) {
        Swal.fire("No se guardaron los cambios", "", "info");
      }
    });
  };

  return (
    <div>
      <Modal
        show={show}
        onHide={onHide}
        nombre={nombre}
        setNombre={setNombre}
        raza={raza}
        setRaza={setRaza}
        color={color}
        setColor={setColor}
        edad={edad}
        setEdad={setEdad}        
        handleCambios={handleEditar}
      />
    </div>
  );
};

export default ModalEditar;
