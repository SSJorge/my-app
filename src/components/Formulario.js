import React, { useState, useEffect } from 'react';
import { Form, Button} from 'react-bootstrap';

import './formulario.css'; // Importa el archivo CSS


const Formulario = ({ onEnviar }) => {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    gender: '',
    contact: '',
  });

  const [showError, setShowError] = useState({
    name: false,
    dateOfBirth: false,
    gender: false,
    contact: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Inicializar un objeto para almacenar los errores de validación
    const errors = {};

    // Validar el campo de nombre
    if (!formData.name) {
      errors.name = 'Por favor, ingresa tu nombre';
    }

    // Validar el campo de fecha de nacimiento
    if (!formData.dateOfBirth) {
      errors.dateOfBirth = 'Por favor, selecciona tu fecha de nacimiento';
    }

    // Validar el campo de género
    if (!formData.gender) {
      errors.gender = 'Por favor, selecciona tu género';
    }

    // Validar el campo de correo
    const emailRegex = /^\S+@\S+\.\S+$/; // Expresión regular para validar el formato de correo electrónico
    if (!formData.contact) {
      errors.contact = 'Por favor, ingresa tu correo';
    } else if (!emailRegex.test(formData.contact)) {
      errors.contact = 'Correo inválido. Por favor, ingresa un correo válido';
    }

    // Mostrar mensajes de error solo para los campos con errores
    setShowError({
      name: errors.name ? true : false,
      dateOfBirth: errors.dateOfBirth ? true : false,
      gender: errors.gender ? true : false,
      contact: errors.contact ? true : false,
    });

    // Verificar si hay errores
    if (Object.keys(errors).length === 0) {
      // No hay errores, entonces podemos enviar el formulario
      console.log('Formulario válido. Enviando datos:', formData);
      localStorage.setItem('formData', JSON.stringify(formData));
      onEnviar(formData);
    } else {
      // Hay errores, mostrar mensajes de error y no enviar el formulario
      console.log('Formulario inválido:', errors);
    }
  };
  useEffect(() => {
    const savedFormData = localStorage.getItem('formData');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  return (
    <div className="formulario-container">
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name" className="mb-3">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          isInvalid={showError.name}
        />
        <Form.Control.Feedback type="invalid">Por favor, ingresa tu nombre</Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="dateOfBirth" className="mb-3">
        <Form.Label>Fecha de nacimiento</Form.Label>
        <Form.Control
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          isInvalid={showError.dateOfBirth}
        />
        <Form.Control.Feedback type="invalid">
          Por favor, selecciona tu fecha de nacimiento
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="gender" className="mb-3">
        <Form.Label>Género</Form.Label>
        <Form.Control
          as="select"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          isInvalid={showError.gender}
        >
          <option value="">Selecciona</option>
          <option value="male">Masculino</option>
          <option value="female">Femenino</option>
        </Form.Control>
        <Form.Control.Feedback type="invalid">Por favor, selecciona tu género</Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="contact" className="mb-3">
        <Form.Label>Correo</Form.Label>
        <Form.Control
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          isInvalid={showError.contact}
        />
        <Form.Control.Feedback type="invalid">
          Por favor, ingresa un correo válido
        </Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit">
        Continuar
      </Button>
    </Form>
    </div>
  );
};

export default Formulario;