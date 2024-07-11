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

import { CarbonAccount } from "./screens_carbon/Account/IphonePro";

import {PlatformPurchasing} from "./screens_carbon/Platform_Purchasing/IphonePro";

// import { CarbonATransfer } from "./screens_carbon/Transfer";

import { PlatformManagement } from "./screens_carbon/Platform_Management";

import { PlatformAddManager } from "./screens_carbon/Platform_Add_Manager";
import { PlatformDeleteManager } from "./screens_carbon/Platform_Delete_Manager";
import { CarbonAAddManager } from "./screens_carbon/Add_Manager";
import { CarbonADeleteManager } from "./screens_carbon/Delete_Manager";
import { PlatformDeployToken } from "./screens_carbon/Platform_Deploy_Token";

import { CarbonADeployToken } from "./screens_carbon/CarbonA_Deploy_Token";

import {PlatformUpgradeToken} from "./screens_carbon/Platform_Upgrade_Token/IphonePro";

import { CarbonAUpgradeToken } from "./screens_carbon/Upgrade_Token";

import { DummyRegister } from "./screens/Dummy_Register/IphonePro";

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
        <Route path="/account/CarbonA" element={<CarbonAccount />} />
        <Route path="/CarbonA/PlatformPurchasing" element={<PlatformPurchasing />} />
        {/* <Route path="/CarbonA/Transfer" element={<CarbonATransfer />} /> */}
        <Route path="/CarbonA/PlatformManagement" element={<PlatformManagement />} />
        <Route path="/CarbonA/PlatformAddManager" element={<PlatformAddManager />} />
        <Route path="/CarbonA/PlatformDeleteManager" element={<PlatformDeleteManager />} />
        <Route path="/CarbonA/AddManager" element={<CarbonAAddManager />} />
        <Route path="/CarbonA/DeleteManager" element={<CarbonADeleteManager />} />
        <Route path="/CarbonA/PlatformDeployToken" element={<PlatformDeployToken />} />
        <Route path="/CarbonA/CarbonADeployToken" element={<CarbonADeployToken />} />
        <Route path="/CarbonA/PlatformUpgradeToken" element={<PlatformUpgradeToken />} />
        <Route path="/CarbonA/UpgradeToken" element={<CarbonAUpgradeToken />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/querytable" element={<QueryTable />} />
        <Route path="/lockpage" element={<LockPage />} />
        <Route path="/Homepage" element={<Homepage />} />
        <Route path="/register_successful" element={<RegisterSuccessful />} />
        <Route path="/dummy_register" element={<DummyRegister/>} />
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