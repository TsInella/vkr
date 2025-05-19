import React from 'react'
import {useAuth} from "../../contexts/AuthContext";

const CreateTemplate: React.FC = () =>{
   const { user } = useAuth();

   return (
       <div>
          <h1>Создание шаблона документа</h1>
          {user?.role === 'admin' && <CreateTemplate />}
       </div>
   );
}
export default CreateTemplate;