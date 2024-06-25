import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
const Register = () => {

  //Variable to store the name, pass,email from input field
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPassword] = useState('');

  const [nameerr, setUserErr] = useState('');
  const [emailerr, setEmailErr] = useState('');
  const [passerr, setPassErr] = useState('');
  const [delayDuration, setDelayDuration] = useState(3000);
  const [usermsg, setUserMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // API endpoint for user registratio

    try {
      const response = await fetch('http://localhost/API/register', {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
          "Accept": 'application/json'
        },
        cors: 'no-cors',
        body: JSON.stringify({ name, email, pass }),
      });

      if (response.ok) {

        const data = await response.json();
        console.log(data);

        if (data.data.code == 'empty_name') {
          setUserErr(data.data.msg)
        } else if (data.data.code == 'empty_email') {
          setEmailErr(data.data.msg)
        } else if (data.data.code == 'invalid_email') {
          setEmailErr(data.data.msg)
        } else if (data.data.code == 'empty_password') {
          setPassErr(data.data.msg)
        } else if (data.data.code == 'data_exists') {
          setEmailErr(data.data.msg)
        } else if (data.data.code == 200) {
          setUserMessage(data.data.msg)
          setName('');
          setEmail('');
          setPassword('')
          setTimeout(() => {
            setUserMessage('');
          }, delayDuration);
        }

        console.log(data.data.msg)
      }

    } catch (error) {
      //console.log(error);
      console.error('An error occurred during registration:');

    }
  };
  return (
    <section className="">
      <div className="px-4 py-5 px-md-5 text-center text-lg-start" style={{ backgroundColor: "hsl(0, 0%, 96%)" }}>
        <div className="container">
          <div className="row gx-lg-5 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h1 className="my-5 display-3 fw-bold ls-tight">
                WebApp <br />
                <span className="text-primary">Registration</span>
              </h1>
              <p style={{ color: "hsl(217, 10%, 50.8%)" }}>

              </p>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="card">
                <div className="card-body py-5 px-md-5">
                  <form onSubmit={handleSubmit}>
                    <div className="row">

                      <div data-mdb-input-init className="form-outline mb-4">
                        <div data-mdb-input-init className="form-outline">
                          <label className="form-label" for="form3Example2">Name</label>
                          <input type="text" id="form3Example2" value={name} onChange={(e) => setName(e.target.value)} onKeyUp={(e) => setUserErr('')} className="form-control" />
                          <span style={{ color: "red" }}>{nameerr}</span>
                        </div>
                      </div>

                    </div>


                    <div data-mdb-input-init className="form-outline mb-4">
                      <label className="form-label" for="form3Example3">Email address</label>
                      <input type="email" id="form3Example3" value={email} onChange={(e) => setEmail(e.target.value)} onKeyUp={(e) => setEmailErr('')} className="form-control" />
                      <span style={{ color: "red" }}>{emailerr}</span>
                    </div>



                    <div data-mdb-input-init className="form-outline mb-4">
                      <label className="form-label" for="form3Example4">Password</label>
                      <input type="password" id="form3Example4" value={pass} onChange={(e) => setPassword(e.target.value)} onKeyUp={(e) => setPassErr('')} className="form-control" />
                      <span style={{ color: "red" }}>{passerr}</span>
                    </div>

                    <div className="submit-button">
                      <span style={{ color: "green" }}>{usermsg}</span>
                    </div>
                    <div className="btn" style={{ margin: "0 40px" }}>
                      <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4">Sign up </button>
                    </div>

                    <div class="text-center">
                      <span>Sign In : <Link to="/"> Login </Link></span>
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
export default Register;
