import logo from './logo.svg';
import './App.css';
import {Route, Routes} from 'react-router'
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Employees from './pages/Employees/Employees';
import CreateEmployee from './pages/CreateEmployee/CreateEmployee';

function App() {
  return (
      <Routes>
          <Route element={<Login/>} path='/login'/>
          <Route element={<Dashboard/>} path='/'/>
          <Route element={<Employees/>} path='/employees'/>
          <Route element={<CreateEmployee/>} path='/save'/>
          <Route element={<CreateEmployee/>} path='/save/:id'/>
      </Routes>
  );
}

export default App;
