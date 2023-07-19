import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Row, Col } from 'react-bootstrap';
import './citas.css';

const Citas = () => {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    // Obtener las citas almacenadas en el localStorage
    const citasLocalStorage = localStorage.getItem('citas');
    if (citasLocalStorage) {
      try {
        const parsedCitas = JSON.parse(citasLocalStorage);
        setCitas(parsedCitas);
      } catch (error) {
        console.error('Error al parsear las citas del localStorage:', error);
      }
    }
  }, []);

  // Función para eliminar una cita por su índice
  const eliminarCita = (index) => {
    const citasActualizadas = [...citas];
    citasActualizadas.splice(index, 1);
    setCitas(citasActualizadas);

    // Guardar las citas actualizadas en el localStorage
    localStorage.setItem('citas', JSON.stringify(citasActualizadas));
  };

  return (
    <div>
      <h2>Todas las citas:</h2>
      {citas.length === 0 ? (
        <p>No hay citas almacenadas.</p>
      ) : (
        <Row>
          {citas.map((cita, index) => (
            <Col key={index} md={4} className="mb-4">
              <Card className="my-3 mx-2 custom-card">
                <Card.Body>
                  <Card.Title className="card-title">Tipo de cita: {cita.tipoCita}</Card.Title>
                  <Card.Text className="card-text">
                    <strong>Médico:</strong> {cita.medico}<br />
                    <strong>Fecha:</strong> {cita.fecha}<br />
                    <strong>Hora:</strong> {cita.hora}<br />
                    <strong>Paciente:</strong> {cita.paciente}<br />
                  </Card.Text>
                  <Button
                    variant="danger"
                    onClick={() => eliminarCita(index)}
                    className="delete-button"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Citas;