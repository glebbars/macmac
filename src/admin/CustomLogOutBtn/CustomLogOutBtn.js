import * as React from 'react';
import { forwardRef } from 'react';
import { userLogout,useLogout, useRedirect } from 'react-admin';
import { connect } from 'react-redux';
import {Link, useHistory} from 'react-router-dom'

const CustomLogOutBtn = forwardRef((props, ref) => {
  const history = useHistory()

  const logout = useLogout();
  const handleClick = () => logout('/create')

  return (
      <div onClick={() => {handleClick(); history.push('/')}}>Logouttt</div>
  );
});

export default CustomLogOutBtn