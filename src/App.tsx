import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import Account from "./pages/Account";
import RequestPage from "./pages/RequestPage";
import Auth from "./pages/authreg/Auth";
import Registration from "./pages/authreg/Registration";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import CreateTemplate from "./pages/adminPages/CreateTemplate";
import NewRequest from "./pages/NewRequest";
import PersonRequest from "./pages/PersonRequest";
import TransportRequest from "./pages/TransportRequest";
import MaterialRequest from "./pages/MaterialRequest";
import GeneratePass from "./pages/adminPages/GeneratePass";
import TablePass from "./pages/adminPages/TablePass";
import TableRequest from "./pages/adminPages/TableRequest";
import styles from "./components/Header.module.scss";
import logo from "./assets/shipping.png";
import { NavLink } from "react-router";
import UsersTable from "./pages/adminPages/UsersTable";
import UserCreatePage from "./pages/adminPages/UserCreatePage";
import NotFoundPage from "./pages/NotFoundPage";
import { ConfigProvider } from "antd";
import { Templates } from "./pages/templates";

const App: React.FC = () => {
  return (
    <ConfigProvider>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/reg" element={<Registration />} />
            <Route path="/account" element={<Account />} />
            <Route path="/newrequest" element={<NewRequest />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/person" element={<PersonRequest />} />
            <Route path="/transport" element={<TransportRequest />} />
            <Route path="/material" element={<MaterialRequest />} />
            <Route path="/request" element={<RequestPage />} /> // //таблица с
            заявками (для клиента)
            <Route path="/createtemplate" element={<CreateTemplate />} />{" "}
            //страница создание шаблона
            <Route path="/generate" element={<GeneratePass />} /> //генерация qr
            кода
            <Route path="/pass" element={<TablePass />} /> //таблица пропусков
            (для админа)
            <Route path="/adminrequest" element={<TableRequest />} /> //таблица
            с заявками (для админа)
            <Route path="/userstable" element={<UsersTable />} /> //таблица
            пользователей (для админа)
            <Route path="/usercreate" element={<UserCreatePage />} /> //страница
            создания пользователя (для админа)
            <Route path="/notfound" element={<NotFoundPage />} />
            {/* Общие защищенные маршруты */}
            <Route
              element={<ProtectedRoute allowedRoles={["client"]} />}
            ></Route>
            {/* Только для клиентов */}
            <Route
              element={<ProtectedRoute allowedRoles={["client"]} />}
            ></Route>
            {/* Только для админов */}
            <Route
              element={<ProtectedRoute allowedRoles={["admin", "client"]} />}
            ></Route>
          </Routes>
        </AuthProvider>
      </Router>
    </ConfigProvider>
  );
};

export default App;
