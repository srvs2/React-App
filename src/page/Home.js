import React, { useState, useEffect } from 'react'
import data from "../common/data.json";
import Navigation from '../Navigation';
import Footer from '../Footer';
// import Accordion from './react-bootstrap/Accordion';
import Accordion from 'react-bootstrap/Accordion'
function Home() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");


  return (
    <>
    <Navigation />
      <div className="container">
        <div className="row">
          
          <h1>Home</h1>
          <form>
            <label>Country</label>
            <select value={selectedCountry} class="form-select" aria-label="Default select example" onChange={(e) => setSelectedCountry(e.target.value)}>
              <option selected>Select</option>
              {data.countries.map(list => (
                <option value={list.code}>{list.name}</option>
              ))}
            </select>
            <label>State</label>
            <select class="form-select" aria-label="Default select example" value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
              <option value="" disabled>Select State</option>
              {data.states.filter((state) => state.country_code === selectedCountry).map((state, index) => (
                <option key={index} value={state.code}>
                  {state.name}
                </option>
              ))}
            </select>
            <label>City</label>
            <select class="form-select" aria-label="Default select example" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
              <option value="" disabled>Select City</option>
              {data.cities.filter((city) => city.state_code === selectedState).map((city, index) => (
                <option key={index} value={city.state_code}>
                  {city.name}
                </option>
              ))}
            </select>
          </form>
          <div className="Container">
            <ul>
              <li>
                <h5>Seleted Country</h5>
                {data.countries.map(list => (
                  <div>

                    {list.code == selectedCountry ? list.name : ''}
                  </div>
                ))}
              </li>
              <li>
                <h5>Seleted state</h5>
                {data.states.map(list => (
                  <div>

                    {list.code == selectedState ? list.name : ''}
                  </div>
                ))}
              </li>
              <li>
                <h5>Seleted City</h5>
                {data.cities.map(list => (
                  <div>

                    {list.state_code == selectedCity ? list.name : ''}
                  </div>
                ))}
              </li>
            </ul>
          </div>

          <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Accordion Item #1</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Accordion Item #2</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
          
        </div>

      </div>
      <Footer/>
    </>
  )
}
export default Home;
