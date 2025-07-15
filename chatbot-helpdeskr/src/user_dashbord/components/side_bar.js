import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../img/logoOcp.png';
import { FiLogOut } from 'react-icons/fi';
import { useState } from 'react';

function Sidebar() {
  const storedUsername = localStorage.getItem('username') || 'User';
  const username = storedUsername.charAt(0).toUpperCase() + storedUsername.slice(1);
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <div
      className="d-flex flex-column justify-between p-3 text-dark border-end"
      style={{
        width: '220px',
        height: '100vh',
        position: 'fixed',
        backgroundColor: '#f8f9fa',
      }}
    >
      {/* Logo and Navigation */}
      <div>
        <div className="d-flex align-items-center mb-4 gap-2">
          <img src={logo} alt="OCP Logo" style={{ width: '30px', height: '30px' }} />
          <h4 className="mb-0">Helpdesk</h4>
        </div>

        <ul className="nav nav-pills flex-column mb-auto">

          <li>
            <Link to="myTicket" className="nav-link text-dark fw-medium">My tickets</Link>
          </li>

          <li>
            <Link to="add-ticket" className="nav-link text-dark fw-medium">Add Ticket</Link>
          </li>

          <li>
            <Link to="chatbot" className="nav-link text-dark fw-medium">Chatbot</Link>
          </li>
        </ul>
      </div>

      {/* User Info */}
      <div className="mt-auto position-relative border-top pt-3">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center text-dark fw-medium"
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#a1a3a2ff',
                fontSize: '14px',
              }}
            >
              {username.charAt(0)}
            </div>
            <span className="ms-2 fw-medium">{username}</span>
          </div>
          <button
            className="btn btn-sm ms-2"
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            <FiLogOut className="me-1" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
