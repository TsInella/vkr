import React from 'react';
//import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MainPage from './pages/MainPage';
import Account from './pages/Account';
import RequestPage from './pages/RequestPage';
import Auth from './pages/Auth';
import Registration from './pages/Registration';
import {NavLink} from "react-router"


//const App: React.FC = () =>  {
const App: React.FC = () =>  {
  return (
    <Header/>
  );
}

export default App;
