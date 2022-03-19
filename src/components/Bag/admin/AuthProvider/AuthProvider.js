const authProvider = {
  // authentication
  login: ({ username, password }) => {
    if(username === 'admin' && password === 'admin'){
      localStorage.setItem('username', username);
      return Promise.resolve();
    } else{
      return Promise.reject();
    }
    
    // accept all username/password combinations
},

logout: () => {
  localStorage.removeItem('username');
  return Promise.resolve();
},
checkError: () => Promise.resolve(),
checkAuth: () =>
  localStorage.getItem('username') ? Promise.resolve() : Promise.reject(),
getPermissions: () => Promise.reject('Unknown method'),
};

export default authProvider;