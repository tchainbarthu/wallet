import React, { useContext, useState, useEffect } from 'react';
import { Description } from "../../components/Description";
import { InputText } from "../../components/InputText";
import { Label } from "../../components/Label";
import { Language } from "../../components/Language";
import { RedirectLink } from "../../components/RedirectLink";
import { Sbumit } from "../../components/Sbumit";

import axios from "axios";
import "./style.css";
// import '../../commom_styles/description.css';
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

import { usePassword } from '../../Contexts/PasswordContext';

import bcrypt from 'bcryptjs';
const API_URL=window.TCHAIN_API_URL;
export const Login = (cur_json_template) => {
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

  const { AlreadyPassword, setAlreadyPassword } = usePassword();
  
  const navigate = useNavigate();

  

  useEffect(() => {
      console.log('alreadyAddress:', alreadyAddress);
      setAccountLocal(alreadyAddress);
    
  }, [alreadyAddress, sessionId]);

  const fetchData = async (current_address_query_template) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(current_address_query_template),
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    return response.json().then(
      data => {
        console.log('fetch account data')
        console.log(data);
        // setAddress(data.result);
        if (data && data.result && data.result.content)
          {
            console.log('data exists');
            setBalance(data.result.content.Balance);
          setGasValue(data.result.content.GasValue);
          setGasBuyValue(data.result.content.GasBuyValue);
          }else{
            // alert('数据解析失败');
          }
      }
    );
    // return data;
  };
  const getFreeGas = async () => {
    const get_free_gas_template = { 
      "jsonrpc": "3.0", 
      "method": "chain_getFreeGas", 
      "params":["opcode=Other&subcode=getfreegas", "encryp=none"], 
      "id": sessionId };
    return fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(get_free_gas_template),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.result.ret !== '0'){
         console.log(data.result.err);
      }else{
        return wait_for_txhash(data.result.content.info);
        // alert("获取免费能量成功");
        console.log('get free gas',data.result.content.GasValue);
      }
    })

    }

  const handleSubmit = async () => {


    
    // check if the password is long enough
    if (!check_password(password)){
      alert("密码长度不够，请输入至少8位密码");
      return;
    }

    // check if the account is long enough
    if (account.length < 8){
      alert("账号长度不够，请输入至少8位账号");
      return;
    }
    
    const current_address_query_template = { 
      "jsonrpc": "3.0",
      "method": "chain_queryInfo", 
      "params":["pubChainQuery",`op=queryAddress&value=${address}<->latest`,"encryp=none"], 
      "id": "1"}
    console.log('account:', account);
    console.log('password:', password);
    

      fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cur_json_template),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        
        if (data.result.ret !== '0'){
          console.log(data.result.err);
          alert("登录失败，请检查账号密码是否正确");
        } 
        else{
          // alert("登录成功");
          // const salt = bcrypt.genSaltSync(10);
          const salt = "$2a$10$fXsWaI9SItNQjohNtraQC.";
            const hashedPassword = bcrypt.hashSync(password, salt);
            console.log('hashedPassword', hashedPassword);
            setAlreadyPassword(hashedPassword);
            setIsLoginFinished(true); 
            setAddress(data.result.content.info)
            setAccount(account)
            // Hash the password before storing it
            
            
          
          
      }
          
      })
      .then(() => {
        return getFreeGas();
      })
      .then(()=>{
        return fetchData(current_address_query_template);
      })
      .then(()=>{
        navigate('/Homepage');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  // useEffect(() => {
  //   if (isLoginFinished) {
  //     navigate('/account'); // Navigate to the account page
  //   }
  // }, [isLoginFinished]); // This effect runs whenever `isLoginFinished` changes
  cur_json_template = {
    "jsonrpc": "3.0", 
    "method": "chain_logon", 
    "params":[`opcode=Account&subcode=Logon&account=${account}&pass=${password}`, "encryp=none"], 
    "id": sessionId};
  return (
    <div className="iphone-pro-login">
      
      <div className="div-2">
      <Language className="language-instance-1" property1="default" />
        {/* <div className="overlap-group"> */}
          {/* <img className="little-robot" alt="Little robot" src="/img/g_description.png" /> */}
          {/* <div className="overlap">
            <Language className="language-instance" property1="default" />
            <Description className="description-instance" textKey='description' />
          </div> */}

        {/* </div> */}
        
        <img className="little-robot" alt="Little robot" src="/svg/g_description.svg" />
        <img className="img" alt="Little robot" src="/svg/g-robot.svg" />
        <Sbumit className="sbumit-instance" text="登录" onClick={()=>{handleSubmit(cur_json_template)}}/>
        <InputText className="input-text-instance" textKey='please_enter_account' onChange={e => { setAccountLocal(e.target.value); console.log('Account input changed:', e.target.value); }} value={account} />
        <InputText inputType='password' className="design-component-instance-node" textKey={'please_enter_password'} onChange={e => { setPassword(e.target.value); console.log('Password input changed:', e.target.value); }} />
        {/* <Label className="label-instance" textKey="account" /> */}
        {/* <Label className="label-2" textKey="password" /> */}
        <RedirectLink className="redirect-link-instance" textKey="import_key" href='/importpasswd'/>
        <RedirectLink className="redirect-link-2" textKey="every_day_bonus" href='#'/>

        {/* <img src = "/svg/Register-Divider.svg" className="divider"/> */}
        {/* <Sbumit className="sbumit-instance-2" text="注册" textKey='register' onClick={()=>{handleSubmit(cur_json_template)}}/> */}
        <Sbumit className="sbumit-instance-2" text="注册" textKey='register' onClick={()=>{navigate('/register')}}/>
        <div style={{borderTop: "1px solid gray", margin: "20px 0", width: "75%"}} className="divider-1"></div>
      </div>
    </div>
  );
};
