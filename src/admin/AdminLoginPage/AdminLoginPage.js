import * as React from 'react';
import { useState } from 'react';
import { useLogin, useNotify, Notification, defaultTheme } from 'react-admin';

const AdminLoginPage = ({ theme }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = useLogin();
    const notify = useNotify();
    const submit = e => {
        e.preventDefault();
        // will call authProvider.login({ email, password })
        if(email === 'admin' && password === 'admin'){
          login({ email, password }).catch(() =>
              notify('Invalid email or password')
          );
        } else{
          notify('Invalid email or password')
        }
    };

    return (
      <>
      <form onSubmit={submit}>
                <input
                    name="email"
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <input type="submit" />
            </form>
            {/* This can be used instad of custom error BUT in strict mode there will be an error in console*/}
            {/* <Notification /> */}
      </>
    );
};

export default AdminLoginPage