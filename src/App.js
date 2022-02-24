import './App.css';
import Home from './Home';
import Employee from './Employee';
import Department from './Department';
import Navigation from './Navigation';

import {Browser, BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    
      <BrowserRouter> <Navigation/>
      <div>
        
        <Routes >
          <Route path='/' element={<Home />} exact/>
          <Route path='/employee' element={<Employee/>}/>
          <Route path='/department' element={<Department/>}/>
        </Routes >
      </div>
      </BrowserRouter>
    
  );
}

export default App;
