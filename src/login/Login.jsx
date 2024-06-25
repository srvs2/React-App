import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Home from '../page/Home'
const Login = () => {
  const[email, getUsername]=useState('');
  const[pass, getUserpass]=useState('');

  const [emailerr, setEmailErr] = useState('');
  const [passerr, setPassErr] = useState('');
  const [usermsg, setUserMessage] = useState('');
  const [delayDuration, setDelayDuration] = useState(1000);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost/api/login', {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
          "Accept": 'application/json'
        },
        cors: 'no-cors',
        body: JSON.stringify({ email,pass }),
      });

      if (response.ok) {
        const logindata = await response.json();
        console.log(logindata);
         if (logindata.data.code == 'empty_email') {
          setEmailErr(logindata.data.msg)
        }  else if (logindata.data.code == 'empty_password') {
          setPassErr(logindata.data.msg)
        }else if(email===logindata.data.email && pass===logindata.data.password){

          sessionStorage.setItem("email",logindata.data.email);
          sessionStorage.setItem("password",logindata.data.password);
          sessionStorage.setItem("usename",logindata.data.name);
          window.location.href='/Home';

        }else if(logindata.data.code==400){
          setPassErr(logindata.data.msg)
          // setTimeout(() => {
          //   setUserMessage('');
          // }, delayDuration);
          
        }
       
        //console.log(data.data.msg)
      }

    } catch (error) {
      console.log(error);
      console.error('An error occurred during registration:');

    }

  };
  return (
    <section className="">
  <div className="px-4 py-5 px-md-5 text-center text-lg-start" style={{backgroundColor: "hsl(0, 0%, 96%)"}}>
    <div className="container">
      <div className="row gx-lg-5 align-items-center">
        <div className="col-lg-6 mb-5 mb-lg-0">
          <h1 className="my-5 display-3 fw-bold ls-tight">
           WebApp
            <span className="text-primary"> Login </span>
          </h1>
          <p style={{color: "hsl(217, 10%, 50.8%)"}}>
           
          </p>
        </div>

        <div className="col-lg-6 mb-5 mb-lg-0">
          <div className="card">
            <div className="card-body py-5 px-md-5">
              <form onSubmit={handleSubmit} method="post">
               
                <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label" for="form3Example3">Email address</label>
                  <input type="email" value={email} id="form3Example3" onChange={(e)=>getUsername(e.target.value)} onKeyUp={(e) => setEmailErr('')}className="form-control" />
                  <span>{emailerr}</span>
                </div>

             
                <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label" for="form3Example4">Password</label>
                  <input type="password" value={pass} id="form3Example4" onChange={(e)=>getUserpass(e.target.value)} onKeyUp={(e) => setPassErr('')}className="form-control" />
                  <span>{passerr}</span>
                </div>
                <div class="err"><span>{usermsg}</span></div>
                <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4">
                  Login
                </button>
                <div class="text-center">
                  <p>Sign Up : <Link to="/Register" > Register </Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</section>
  )
}
export default Login;
