import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Passenger from './Passenger';
import { useAuth } from '../Context/AuthContext';


export default function Profile() {

  const [clickedRow, setClickedRow] = useState(null);
  const [profile, setProfile] = useState([]);
  const customerId = localStorage.getItem('customerId');
  const navigate = useNavigate();


  const [editing, setEditing] = useState(false);
  const [editing1, setEditing1] = useState(false);
  const [editing2, setEditing2] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ ...profile });

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');



  const [travellers, setTravellers] = useState([]);

  const [isAddingTraveller, setIsAddingTraveller] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);

  const [formData, setFormData] = useState({
    customer_id: 1,
    additional_name: '',
  });

  const handleEdit2 = () => {
    setEditing2(true);
  };

  const handleSave2 = async () => {
    try {
      // Make the API call to change the password
      const response = await axios.put(`https://localhost:7258/api/Profile/ChangePass/${customerId}`, {
        oldPassword: oldPassword,
        newPassword: newPassword,
      });
  
      setEditing2(false);
      setOldPassword('');
      setNewPassword('');
  
      console.log('Password changed successfully:', response.data);
    } catch (error) {
      console.error('Error changing password:', error.response);
    }
  };

  const handleCancel2 = () => {
    setEditing2(false);
    setOldPassword('');
    setNewPassword('');
  };

  const handleChange2 = (event) => {
    const { name, value } = event.target;
    if (name === 'oldPassword') {
      setOldPassword(value);
    } else if (name === 'newPassword') {
      setNewPassword(value);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex >= 0) {
      axios.put(`https://localhost:7259/api/Additional/${travellers[editIndex].additional_id}`, formData)
        .then((response) => {
          setTravellers((prevTravellers) => {
            const updatedTravellers = [...prevTravellers];
            updatedTravellers[editIndex] = response.data;
            return updatedTravellers;
          });
          setEditIndex(-1);
          setIsAddingTraveller(false);
          setFormData({
            customer_id: 0,
            additional_name: '',
          });
        })
        .catch((error) => {
          console.error('Error updating traveler:', error);
        });
    } else {
      axios.post('https://localhost:7259/api/Additional', formData)
        .then((response) => {
          setTravellers((prevTravellers) => [...prevTravellers, response.data]);
          setIsAddingTraveller(false);
          setFormData({
            customer_id: 1,
            additional_name: '',
          });
        })
        .catch((error) => {
          console.error('Error adding traveler:', error);
        });
    }
  };

  const handleEditA = (index) => {
    setFormData(travellers[index]);
    setEditIndex(index);
    setIsAddingTraveller(true);
  };


    const { logout } = useAuth();
  
    const handleLogout = () => {
      logout();
    };



  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleEdit = () => {
    setEditedProfile({ ...profile }); 
    setEditing(true);
  };

  const handleEdit1 = () => {
    setEditedProfile({ ...profile }); 
    setEditing1(true);
  };



  const handleSave = () => {
    setEditing(false);
       axios.put(`https://localhost:7258/api/Profile/profile_dto/${customerId}`, editedProfile)
        .then(response => {
          console.log('Profile updated successfully!', response.data);
          setProfile(editedProfile);
        })
        .catch(error => {
          console.error('Error updating profile:', error);
        });
  };

  const handleSave1 = () => {
    setEditing1(false);
       axios.put(`https://localhost:7258/api/Profile/login_dto/${customerId}`, editedProfile)
        .then(response => {
          console.log('Profile updated successfully!', response.data);
          setProfile(editedProfile)
        })
        .catch(error => {
          console.error('Error updating profile:', error);
        });
  };

  const handleCancel = () => {
    setEditing(false);
    setEditedProfile({ ...profile });
  };

  const handleCancel1 = () => {
    setEditing1(false);
    setEditedProfile({ ...profile });
  };


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };


  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`https://localhost:7258/api/Profile/filter/${customerId}`);
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  

  const calculateProfileCompletion = () => {
    const { name, dob, gender, marital_status } = profile;
    const totalFields = 4;
    let filledFields = 0;
  
    if (name !== null && name !== undefined && name.trim() !== '') filledFields++;
    if (dob !== null && dob !== undefined && dob.trim() !== '') filledFields++;
    if (gender !== null && gender !== undefined && gender.trim() !== '') filledFields++;
    if (marital_status !== null && marital_status !== undefined && marital_status.trim() !== '') filledFields++;
  
    return (filledFields / totalFields) * 100;
  };

  const calculateProfileImageCompletion = () => {
    const { image } = profile;
    const totalFields = 1;
    let filledFields = 0;
  
    if (image !== null && image !== undefined && image.trim() !== '') filledFields++;
 
    return (filledFields / totalFields) * 100;
  };

  const calculateLoginDetailsCompletion = () => {
    const { mobile_number, email_id } = profile;
    const totalFields = 2;
    let filledFields = 0;

    if (mobile_number !== null && mobile_number !== undefined && mobile_number.toString().trim() !== '') filledFields++;
    if (email_id !== null && email_id !== undefined && email_id.trim() !== '') filledFields++;

    return (filledFields / totalFields) * 100;
  };

  const calculateOverallCompletion = () => {
    const profileCompletion = calculateProfileCompletion();
    const loginDetailsCompletion = calculateLoginDetailsCompletion();
    const profileImageCompletion = calculateProfileImageCompletion();

    const overallCompletion = (0.6 * profileCompletion) + (0.1 * profileImageCompletion) + (0.3 * loginDetailsCompletion);
    return overallCompletion;
  };
  const overallCompletion = calculateOverallCompletion();

  const handleRowClick = (index) => {
    setClickedRow(index);
    scrollToSection(`section-${index}`);
  };


  if (profile === null) {
    return <div>Loading...</div>;
  }

  let filledField = 0;
  if (profile.image !== null && profile.image !== undefined && profile.image.trim() !== '') {
    filledField++;
  }

  function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div className="container">
      <nav aria-label="breadcrumb" className='ms-md-5 mt-5'>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/Passenger" style={{ textDecoration: 'none', color:'black' }}><strong>My Account</strong></Link>
        </li>
        <li className="active ml-2" aria-current="page"> &gt;
        <Link to="/Profile" style={{ textDecoration: 'none', color:'black' }}><strong>My Profile</strong></Link>
        </li>
      </ol>
    </nav>
      <div className="row mt-5">
      <div className="col-md-3 ms-md-5 mb-3">
  <div className="card">
    <div className="d-flex justify-content-center align-items-center mt-3 position-relative">
      <div className="position-absolute d-flex justify-content-center align-items-center card-img" style={{ width: '40px', height: '40px', backgroundColor: 'orange', borderRadius: '50%',border: '2px solid white', marginLeft:'120px',marginTop:'70px' }}>
        <button type="button" className="btn btn-link" style={{ backgroundColor: 'transparent', border: 'none', padding: '0' }}>
          <i className="bi bi-pencil" style={{ fontSize: '1.5rem', color: 'white' }} />
        </button>
      </div>
      {filledField > 0 ? (
      <img src={`/Img/${profile.image}`}  className="card-img-top rounded-circle img-fluid img-thumbnail"  alt="Profile" style={{ width: '150px', height: '150px' }} />
      ) : (
      <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"  className="card-img-top rounded-circle img-fluid img-thumbnail"  alt="Profile" style={{ width: '150px', height: '150px' }} />
      )}
      </div>

    <div className="card-body text-center">
  <div className="d-flex flex-column align-items-center justify-content-center">
    <b>{profile.name}</b>
    <p className="text-muted">Personal Profile</p>
  </div>

  <div className="table-responsive">
  <table className="table mx-auto">
    <tbody>
      <tr onClick={() => {
              handleRowClick(0);
              scrollToSection("profile");
            }}
            className={clickedRow === 0 ? 'highlighted' : ''}>
        <td className="text-center">
          <div className="d-flex align-items-center justify-content-center">
            <i className="bi bi-person"/>
            <span className={`ms-2 btn ${clickedRow === 0 ? 'highlighted' : ''}`}>Profile</span>
          </div>
        </td>
      </tr>
      <tr 
      onClick={() => {
        handleRowClick(1);
        scrollToSection("loginDetails");
      }}
      className={clickedRow === 1 ? 'highlighted' : ''}>
        <td className="text-center">
          <div className="d-flex align-items-center justify-content-center">
            <i className="bi bi-arrow-left" />
            <span className={`ms-2 btn ${clickedRow === 1 ? 'highlighted' : ''}`}>Login Details</span>
          </div>
        </td>
      </tr>
      <tr onClick={() => {
        handleRowClick(2);
        scrollToSection("travellers");
      }}>
        <td className="text-center">
          <div className="d-flex align-items-center justify-content-center">
            <i className="bi bi-people-fill" />
            <span className={`ms-2 btn ${clickedRow === 2 ? 'highlighted' : ''}`}>Travellers</span>
          </div>
        </td>
      </tr>
      <tr onClick={() => {navigate('/Loc')
      }}>
        <td className="text-center">
          <div className="d-flex align-items-center justify-content-center">
            <i className="bi bi-people-fill" />
            <span className={`ms-2 btn`}>Book Packages</span>
          </div>
        </td>
      </tr>
      <tr>
        <td className="text-center">
          <div className="d-flex align-items-center justify-content-center">
            <i className="bi bi-box-arrow-right" />
            <span className="ms-2 btn" onClick={handleLogout}>Logout</span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</div>
  </div>
</div>
        <div className="col-md-8">
          <div className="card mb-3">
            <div className="card-body">
              <p>Your profile is complete {overallCompletion}%</p>
              <div className="progress rounded mb-2" style={{ height: '5px' }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${overallCompletion}%`,
                  backgroundColor: '#31B79C', }}
                  aria-valuenow={overallCompletion}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              {overallCompletion === 100 ? (
              <small>
                <p className="mt-2"><span className="text-muted">Congrats! Your profile details are up to date!</span></p>
              </small>
              ) : (
                <small>
                <p className="mt-2"><span className="text-muted">Your profile details are not up to date! Please complete...</span></p>
              </small>
              )}
              <img src="svg/upd.svg" className="w-100" alt="Update" />
            </div>
          </div>

          <div className="card mb-3" id="profile">
      <div className="card-body p-3">
        {!editing && (
          <button
            type="button"
            className="btn float-end mt-2"
            style={{ borderColor: '#EC772F', color: '#EC772F' }}
            onClick={handleEdit}
          >
            <i className="bi bi-pencil" /> Edit
          </button>
        )}
        {editing ? (
          <div>
            <button
              type="button"
              className="btn float-end mt-2 me-2"
              style={{ borderColor: '#5CB85C', color: '#5CB85C' }}
              onClick={handleSave}
            >
              <i className="bi bi-check" /> Save
            </button>
            <button
              type="button"
              className="btn float-end mt-2"
              style={{ borderColor: '#d9534f', color: '#d9534f' }}
              onClick={handleCancel}
            >
              <i className="bi bi-x" /> Cancel
            </button>
          </div>
        ) : null}
        <b>Profile</b>
        <p className="pb-2">
          <span className="text-muted">Basic info for a faster booking experience</span>
        </p>
        <div className="row">
          <div className="col-md-4">
            <p className="mb-0">Name</p>
          </div>
          <div className="col-md-8">
            {editing ? (
              <input
                type="text"
                name="name"
                value={editedProfile.name}
                onChange={handleChange}
                className="form-control"
              />
            ) : (
              <p className="mb-0">
                <strong>{profile.name}</strong>
              </p>
            )}
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-4">
            <p className="mb-0">Birthday</p>
          </div>
          <div className="col-md-8">
            {editing ? (
              <input
                type="date"
                name="dob"
                value={editedProfile.dob}
                onChange={handleChange}
                className="form-control"
              />
            ) : (
              <p className="mb-0">
                <strong>{formatDate(profile.dob)}</strong>
              </p>
            )}
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-4">
            <p className="mb-0">Gender</p>
          </div>
          <div className="col-md-8">
            {editing ? (
              <input
                type="text"
                name="gender"
                value={editedProfile.gender}
                onChange={handleChange}
                className="form-control"
              />
            ) : (
              <p className="mb-0">
                <strong>{profile.gender}</strong>
              </p>
            )}
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-4">
            <p className="mb-0">Marital Status</p>
          </div>
          <div className="col-md-8">
            {editing ? (
              <input
                type="text"
                name="marital_status"
                value={editedProfile.marital_status}
                onChange={handleChange}
                className="form-control"
              />
            ) : (
              <p className="mb-0">
                <strong>{profile.marital_status}</strong>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>

    <div className="card mb-3" id="loginDetails">
      <div className="card-body p-3">
        {!editing1 && (
          <button
            type="button"
            className="btn float-end mt-2"
            style={{ borderColor: '#EC772F', color: '#EC772F' }}
            onClick={handleEdit1}
          >
            <i className="bi bi-pencil" /> Edit
          </button>
        )}
        {editing1 ? (
          <div>
            <button
              type="button"
              className="btn float-end mt-2 me-2"
              style={{ borderColor: '#5CB85C', color: '#5CB85C' }}
              onClick={handleSave1}
            >
              <i className="bi bi-check" /> Save
            </button>
            <button
              type="button"
              className="btn float-end mt-2"
              style={{ borderColor: '#d9534f', color: '#d9534f' }}
              onClick={handleCancel1}
            >
              <i className="bi bi-x" /> Cancel
            </button>
          </div>
        ) : null}
        <b>Login Details</b>
        <p className="pb-2">
          <span className="text-muted">Manage your email address, mobile number, and password</span>
        </p>
        <div className="row">
          <div className="col-md-4">
            <p className="mb-0">MOBILE NUMBER</p>
          </div>
          <div className="col-md-8">
            {editing1 ? (
              <input
                type="text"
                name="mobile_number"
                value={editedProfile.mobile_number}
                onChange={handleChange1}
                className="form-control"
              />
            ) : (
              <p className="mb-0">
                <strong>+91-{profile.mobile_number}</strong>
              </p>
            )}
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-4">
            <p className="mb-0">EMAIL ID</p>
          </div>
          <div className="col-md-8">
            {editing1 ? (
              <input
                type="text"
                name="email_id"
                value={editedProfile.email_id}
                onChange={handleChange1}
                className="form-control"
              />
            ) : (
              <p className="mb-0">
                <strong>{profile.email_id}</strong>
              </p>
            )}
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-4">
            <p className="mb-0">Password</p>
          </div>
          <div className="col-md-8">
            <p className="mb-0">
              <strong>***************</strong>
            </p>
          </div>
        </div>
        <div className="text-end">
          {editing2 ? (
            <>
              <input
                type="password"
                name="oldPassword"
                value={oldPassword}
                onChange={handleChange2}
                placeholder="Old Password"
                className="form-control"
              />
              <input
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={handleChange2}
                placeholder="New Password"
                className="form-control"
              />
              <button
                type="button"
                className="btn float-end mt-2 me-2"
                style={{ borderColor: '#5CB85C', color: '#5CB85C' }}
                onClick={handleSave2}
              >
                <i className="bi bi-check" /> Save
              </button>
              <button
                type="button"
                className="btn float-end mt-2"
                style={{ borderColor: '#d9534f', color: '#d9534f' }}
                onClick={handleCancel2}
              >
                <i className="bi bi-x" /> Cancel
              </button>
            </>
          ) : (
            <a
              style={{ color: '#EC772F', textDecoration: 'none' }}
              onClick={handleEdit2}
            >
              Change password?
            </a>
          )}
        </div>
      </div>
    </div>
        </div>
      </div>
    </div>
  );
}
