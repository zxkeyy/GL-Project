import React, { useState } from 'react';

const inputStyle = {
  height: '54px',
  width: '100%',
  borderWidth: '1.5px',
  borderColor: '#191A1057',
  borderRadius: '5px',
  marginTop: '5px'
}

interface SignupFormState {
  name: string;
  surname: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState<SignupFormState>({
    name: '',
    surname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    alert('Form submitted successfully!');
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '100%', margin: 'auto' }}>
      <div style={{ display: 'flex', gap: '10px', marginTop: '5px'}}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ ...inputStyle, flex: 1 }}
        />
        <input
          type="text"
          name="surname"
          placeholder="Surname"
          value={formData.surname}
          onChange={handleChange}
          required
          style={{  ...inputStyle, flex: 1 }}
        />
      </div>
      <div style={ {marginTop: '5px'} }>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          style={ inputStyle}
        />
      </div>
      <div style={{ marginTop: '5px' }}>
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          style={inputStyle}
        />
      </div>
      <div style={{ marginTop: '5px' }}>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={inputStyle}
        />
      </div>
      <div style={{ marginTop: '5px' }}>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          style={inputStyle}
        />
      </div>
      <div style={{ marginTop: '20px', textAlign: 'center', width: '100%' }}>
        <button type="submit" style={{ width: '100%' , marginTop: '15px', borderRadius: '10px', backgroundColor: '#191A10',
          color: 'white'
        }}>
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
