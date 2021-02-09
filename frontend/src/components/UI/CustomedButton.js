import React from 'react';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';


const CustomedButton = (props) => {
  if (props.href) {
    return (
      <a
        href={props.href}
      ><Button size={props.size} variant={props.variant} className={props.class}>{props.children}</Button>
      </a>
    );
  }
  if (props.to) {
    return (
      <Link
        to={props.to}
        exact={props.exact}
      ><Button variant={props.variant} size={props.size} className={props.class}>{props.children}</Button>
      </Link>
    );
  } 
  return (
    <Button className={props.class}
    variant={props.variant}
    size={props.size}
    type={props.type}
    onClick={props.onClick}
    disabled={props.disabled}>{props.children}
    </Button>
  );
};

export default CustomedButton;