import * as React from 'react';
import { useState } from 'react';
import { useLogin } from 'react-admin';

const AdminLoginPage = ({ theme }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const login = useLogin();

    const submit = e => {
        e.preventDefault();
        if(email === 'admin' && password === 'admin'){
          login({ email, password }).catch(() => {
            setError('Invalid email or password')
          })
        } else{
          setError('Invalid email or password')
        }
    };

    return (
      <form onSubmit={submit}>
        <input
          name="username"
          type="text"
          autoComplete='username'
          value={email}
          onChange={e => {setEmail(e.target.value); setError('')}}
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