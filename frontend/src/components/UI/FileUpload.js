import React from 'react';

import Form from 'react-bootstrap/Form';


const FileUpload = (props) => {

    return (
        <Form.Group controlId={props.id}>
            <Form.File 
                type="file"
                id={props.id}
                labe={props.label}
                onChange={props.onChange} />
        </Form.Group>
    )
}

export default FileUpload; 