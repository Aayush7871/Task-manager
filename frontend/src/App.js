import React from 'react';
import Header from './components/Main/Header';
import Task from './components/Main/Task';
import './App.css';
import Login from './components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Home from './components/Home';
import { useState } from 'react';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/tasks" element={<Task />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
