import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
  return <h1>Welcome to the Home Page</h1>;
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
