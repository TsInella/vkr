import React from "react";
import Layout  from "antd";
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import {NavLink} from "react-router";
import MainPage from "../pages/MainPage";
import RequestPage from "../pages/RequestPage";
import Account from "../pages/Account";
import Auth from "../pages/Auth";
import Registration from "../pages/Registration";
import styles from "./Header.module.scss";
import NewRequest from "../pages/NewRequest";
import PersonRequest from "../pages/PersonRequest";
import TransportRequest from "../pages/TransportRequest";
import MaterialRequest from "../pages/MaterialRequest";

//сначала нужно сделать backend

const Header: React.FC = () => {
    return(
        <Router>
            <header className={styles.header}>
                {/* Логотип слева */}
                <div className={styles.logo}>LOGO</div>

                {/* Меню по центру */}
                <nav className={styles.nav}>
                    <NavLink to="/" className={({ isActive}) => ( isActive? styles.active : styles.link )} >
                        Главная
                    </NavLink>
                    <NavLink to="/request" className={({isActive}) => isActive? styles.active : styles.link}>
                        Мои заявки
                    </NavLink>
                    <NavLink to="/account" className={({isActive}) => isActive ? styles.active : styles.link}>
                        Личный кабинет
                    </NavLink>
                </nav>

                {/* Вход и Регистрация справа */}
                <div className={styles.authLinks}>
                    <NavLink to="/auth" className={({isActive}) => (isActive ? styles.active :styles.authLink)} >
                        Вход
                    </NavLink>
                    <NavLink to="/reg" className={({isActive}) => (isActive ? styles.active : styles.authLink)}>
                        Регистрация
                    </NavLink>
                </div>
            </header>

            <main className={styles.main}>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/request" element={<RequestPage />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/reg" element={<Registration />} />
                    <Route path="/newrequest" element={<NewRequest />} />
                    <Route path="/person" element={<PersonRequest />} />
                    <Route path="/transport" element={<TransportRequest />} />
                    <Route path="/material" element={<MaterialRequest />} />
                </Routes>
            </main>
        </Router>

    );
}

export default Header;