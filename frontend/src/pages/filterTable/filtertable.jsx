import { useState, useEffect } from 'react';
import './filtertable.css'

const Filtertable = () => {
  const [filters, setFilters] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from a backend API (mocked as an example)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:9000/api/getusers'); // Replace with your backend URL
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle filter input changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Filter data based on current filters
  const filteredData = data.filter((row) =>
    Object.keys(filters).every((key) =>
      row[key].toString().toLowerCase().includes(filters[key].toLowerCase())
    )
  );

  return (
    <div className="container mt-5">
      <h2>Registration Data</h2>

      {loading && <p>Loading...</p>}

      {/* Filters */}
      <div className="row mb-3">
        {['name', 'email', 'phone', 'address', 'city'].map((field) => (
          <div className="col-md-2" key={field}>
            <input
              type="text"
              name={field}
              className="form-control"
              value={filters[field]}
              placeholder={`Filter by ${field.charAt(0).toUpperCase() + field.slice(1)}`}
              onChange={handleFilterChange}
            />
          </div>
        ))}
      </div>

      {/* Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((row, index) => (
              <tr key={index}>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.phone}</td>
                <td>{row.address}</td>
                <td>{row.city}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No matching data found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default  Filtertable;
