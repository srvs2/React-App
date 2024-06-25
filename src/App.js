import React from 'react';
import { BrowserRouter,Route,Routes} from 'react-router-dom';
import Login  from './login/Login';
import Register  from './register/Register';
import Home from './page/Home';
import Navigation from './Navigation';
import User from './page/User';

import './App.css';

function App() {
  const Username=sessionStorage.getItem("email");
  const password=sessionStorage.getItem("password");
  return (
    <BrowserRouter>
     <Routes>
       <Route exact path="/" element={<Login/>}></Route>
       <Route exact path="/Register" element={<Register/>}></Route>
        <Route exact path={Username&&password?"/Home":''} element={Username&&password ?<Home/>:''}></Route>
        <Route exact path={Username&&password?"/Navigation":''} element={Username&&password ?<Navigation/>:''}></Route>
        <Route exact path={Username&&password?"/User":''} element={Username&&password ?<User/>:''}></Route>
     </Routes>
    </BrowserRouter>
  );
}

export default App;
