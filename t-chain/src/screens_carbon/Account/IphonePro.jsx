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

import { SessionContext } from "../../useAuth";

import {QRCodeSVG} from 'qrcode.react';

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
  const { sessionId, setSessionId } = React.useContext(SessionContext);
  const [data_str, setDataStr] = React.useState("");
  
  const { language } = React.useContext(LanguageContext);

  const { CarbonAAmount, setCarbonAAmount } = useCarbonAAmountContext();

  const { CarbonAPersonalAmount, setCarbonAPersonalAmount } = useCarbonAPersonalAmount();
  
  const API_URL = window.TCHAIN_API_URL;
  return (
    
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

        {
          (data_str && data_str !== "") ? <QRCodeSVG value={data_str} size={200} className="QR-code"/> : null
        }

        
        
        
        
        
       
        
        <Sbumit className="sbumit-instance" textKey="transfer" onClick={() => {navigate('/CarbonA/Transfer')}}/>
        <Sbumit className="sbumit-instance-1" textKey="platform_management" onClick={() => {navigate('/CarbonA/PlatformManagement')}}/>
        <Sbumit className="sbumit-3" divClassName="sbumit-2" textKey="transferQuery" onClick={() => {navigate('/querytable')}}/>
        <Sbumit className="sbumit-4 disabled" divClassName="sbumit-2" textKey="platform_purchasing" active={false} onClick={() => {navigate('/CarbonA/PlatformPurchasing')}} />

        <Sbumit className="sbumit-qr-code" divClassName="sbumit-2" textKey="qr_code_receivables" onClick={() => {
          const fetch_qr_info = async () => {
            const template_qr = { "jsonrpc": "3.0", "method": "chain_carbon",
              "params":["opcode=carbon&subcode=connectInfo", "encryp=none"], "id": sessionId};
            let data = await fetch(API_URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(template_qr),
            });
            data = await data.json();
            // console.log("check qr data",data);
            // data_str = data.result.content.info;
            setDataStr(data.result.content.info);
            // return data_str;
          }
          fetch_qr_info();
          console.log("check data_str",data_str);
        }} />
      </div>
    </div>
    // </BalanceProvider>
    // </AddressProvider>
    // </GasValueProvider>
    // </GasBuyValueProvider>
  );
};
