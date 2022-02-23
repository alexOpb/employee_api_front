import './App.css';
import Home from './Home';
import Employee from './Employee';
import Department from './Department';
import Navigation from './Navigation';

import {Browser, BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    
      <BrowserRouter>
      <div>
        <Navigation/>
        <Routes >
          <Route path='/' component={Home} exact/>
          <Route path='/employee' component={Employee}/>
          <Route path='/department' component={Department}/>
        </Routes >
      </div>
      </BrowserRouter>
    
  );
}

export default App;
