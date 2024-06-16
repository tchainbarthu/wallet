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

function backHome(navigate) {
  navigate('/Homepage');
}
export const Account = () => {
  useAuth();
  useLoginRedirect();
  const navigate = useNavigate();
  const { address, setAddress } = useAddress();
  const { Balance, setBalance } = useBalance();
  const { GasValue, setGasValue } = useGasValue();
  const { GasBuyValue, setGasBuyValue } = useGasBuyValue();
  const { Account, setAccount } = useAccount();
  
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
    <div className="iphone-pro-account">
      
      <div className="div-2">
      <Language className="language-instance-2" property1="default" />
      <img src="/svg/Vector.svg" alt="back" className="vector-back" onClick={()=>{backHome(navigate)}}/>
        {/* <div className="overlap-group">
          <img className="little-robot" alt="Little robot" src="/img/little-robot-1.png" onClick={()=>{backHome(navigate)}}/>
          <div className="overlap">
            <Language className="language-instance" property1="default" />
            <Description className="description-instance" property1="chinese" textKey={'description'} />
          </div>
        </div> */}
        {/* <img className="img" alt="Little robot" src="/img/little-robot-2.png" /> */}
        
        <div className="display-1">
        <Label className="label-instance" textKey="address" />
        <div className="text-wrapper-2">{address}</div>
        </div>
        
        <div className="display-3">
        <div className="text-wrapper-4">{Balance / 1000000000}</div>
        <Label className="design-component-instance-node" textKey="amount" />
        
        </div>

        <div className="display-2">
        <div className="text-wrapper-3">{Account}</div>
        <Label className="label-4" textKey="account" />
        </div>

        <div className="display-4">
        <Label className="label-2" textKey="gas" />
        <div className="text-wrapper-5">{GasValue}</div>

        </div>
        
        <div className="display-5">
        <Label className="label-3" textKey="buyGas" />
        <div className="text-wrapper-6">{GasBuyValue}</div>
        </div>

        
        
        
        
        
       
        
        <Sbumit className="sbumit-instance" textKey="transfer" onClick={() => {navigate('/transfer')}}/>
        <Sbumit className="sbumit-instance-1" textKey="lockAccount" onClick={() => {navigate('/lockpage')}}/>
        <Sbumit className="sbumit-3" divClassName="sbumit-2" textKey="transferQuery" onClick={() => {navigate('/querytable')}}/>
        <Sbumit className="sbumit-4" divClassName="sbumit-2" textKey="exportKey" onClick={() => {navigate('/exportpasswd')}} />
      </div>
    </div>
    // </BalanceProvider>
    // </AddressProvider>
    // </GasValueProvider>
    // </GasBuyValueProvider>
  );
};
