import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import AdminLanding from './components/AdminLanding';
import ClientLanding from './components/ClientLanding';
import UserLanding from './components/UserLanding';

function App() {
  const [role, setRole] = useState(''); // Role can be 'Admin', 'Client', or 'User'

  const handleLogin = (userRole) => {
    setRole(userRole);
  };

  return (
    <Router>
      <div>
        <h1>Role-Based Landing Page</h1>
        <button onClick={() => handleLogin('Admin')}>Login as Admin</button>
        <button onClick={() => handleLogin('Client')}>Login as Client</button>
        <button onClick={() => handleLogin('User')}>Login as User</button>
        <Switch>
          <Route path='/admin' render={() => role === 'Admin' ? <AdminLanding /> : <Redirect to='/' />} />
          <Route path='/client' render={() => role === 'Client' ? <ClientLanding /> : <Redirect to='/' />} />
          <Route path='/user' render={() => role === 'User' ? <UserLanding /> : <Redirect to='/' />} />
          <Redirect from='/' to={role ? `/${role.toLowerCase()}` : '/'} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;