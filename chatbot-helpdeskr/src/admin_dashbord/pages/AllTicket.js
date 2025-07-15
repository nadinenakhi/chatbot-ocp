import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';

function AllTicket() {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/all-tickets', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTickets(res.data);
      } catch (err) {
        console.error('Erreur lors du chargement des tickets :', err);
      }
    };

    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter(ticket =>
    ticket?.urgence?.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter === '' || ticket?.statut?.toLowerCase() === statusFilter.toLowerCase())
  );

  return (
    <div className="container-fluid p-4" style={{ backgroundColor: 'white', minHeight: '100vh' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2><span style={{ color: 'green' }}>🎫</span> All Tickets</h2>
      </div>

      <div className="d-flex mb-3 gap-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search by urgency..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="form-select w-25"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="open">Open</option>
          <option value="regler">Closed</option>
          <option value="en_attente">En attente</option>
        </select>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Status</th>
              <th>Urgency</th>
              <th>Type</th>
              <th>Service</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.length > 0 ? (
              filteredTickets.map(ticket => (
                <tr key={ticket.id}>
                  <td>{ticket.id}</td>
                  <td>
                    <span className="badge bg-success text-capitalize">{ticket.statut}</span>
                  </td>
                  <td>
                    <span className={`badge bg-${
                      ticket.urgence === 'élevée' ? 'danger' :
                      ticket.urgence === 'normal' ? 'warning' : 'secondary'
                    } text-capitalize`}>
                      {ticket.urgence}
                    </span>
                  </td>
                  <td>{ticket.type}</td>
                  <td>{ticket.service}</td>
                  <td>{new Date(ticket.created_at).toLocaleDateString()}</td>
                  
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-muted py-4">No tickets found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllTicket;
