import React, { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import './formulario.css';

const medicos = [
    {
      nombre: "Dr. Juan Pérez",
      especialidad: "Cardiología",
    },
    {
      nombre: "Dra. María Gómez",
      especialidad: "Cardiología",
    },
    {
      nombre: "Dr. Carlos Rodríguez",
      especialidad: "Pediatría",
    },
    {
      nombre: "Dra. Laura Martínez",
      especialidad: "Pediatría",
    },
    {
      nombre: "Dr. Pedro Sánchez",
      especialidad: "Cirugía General",
    },
    {
      nombre: "Dra. Ana Ramírez",
      especialidad: "Cirugía General",
    },
    {
      nombre: "Dr. Luis Torres",
      especialidad: "Ginecología",
    },
    {
      nombre: "Dra. Patricia Ríos",
      especialidad: "Ginecología",
    },
    {
      nombre: "Dr. Roberto Mendoza",
      especialidad: "Dermatología",
    },
    {
      nombre: "Dra. Laura Salazar",
      especialidad: "Dermatología",
    },
  ];

const Eleccion = ({ onAgendar, onVolver }) => {
  const [medicosPorEspecialidad, setMedicosPorEspecialidad] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [selectedValues, setSelectedValues] = useState({
    tipoCita: '',
    medico: '',
    fecha: '',
    hora: '',
  });
  const [showError, setShowError] = useState(false);
const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Obtener una lista única de especialidades de los médicos
    const uniqueEspecialidades = [...new Set(medicos.map((medico) => medico.especialidad))];
    setEspecialidades(uniqueEspecialidades);
  }, []);

  const handleTipoCitaChange = (e) => {
    const tipoCita = e.target.value;
    setSelectedValues((prevValues) => ({
      ...prevValues,
      tipoCita: tipoCita,
    }));

    // Filtrar los médicos según la especialidad seleccionada
    const medicosFiltrados = medicos.filter((medico) => medico.especialidad === tipoCita);
    setMedicosPorEspecialidad(medicosFiltrados);
  };

  const handleMedicoChange = (e) => {
    const medico = e.target.value;
    setSelectedValues((prevValues) => ({
      ...prevValues,
      medico: medico,
    }));
    
  };

  const handleFechaChange = (e) => {
    const fecha = e.target.value;

    setSelectedValues((prevValues) => ({
      ...prevValues,
      fecha: fecha,
    }));
  };

  const handleHoraChange = (e) => {
    const hora = e.target.value;
    
    // Validar el formato de la hora utilizando una expresión regular
    const horaRegex = /^(0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  
    if (horaRegex.test(hora)) {
      setSelectedValues((prevValues) => ({
        ...prevValues,
        hora: hora,
      }));
    } else {
      // Si el formato no es válido, puedes mostrar un mensaje de error o realizar alguna otra acción
      console.error('Formato de hora inválido. El formato correcto es "hh:mm"');
    }
  };

  const handleVolver = () => {
    onVolver();
  };


  const handleEnviarCita = () => {
    const currentDate = new Date();
    const selectedDate = new Date(selectedValues.fecha);

  
    // Verificar si todos los campos están seleccionados
    if (
      selectedValues.tipoCita &&
      selectedValues.medico &&
      selectedValues.fecha &&
      selectedValues.hora &&
      selectedDate > currentDate
    ) {
      // Llamar a la función onAgendar pasando los valores seleccionados
      onAgendar(selectedValues);
      // Aquí puedes guardar los valores en el localStorage si es necesario
      localStorage.setItem('selectedValues', JSON.stringify(selectedValues));
      setShowError(false); // Ocultar el mensaje de error si estaba mostrándose
      handleShowModal();
      const datos=localStorage.getItem('formData');
      const datosPaciente = JSON.parse(datos);
      const { name  } = datosPaciente;
      setPaciente(name);

      const citaConPaciente = {
        ...selectedValues,
        paciente: name
      };
      const citasLocalStorage = localStorage.getItem('citas');
      let citas = [];


      if (citasLocalStorage) {
        try {
          // Si hay citas almacenadas, las convertimos en un arreglo
          citas = JSON.parse(citasLocalStorage);
        } catch (error) {
          console.error('Error al parsear las citas del localStorage:', error);
        }
      }

      // Agregar la nueva cita al arreglo de citas existentes
      const nuevaCita = { ...citaConPaciente};
      citas.push(nuevaCita);

      // Guardar el arreglo actualizado en el localStorage
      localStorage.setItem('citas', JSON.stringify(citas));


      //setCitas((prevCitas) => [...prevCitas, citaConPaciente]);
      localStorage.removeItem('selectedValues');
      localStorage.removeItem('formData');

    } else {
      setErrorMessage('Error: Por favor, seleccione todos los campos.');
      setShowError(true); // Mostrar el mensaje de error
    }
  };
  useEffect(() => {
    const savedFormDataE = localStorage.getItem('selectedValues');
    if (savedFormDataE) {
      setSelectedValues(JSON.parse(savedFormDataE));
    }
  }, []);
  const [showModal, setShowModal] = useState(false);
   // Función para abrir el modal
   const handleShowModal = () => setShowModal(true);

   // Función para cerrar el modal
   const handleCloseModal = () => {
    setShowModal(false);
  }
   const [paciente, setPaciente] = useState('');

  return (
    <div>
      <h2>Seleccione el tipo de cita médica:</h2>
      <Form.Group controlId="appointmentType">
        <Form.Control as="select" onChange={handleTipoCitaChange} value={selectedValues.tipoCita}>
          <option value="">Selecciona</option>
          {especialidades.map((especialidad) => (
            <option key={especialidad} value={especialidad}>
              {especialidad}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <h2>Seleccione el médico o especialista deseado:</h2>
      <Form.Group controlId="doctor">
        <Form.Control as="select" onChange={handleMedicoChange} value={selectedValues.medico}>
          <option value="">Selecciona</option>
          {medicosPorEspecialidad.map((medico) => (
            <option key={medico.nombre} value={medico.nombre}>
              {medico.nombre}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <h2>Seleccione la fecha y hora preferidas:</h2>
      <Form.Group controlId="date">
        <Form.Control type="date" onChange={handleFechaChange} value={selectedValues.fecha} />
      </Form.Group>
            <br></br>
      <Form.Group controlId="time">
        <Form.Control type="time" onChange={handleHoraChange} value={selectedValues.hora} />
      </Form.Group>
            <br></br>
      {/* Agrega un botón para volver */}
      <div className="d-flex justify-content-between">
  <Button variant="primary" type="sumbit" onClick={handleVolver}>
    Volver
  </Button>
  <Button variant="primary" type="sumbit" onClick={handleEnviarCita}>
    Agendar Cita
  </Button>
</div>
  {showError && <p style={{ color: 'red' }}>{errorMessage}</p>}
  {/* Modal para mostrar los detalles de la cita */}
  <Modal show={showModal} onHide={handleCloseModal} className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Cita registrada con éxito</Modal.Title>
          
        </Modal.Header>
        <Modal.Body>
          <p>Tipo de Cita: {selectedValues.tipoCita}</p>
          <p>Médico: {selectedValues.medico}</p>
          <p>Fecha: {selectedValues.fecha}</p>
          <p>Hora: {selectedValues.hora}</p>
          <p>Paciente: {paciente}</p>
          {/* Agrega más detalles de la cita aquí si es necesario */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Eleccion;