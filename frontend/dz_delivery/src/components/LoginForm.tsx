
import React, { useState } from 'react';


const inputStyle = {
  height: '54px',
  width: '100%',
  borderWidth: '1.5px',
  borderColor: '#191A1057',
  borderRadius: '5px',
  marginTop: '5px'
}


interface LoginFormState {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormState>({
    email: '',
    password: '',
  });



  return (
    <form style={{ maxWidth: '100%', margin: 'auto' }}>
      <div style={{ marginTop: '10px' }}>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          required
          style={inputStyle}
        />
      </div>

      <div style={{ marginTop: '10px' }}>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          required
          style={inputStyle}
        />
      </div>

      <div style={{ marginTop: '20px', textAlign: 'center', width: '100%' }}>
        <button type="submit" style={{ width: '100%' , marginTop: '15px', borderRadius: '10px', backgroundColor: '#191A10',
          color: 'white'
        }}>
          Log in
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
