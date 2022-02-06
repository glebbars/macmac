import * as React from 'react';
import { useState } from 'react';
import { useLogin } from 'react-admin';

const AdminLoginPage = ({ theme }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const login = useLogin();

    const submit = e => {
        e.preventDefault();
        if(username === 'admin' && password === 'admin'){
          login({ username, password }).catch(() => {
            setError('Invalid username or password')
          })
        } else{
          setError('Invalid username or password')
        }
    };

    return (
      <form onSubmit={submit}>
        <input
          name="username"
          type="text"
          autoComplete='username'
          value={username}
          onChange={e => {setUsername(e.target.value); setError('')}}
        />
        <input
          name="password"
          type="password"
          autoComplete='current-password'
          value={password}
          onChange={e => {setPassword(e.target.value); setError('')}}
        />
        <input type="submit" />
        {error && <p style={{color: 'red'}}>{error}</p>}
      </form>
    );
};

export default AdminLoginPage