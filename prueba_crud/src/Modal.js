import React from "react";
import './App.css';

const Modal = ({ show, onHide, nombre, setNombre, raza, setRaza, color,
  setColor, edad, setEdad,  handleCambios }) => {
  return (
    <div>
      <div
        className={`modal fade ${show ? "show" : ""}`}
        style={{ display: show ? "block" : "none" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Agregar Perrito</h5>
              <button type="button" className="close modal-close-btn" onClick={onHide}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="nombre">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    placeholder="Ingrese Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="raza">Raza</label>
                  <input
                    type="text"
                    className="form-control"
                    id="raza"
                    value={raza}
                    placeholder="Ingrese el tipo de raza"
                    onChange={(e) => setRaza(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="color">Color</label>
                  <input
                    type="text"
                    className="form-control"
                    id="color"
                    placeholder="Ingrese el color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="edad">Edad</label>
                  <input
                    type="number"
                    className="form-control"
                    id="edad"
                    placeholder="Ingrese la edad"
                    value={edad}
                    onChange={(e) => setEdad(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onHide}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCambios}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`modal-backdrop fade ${show ? "show" : ""}`}
        style={{ display: show ? "block" : "none" }}
      ></div>
    </div>
  );
};

export default Modal;
