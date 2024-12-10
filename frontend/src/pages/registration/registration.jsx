import { useState } from 'react';
import './registration.css';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    city: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errorMessages = {};
    if (!formData.name) errorMessages.name = 'Name is required';

    if (!formData.email.match(/^\S+@\S+\.\S+$/)) errorMessages.email = 'Invalid email';

    if (!formData.password || formData.password.length < 6) {
      errorMessages.password = 'Password must be at least 6 characters';
    }

    if (!formData.phone.match(/^\d+$/)) errorMessages.phone = 'Phone must be numeric';

    if (!formData.city) errorMessages.city = 'City is required';
    return errorMessages;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorMessages = validate();
    if (Object.keys(errorMessages).length > 0) {
      setErrors(errorMessages);
    } else {
      try {
        const response = await fetch('http://localhost:9000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
          console.log('Registration successful:', result);
          alert('Registration Successful!');
      
        } else {
          console.error('Registration failed:', result.message);
          alert(result.message || 'Registration failed');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        {errors.name && <span>{errors.name}</span>}
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        {errors.password && <span>{errors.password}</span>}
      </div>

      <div>
        <label>Phone:</label>
        <input
          type="text"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        {errors.phone && <span>{errors.phone}</span>}
      </div>

      <div>
        <label>Address:</label>
        <textarea
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        />
      </div>

      <div>
        <label>City:</label>
        <select
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
        >
          <option value="">Select City</option>
          <option value="Islamabad">Islamabad</option>
          <option value="Lahore">Lahore</option>
          <option value="Gilgit">Gilgit</option>
          <option value="Karachi">Karachi</option>
        </select>
        {errors.city && <span>{errors.city}</span>}
      </div>

      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationPage;
