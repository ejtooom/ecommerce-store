import React from 'react';

import Form from 'react-bootstrap/Form';


const Input = (props) => {

    const element =
    props.element === 'input' ? (
      <Form.Control
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        required={props.required}
      />
    ) : props.element === 'textarea' ? (
      <Form.Control
        id={props.id}
        as="textarea"
        rows={props.rows || 3}
        value={props.value}
        onChange={props.onChange}
        required={props.required}
      />
    ) : props.element === 'select' ? (
      <Form.Control
        id={props.id}
        as="select"
        value={props.value}
      >{props.options.map(option => (<option>{option}</option>))}</Form.Control>
    ) : (
      <Form.Check
        type={props.type}
        label={props.labelRadio}
        name={props.name}
        id={props.id}
        value={props.value}
        required={props.required}
        checked={props.checked}
        onChange={props.onChange}
      />
    );

    return (
        <Form.Group controlId={props.id}>
            <Form.Label className={props.labelClass}>{props.label}</Form.Label>
            {element}
        </Form.Group>
    )
}

export default Input; 