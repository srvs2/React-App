import React from 'react'

function Navigation() {
  const Username = sessionStorage.getItem('email');
  const password = sessionStorage.getItem('password');
  const username = sessionStorage.getItem('usename');

  const handleLogout = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    window.location.href = "/";
  }
  return (
    <>

      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">WebApp</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/home">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/User">Users</a>
            </li>
          </ul>
        </div>
        <div className="col-md-3">
          <span style={{fontWeight:"bold",color:"green"}}>Welcome: {username}  </span>
          {Username && password ?
            <button className="btn btn-primary" onClick={handleLogout}> Logout</button> : ''}
        </div>
      </nav>
    </>
  )
}
export default Navigation;