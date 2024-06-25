import React, { useState, useEffect } from 'react';
import Navigation from '../Navigation';
import Footer from '../Footer';
import Modal from 'react-modal';

export const User = () => {
  const [userdata, setData] = useState(null);
  const [editableRows, setEditableRows] = useState({});

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true)
  }

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false)
  }


  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost/api/users');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const closeInput = (e, id) => {
    e.preventDefault();
    setEditableRows((prevRows) => ({ ...prevRows, [id]: false }));
  };

  const updateData = (e, id) => {
    e.preventDefault();
    setEditableRows((prevRows) => ({ ...prevRows, [id]: true }));

  };

  const handleNameChange = async (e, index) => {
    const updatedData = [...userdata.data];
    updatedData[index].user_name = e.target.value;
    setData({ ...userdata, data: updatedData });
  };


  const handleEmailChange = (e, index) => {
    const updatedData = [...userdata.data];
    updatedData[index].user_email = e.target.value;
    setData({ ...userdata, data: updatedData });
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',

    }
  };

  const handlUpdate = async (e) => {
    e.preventDefault();
    try {
      // Assuming your update API endpoint is something like 'http://localhost/api/update'
      const response = await fetch('http://localhost/api/update', {
        method: 'POST', // Use the appropriate HTTP method (POST, PUT, etc.)
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH"
        },
        mode: 'no-cors',
        body: JSON.stringify(userdata), // Send the updated data
      });

      if (response.ok) {
        console.log('Data updated successfully!');
        console.log(userdata);
      } else {
        console.error('Error updating data:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }



  return (
    <>
      <Navigation />
      <div className="container">
        <div className="row">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {userdata &&
                userdata.data.map((item, i) => (
                  <tr key={i}>
                    <th scope="row">{i}</th>
                    <td>
                      {editableRows[i] ? (
                        <input
                          type="text"
                          value={item.user_name}
                          onChange={(e) => handleNameChange(e, i)}
                        />
                      ) : (
                        item.user_name
                      )}
                    </td>
                    <td>
                      {editableRows[i] ? (
                        <input
                          type="text"
                          value={item.user_email}
                          onChange={(e) => handleEmailChange(e, i)}
                        />
                      ) : (
                        item.user_email
                      )}
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={setModalIsOpenToTrue}
                        className="btn btn-sm btn-primary"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={(e) => closeInput(e, i)}
                        className="btn btn-sm ms-1 btn-primary"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <Modal isOpen={modalIsOpen} style={customStyles}>
            <button onClick={setModalIsOpenToFalse}>X</button>
            <form>
              {userdata &&
                userdata.data.map((item, i) => (
                  <div data-mdb-input-init class="form-outline mb-4">
                    <label class="form-label" for="form1Example2">Email</label>
                    <input
                      type="text"
                      value={item.user_name}
                      onChange={(e) => handleNameChange(e, i)}
                    />
                  </div>
                ))}

              <button data-mdb-ripple-init type="submit" class="btn btn-primary btn-block" onClick={handlUpdate}>Update</button>
            </form>
          </Modal>
          {/* <button onClick={setModalIsOpenToTrue}>Click to Open Modal</button> */}

        </div>
      </div>
      <Footer />
    </>
  )
}
export default User;
