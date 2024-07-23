import React, { useContext, useState, useEffect } from 'react';
import { Description } from "../../components/Description";
import { InputText } from "../../components/InputText";
import { Label } from "../../components/Label";
import { Language } from "../../components/Language";
import { RedirectLink } from "../../components/RedirectLink";
import { Sbumit } from "../../components/Sbumit";

import axios from "axios";
import "./style.css";
import '../../commom_styles/description.css';
// import '../../common_styles/icon_robot.css';
// import {API_URL} from "../../config";
import { useNavigate } from 'react-router-dom';

import { SessionContext, useAuth } from "../../useAuth";

import { useLoginStatus } from "../../loginAuth";

import { useAddress } from '../../Contexts/AddressContext';

import { useAccount } from '../../Contexts/AccountContext';

import { useBalance, BalanceProvider } from '../../Contexts/BalanceContext';

import { useGasValue, GasValueProvider } from '../../Contexts/GasValueContext';

import { useGasBuyValue, GasBuyValueProvider } from '../../Contexts/GasBugValueContext';

import { check_password } from '../../common_checks/checkpass_work';

import { wait_for_txhash } from '../../common_waiting/wait_for_txhash';

import { useAlreadyAccount } from '../../Contexts/AlreadyAccount';

export const WaitingPage = (cur_json_template) => {
  useAuth();
  const { isLoginFinished, setIsLoginFinished } = useLoginStatus();
  const { sessionId } = useContext(SessionContext); // Get the sessionId from the context
  const [account, setAccountLocal] = useState(''); 
  const [password, setPassword] = useState('');
  const { address, setAddress } = useAddress();
  const { Account, setAccount } = useAccount();
  

  
  const { Balance, setBalance } = useBalance();
  const { GasValue, setGasValue } = useGasValue();
  const { GasBuyValue, setGasBuyValue } = useGasBuyValue();
  
  const { alreadyAddress, setAlreadyAddress } = useAlreadyAccount();

  const navigate = useNavigate();

  
  
  return (
    <div className="iphone-pro-login">
      <div className="div-2">
      <img src="/svg/g_description.svg" className="description-instance-new"/>
        <img src="/svg/Leading.svg" className='waiting'/>
        {/* <img src="/svg/T-Chain-Big.svg" className="t-chain-big"/> */}
        {/* <img src="/svg/Leading_description.svg" className="Leading-description"/> */}
        <img src="/svg/Waver.svg" className="waver"/>
        <img src="/svg/PageLoading.svg" className='congra'/>
        {/* <Sbumit className="sbumit-instance-2" text="注册" textKey='Logon' onClick={()=>{navigate('/login')}}/> */}
      </div>
    </div>
  );
};
