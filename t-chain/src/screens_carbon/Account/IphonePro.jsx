import React, { useEffect } from "react";
import { Description } from "../../components/Description";
import { Label } from "../../components/Label";
import { Language } from "../../components/Language";
import { Sbumit } from "../../components/Sbumit";
import "./style.css";
import { useNavigate } from 'react-router-dom';

import { useLoginRedirect } from '../../loginAuth';

import { useAddress, AddressProvider } from '../../Contexts/AddressContext';

import { useBalance, BalanceProvider } from '../../Contexts/BalanceContext';

import { useGasValue, GasValueProvider } from '../../Contexts/GasValueContext';

import { useGasBuyValue, GasBuyValueProvider } from '../../Contexts/GasBugValueContext';

import { useAuth } from "../../useAuth";

// import {API_URL} from '../../config';

import { useAccount } from "../../Contexts/AccountContext";

import { LanguageContext } from "../../Language/LanguageContext";

import { useCarbonAAmountContext } from "../../Contexts/CabonAAmount";

import { useCarbonAPersonalAmount } from "../../Contexts/CabonAPersonalAmount";

function backHome(navigate) {
  navigate('/Homepage');
}
export const CarbonAccount = () => {
  useAuth();
  useLoginRedirect();
  const navigate = useNavigate();
  const { address, setAddress } = useAddress();
  const { Balance, setBalance } = useBalance();
  const { GasValue, setGasValue } = useGasValue();
  const { GasBuyValue, setGasBuyValue } = useGasBuyValue();
  const { Account, setAccount } = useAccount();
  
  const { language } = React.useContext(LanguageContext);

  const { CarbonAAmount, setCarbonAAmount } = useCarbonAAmountContext();

  const { CarbonAPersonalAmount, setCarbonAPersonalAmount } = useCarbonAPersonalAmount();
  // const fetchData = async (current_address_query_template) => {
  //   const response = await fetch(API_URL, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(current_address_query_template),
  //   });
  
  //   if (!response.ok) {
  //     throw new Error('Network response was not ok');
  //   }
  
  //   response.json().then(
  //     data => {
  //       console.log(data);
  //       // setAddress(data.result);
  //       setBalance(data.result.content.Balance);
  //       setGasValue(data.result.content.GasValue);
  //       setGasBuyValue(data.result.content.GasBuyValue);

  
  
  //     }
  //   );
  //   // return data;
  // };

  // const current_address_query_template = { 
  //   "jsonrpc": "3.0",
  //   "method": "chain_queryInfo", 
  //   "params":["pubChainQuery",`op=queryAddress&value=${address}<->latest`,"encryp=none"], 
  //   "id": "1"}
  
  // useEffect(() => {
  //   fetchData(current_address_query_template);
  // }
  // , [address]);
  return (
    // <GasBuyValueProvider>
    // <GasValueProvider>
    // <AddressProvider>
    // <BalanceProvider>
    <div className="iphone-pro-account-Carbon-A">
      
      <div className="div-2">
      <h2 className="text-description">Carbon A Description</h2>
      <Language className="language-instance-2" property1="default" />
      <img src="/svg/Vector.svg" alt="back" className="vector-back" onClick={()=>{backHome(navigate)}}/>
        
        

        <div className="display-4">
        <Label className="label-2" textKey="total_carbonA_amount" />
        <div className={`text-wrapper-5 ${language}`}>{CarbonAAmount}</div>

        </div>
        
        <div className="display-5">
        <Label className="label-3" textKey="carbonA_owned_amount" />
        <div className={`text-wrapper-6 ${language}`}>{CarbonAPersonalAmount}</div>
        </div>

        
        
        
        
        
       
        
        <Sbumit className="sbumit-instance" textKey="transfer" onClick={() => {navigate('/CarbonA/Transfer')}}/>
        <Sbumit className="sbumit-instance-1" textKey="platform_management" onClick={() => {navigate('/CarbonA/PlatformManagement')}}/>
        <Sbumit className="sbumit-3" divClassName="sbumit-2" textKey="transferQuery" onClick={() => {navigate('/querytable')}}/>
        <Sbumit className="sbumit-4" divClassName="sbumit-2" textKey="platform_purchasing" onClick={() => {navigate('/CarbonA/PlatformPurchasing')}} />

        <Sbumit className="sbumit-qr-code" divClassName="sbumit-2" textKey="qr_code_receivables" onClick={() => {navigate('#')}} />
      </div>
    </div>
    // </BalanceProvider>
    // </AddressProvider>
    // </GasValueProvider>
    // </GasBuyValueProvider>
  );
};
