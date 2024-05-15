import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SignupForm from './components/SignupForm';
import BillForm from './components/BillForm';
import LoginForm from './components/LoginForm';
import UserDetails from './components/UserDetails';
import BillList from './components/BillList';
import MessageList from './components/MessageList';
import Navbar from './components/Navbar';

function App() {
  return (
    
    <Router>
           <div className="App">
        <Navbar />
        <div className="content" style={{ paddingTop: '4rem' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/create-bill" element={<BillForm />} />
            <Route path="/user-details" element={<UserDetails />} />
            <Route path="/bills" element={<BillList />} />
            <Route path="/messages" element={<MessageList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="home-container" >
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h1>Welcome to the Laserna Real Estate Management App</h1>
      <p>Your all-in-one solution for managing your real estate!</p>
      
      <div className="features">
        <div className="feature">
          <h2>Signup</h2>
          <p>Create a new account to get started.</p>
          <Link to="/signup">
            <button className="feature-btn">Sign Up</button>
          </Link>
        </div>
        <div className="feature">
          <h2>Login</h2>
          <p>Access your account and manage your activities.</p>
          <Link to="/login">
            <button className="feature-btn">Login</button>
          </Link>
        </div>
        <div className="feature">
          <h2>Create Bill</h2>
          <p>Generate new bills and manage payments efficiently.</p>
          <Link to="/create-bill">
            <button className="feature-btn">Create Bill</button>
          </Link>
        </div>
        <div className="feature">
          <h2>User Details</h2>
          <p>View and update your user details.</p>
          <Link to="/user-details">
            <button className="feature-btn">User Details</button>
          </Link>
        </div>
        <div className="feature">
          <h2>View Bills</h2>
          <p>Check your bill statuses and payment references.</p>
          <Link to="/bills">
            <button className="feature-btn">View Bills</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
function SignupPage() {
  return (
    <>
      <h1>Sign Up Page</h1>
      <SignupForm />
    </>
  );
}

function LoginPage() {
  return (
    <>
      <h1>Login Page</h1>
      <LoginForm />
    </>
  );
}

export default App;
