import React from "react";
import Layout, { Button } from "antd";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { NavLink } from "react-router";
import MainPage from "../pages/MainPage";
import RequestPage from "../pages/RequestPage";
import Account from "../pages/Account";
import Auth from "../pages/authreg/Auth";
import Registration from "../pages/authreg/Registration";
import styles from "./Header.module.scss";
import NewRequest from "../pages/NewRequest";
import PersonRequest from "../pages/PersonRequest";
import TransportRequest from "../pages/TransportRequest";
import MaterialRequest from "../pages/MaterialRequest";
import logo from "../assets/shipping.png";
import CreateTemplate from "../pages/adminPages/CreateTemplate";
import GeneratePass from "../pages/adminPages/GeneratePass";
import TablePass from "../pages/adminPages/TablePass";
import TableRequest from "../pages/adminPages/TableRequest";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";

const Header: React.FC = () => {
  const token = localStorage.getItem("token");
  const data = jwtDecode(token as string);

  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      {/* Логотип слева */}
      <Link to="/" className={styles.logoContainer}>
        <img src={logo} alt="Логотип компании" className={styles.logoImage} />
      </Link>
      {/* Меню по центру */}
      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          Главная
        </NavLink>
        {"role" in data && data.role === "admin" ? (
          <NavLink
            to="/userstable"
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            Пользователи
          </NavLink>
        ) : null}
        <NavLink
          to="/templates"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          Шаблоны документов
        </NavLink>
        <NavLink
          to="/request"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          Мои заявки
        </NavLink>
        <NavLink
          to="/newrequest"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          Создать заявку
        </NavLink>
        <NavLink
          to="/account"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          Личный кабинет
        </NavLink>
      </nav>

      {/* Вход и Регистрация справа */}
      {!token ? (
        <div className={styles.authLinks}>
          <NavLink
            to="/auth"
            className={({ isActive }) =>
              isActive ? styles.active : styles.authLink
            }
          >
            Вход
          </NavLink>
          <NavLink
            to="/reg"
            className={({ isActive }) =>
              isActive ? styles.active : styles.authLink
            }
          >
            Регистрация
          </NavLink>
        </div>
      ) : (
        <Button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
        >
          Выйти
        </Button>
      )}
    </header>
  );
};

export default Header;
