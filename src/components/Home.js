import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './home.css'; // Ruta al archivo CSS

const Home = () => {
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

      return (
        <Container>
          <h1>Bienvenido a nuestra clínica</h1>
          <h2>Médicos Disponibles:</h2>
          <Row>
            {medicos.map((medico, index) => (
              <Col key={index} sm={4}>
                <div className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">{medico.nombre}</h5>
                    <p className="card-text">{medico.especialidad}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      );
    };
    
    export default Home;