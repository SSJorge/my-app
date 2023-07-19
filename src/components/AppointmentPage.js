import React, { useState} from 'react';
import { Container } from 'react-bootstrap';
import Formulario from './Formulario';
import Eleccion from './Eleccion';
import './appointmentPage.css'; // Ruta al archivo CSS

const AppointmentPage = () => {


  const [mostrarFormulario, setMostrarFormulario] = useState(true);


  const handleEnviarFormulario = (formData) => {
    // Aquí puedes utilizar los valores del formulario (formData) para realizar alguna acción
    console.log('Valores ingresados:', formData);

    // Realiza la lógica adicional que necesites con los datos del formulario

    // Ocultar el formulario y mostrar Eleccion.js
    setMostrarFormulario(false);
  };
  const handleVolver = () => {
    setMostrarFormulario(true);
  }

  return (
    <div>
      <Container>
        <h1 >Ingrese los datos del paciente</h1>
        {/* Agrega cualquier contenido adicional que desees mostrar en la página */}
        {mostrarFormulario ? (
          <Formulario
            onEnviar={(formData) => {
              handleEnviarFormulario(formData);
              localStorage.setItem('formData', JSON.stringify(formData));
            }}
          />
        ) : (
          <Eleccion
            onAgendar={(formDataEleccion) => {
              console.log(formDataEleccion);
              localStorage.setItem('formDataEleccion', JSON.stringify(formDataEleccion));
            }}
            onVolver={() => {
              handleVolver();
            }}
          />
        )}
      </Container>
    </div>
  );
};

export default AppointmentPage;