import React from "react";
import ReactDOMClient from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./screens/Login";
import { Register } from "./screens/Register";
import MainRoute from './MainRoute'; // Import the MainRoute component
import { ExportPasswd } from "./screens/ExportPasswd";
import { ImportPasswd } from "./screens/ImportPasswd";
import { Account } from "./screens/Account";
import { Transfer } from "./screens/Transfer";
import { QueryTable } from "./screens/QueryTable";
import { LockPage } from "./screens/LockPage";
import { Homepage } from "./screens/HomePage";
import { LanguageProvider } from './Language/LanguageProvider';

import {SessionProvider} from './useAuth';

import {LoginStatusProvider} from './loginAuth';

import {AddressProvider} from './Contexts/AddressContext';

import { BalanceProvider } from "./Contexts/BalanceContext";

import { GasValueProvider } from "./Contexts/GasValueContext";

import { GasBuyValueProvider } from "./Contexts/GasBugValueContext";

import { AccountProvider } from "./Contexts/AccountContext";

import { AlreadyAccountProvider } from "./Contexts/AlreadyAccount";

import { LeadingPage } from "./screens/LeadingPage/IphonePro";

import { RegisterSuccessful } from "./screens/RegisterSuccessful/IphonePro";
// import { LanguageProvider } from "./Language/LanguageProvider";

import { PasswordProvider } from "./Contexts/PasswordContext";

const app = document.getElementById("app");
const root = ReactDOMClient.createRoot(app);


// root.render(<IphonePro />);
root.render(
  
    
    <SessionProvider>
    
      
    <Router>
    <LoginStatusProvider>
      <AlreadyAccountProvider>
        <PasswordProvider>
    <AddressProvider>
      <BalanceProvider>
      <GasValueProvider>
      <GasBuyValueProvider>
        <AccountProvider>
          <LanguageProvider>
      <Routes>
        <Route path="/" element={<LeadingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/exportpasswd" element={<ExportPasswd />} />
        <Route path="/importpasswd" element={<ImportPasswd />} />
        <Route path="/account" element={<Account />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/querytable" element={<QueryTable />} />
        <Route path="/lockpage" element={<LockPage />} />
        <Route path="/Homepage" element={<Homepage />} />
        <Route path="/register_successful" element={<RegisterSuccessful />} />
        {/* Add more routes as needed */}
      </Routes>
      </LanguageProvider>
      </AccountProvider>
      </GasBuyValueProvider>
      </GasValueProvider>
      </BalanceProvider>
      </AddressProvider>
      </PasswordProvider>
      </AlreadyAccountProvider>
      </LoginStatusProvider>
      
    </Router>
    
      
    </SessionProvider>
    
  
);

// root.render(
//   <LanguageProvider>
//     <SessionProvider>
//       <Router>
//         <Routes>
//         <Route path="/" element={<PublicRoute><MainRoute /></PublicRoute>} />
//           <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
//           <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
//           <Route path="/exportpasswd" element={<PublicRoute><ExportPasswd /></PublicRoute>} />
//           <Route path="/importpasswd" element={<PublicRoute><ImportPasswd /></PublicRoute>} />
//           <Route path="/account" element={<PublicRoute><Account /></PublicRoute>} />
//           <Route path="/transfer" element={<PublicRoute><Transfer /></PublicRoute>} />
//           <Route path="/querytable" element={<PublicRoute><QueryTable /></PublicRoute>} />
//           {/* Add more routes as needed */}
//         </Routes>
//       </Router>
//     </SessionProvider>
//   </LanguageProvider>
// );