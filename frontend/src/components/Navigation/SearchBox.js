import React, { useState } from 'react';

import CustomedButton from '../UI/CustomedButton';

import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

const SearchBox = (props) => {

    const [name, setName] = useState('');
    const submitHandler = (e) => {
      e.preventDefault();
      props.history.push(`/search/name/${name}`);
    };

    return (
        <Form inline className="navbar-search-form" onChange={(e) => setName(e.target.value)} onSubmit={submitHandler}>
            <FormControl type="text" name="q" id="q" placeholder="Search" className="mr-sm-2" />
            <CustomedButton type="submit" variant="outline-dark">Check</CustomedButton>
        </Form>
    )
}

export default SearchBox;