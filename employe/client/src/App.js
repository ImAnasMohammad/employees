import logo from './logo.svg';
import './App.css';
import {Route, Routes} from 'react-router'
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Employees from './pages/Employees/Employees';
import CreateEmployee from './pages/CreateEmployee/CreateEmployee';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import Logout from './pages/Logout/Logout';

function App() {
  return (
      <Routes>
          <Route element={<PrivateRoute><Login/></PrivateRoute>} path='/login'/>
          <Route element={<PublicRoute/>} to="/">
            <Route element={<Logout/>} path='/logout'/>
            <Route element={<Dashboard/>} path='/'/>
            <Route element={<Employees/>} path='/employees'/>
            <Route element={<CreateEmployee/>} path='/save'/>
            <Route element={<CreateEmployee/>} path='/save/:id'/>
          </Route>
      </Routes>
  );
}

export default App;
