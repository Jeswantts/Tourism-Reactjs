// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import "./Navbar.css";

// function NavBar() {
//   const [click, setClick] = useState(false);

//   const handleClick = () => setClick(!click);
//   return (
//     <>
//       <nav className="navbar">
//         <div className="nav-container">
//           <NavLink exact to="/" className="nav-logo">
//             WeCare
//             <i className="fas fa-code"></i>
//           </NavLink>

//           <ul className={click ? "nav-menu active" : "nav-menu"}>
//             <li className="nav-item">
//               <NavLink
//                 exact
//                 to="/Home"
//                 activeClassName="active"
//                 className="nav-links"
//                 onClick={handleClick}
//               >
//                 Home
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink
//                 exact
//                 to="/LoginD"
//                 activeClassName="active"
//                 className="nav-links"
//                 onClick={handleClick}
//               >
//                 Doctors
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink
//                 exact
//                 to="/LoginRegP"
//                 activeClassName="active"
//                 className="nav-links"
//                 onClick={handleClick}
//               >
//                 Patients
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink
//                 exact
//                 to="/PatientView"
//                 activeClassName="active"
//                 className="nav-links"
//                 onClick={handleClick}
//               >
//                 Book Appointment
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink
//                 exact
//                 to="/Adminlog"
//                 activeClassName="active"
//                 className="nav-links"
//                 onClick={handleClick}
//               >
//                 Admin
//               </NavLink>
//             </li>

//             <div className='heart'></div>
//           </ul>
//           <div className="nav-icon" onClick={handleClick}>
//             <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// }

// export default NavBar;