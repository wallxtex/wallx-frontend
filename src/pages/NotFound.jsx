import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '70vh',
      textAlign: 'center',
      padding: '20px',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{ fontSize: '6rem', margin: '0', color: 'black', fontWeight: 'bold' }}>404</h1>
      <h2 style={{ fontSize: '2rem', marginTop: '10px', marginBottom: '20px', color: '#333' }}>Page does not exist</h2>
      <p style={{ marginBottom: '30px', color: '#666', maxWidth: '500px' }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" style={{
        padding: '12px 24px',
        backgroundColor: '#dc2626', // Theme based red
        color: 'white',
        textDecoration: 'none',
        borderRadius: '6px',
        fontWeight: 'bold',
        transition: 'background-color 0.3s'
      }}>
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
