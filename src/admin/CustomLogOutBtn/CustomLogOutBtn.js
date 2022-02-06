import * as React from 'react';
import { forwardRef } from 'react';
import {Link,  } from 'react-router-dom';


const CustomLogOutBtn = forwardRef((props, ref) => {

  console.log(props)

  return (
      <div className='admin__logout-btn' onClick={() => {localStorage.removeItem('username'); window.location.replace('/')}}>Logout</div>
  );
});

export default CustomLogOutBtn