import React, { useState } from "react";
import Swal from "sweetalert2";
import Modal from "./Modal";
import "sweetalert2/dist/sweetalert2.min.css";

const ModalAgregar = ({ show, onHide ,actualizarPerritos}) => {
  const [nombre, setNombre] = useState("");
  const [raza, setRaza] = useState("");
  const [color, setColor] = useState("");
  const [edad, setEdad] = useState("");
  const fechaing = new Date().toISOString().split('T')[0];

  const handleAgregar = () => {
    const nuevoPerrito = { nombre, raza, color, edad, fechaing };
    console.log("Agregar perrito:", nuevoPerrito);

    Swal.fire({
      title: '¿Quieres guardar los cambios?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("http://localhost:5000/api/perritos", {
          method: "POST",
          body: JSON.stringify(nuevoPerrito),
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
            console.error("Error al agregar perrito:", error);
          });

        onHide(); 
      } else if (result.isDenied) {
        Swal.fire('No se guardaron los cambios', '', 'info');
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
        handleCambios={handleAgregar}
      />
    </div>
  );
};

export default ModalAgregar;
