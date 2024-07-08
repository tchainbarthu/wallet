import React, { useContext, useState } from 'react';
import { Description } from "../../components/Description";
import { InputText } from "../../components/InputText";
import { Label } from "../../components/Label";
import { Language } from "../../components/Language";
import { Sbumit } from "../../components/Sbumit";
import "./register_style.css";

import { SessionContext, useAuth } from "../../useAuth";

// import {API_URL, REGISTER_TEMPLATE} from "../../config";


import {useNavigate} from 'react-router-dom';


import { check_password } from '../../common_checks/checkpass_work';

import { useAlreadyAccount } from '../../Contexts/AlreadyAccount';

import { WaitingPage } from '../WaitingPage';
import { wait_for_txhash } from "../../common_waiting/wait_for_txhash";

import { LanguageContext } from '../../Language/LanguageContext';
const API_URL=window.TCHAIN_API_URL;
const TCHAIN_DATABASE_ROOT = window.TCHAIN_DATABASE_ROOT
export const Register = () => {
  const navigate = useNavigate(); // Get the navigate function from useNavigate
  
  useAuth();
  const { sessionId } = useContext(SessionContext); // Get the sessionId from the context
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');

  const [repeatPassword, setRepeatPassword] = useState('');

  const { alreadyAddress, setAlreadyAddress } = useAlreadyAccount();
  const [isLoading, setIsLoading] = useState(false);

  // const {Language} = useContext(LanguageProvider);
  const { language, setLanguage, translations } = useContext(LanguageContext);

  const handleAccountChange = (event) => {
    setAccount(event.target.value);
  };

  async function sendPostRequest (current_register_template) {
    // Replace 'http://example.com' with your server's URL
    
    if (account.length < 4){
      alert("账号长度不够，请输入至少8位账号");
      return;
    }

    // check if the password is long enough
    if (!check_password(password)){
      alert("密码长度不够，请输入至少8位密码");
      return;
    }

    // check if the account is long enough
    
    // check if the password is the same as the repeat password
    if (password !== repeatPassword){
      alert("两次输入的密码不一致");
      return;
    }

    // let remaining_time = 0;
    
    
    setIsLoading(true);
    const response = await fetch(
      `${TCHAIN_DATABASE_ROOT}/check_registering_number_day`,
      {
        method: 'GET',
          headers: {
        'Content-Type': 'application/json',
      },
      }
    );
    const data = await response.json();
   
    console.log(data);
    const remaining_time = data.registeringNumber;
        
    if (remaining_time <0){
      alert('达到最大注册次数！');
      setIsLoading(false);
      return;
    }
    
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(current_register_template),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.result.ret !== '0'){
        alert (data.result.err);
        setIsLoading(false);
        window.location.reload(true);
      }else{
        // alert("注册成功");
        const txhash = data.result.content.txhash;
        wait_for_txhash(txhash).then(
          status_code => {
            if (status_code === 2){
              setIsLoading(false);
            setAlreadyAddress(account);
            // navigate('/login'); // Navigate to the login page
            navigate('/register_successful');
            }else{
              alert('注册失败');
            }
            
          }
        ).catch(
          error =>{
            alert(error);
          }
        )
        
    }
        
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };



  
  
  // current_register_template = REGISTER_TEMPLATE;
  const current_register_template = {
    "jsonrpc": "3.0",
    "method": "chain_register",
    "params": [`opcode=Account&subcode=Regsiter&account=${account}&pass=${password}&refer=${sessionId}`, "encryp=none"],
    "id": sessionId,
  };
  
  
  return (
    <div>
      {
        isLoading ? <WaitingPage /> :
        <div className="iphone-pro-register">
      <div className="div-2">
        {/* <div className="overlap-group">
          <img className="little-robot-register" alt="Little robot" src="/img/little-robot-1.png" onClick={()=>{navigate('/login')}}/>
          <div className="overlap">
            <Language className="language-instance" property1="default" />
            <Description className="description-instance" property1="chinese" textKey={'description'} onChange={()=>{navigate('/login');}}/>
          </div>
        </div> */}
        <Language className="language-instance-2" property1="default" />
        <img className="little-robot" alt="Little robot" src="/svg/g_description.svg" />
        <img className="img" alt="Little robot" src="/svg/g-robot.svg" />
        <Sbumit className="sbumit-instance" textKey="register" onClick={() => sendPostRequest(current_register_template)}/>
        <InputText className="input-text-instance-register" textKey="please_enter_account" onChange={handleAccountChange}/>
        <InputText className="design-component-instance-node-register" inputType='password' textKey="please_enter_password" onChange={handlePasswordChange}/>
        <InputText className={`input-text-2 ${language}`} hasDiv={false} inputType='password' textKey={'please_enter_repeated_password'} onChange={e =>{setRepeatPassword(e.target.value)}}/>
        <InputText className="input-text-3" hasDiv={false} specialText={'推荐人: 88888888'}/>
        <Label className="label-instance-register" textKey="account" />
        <Label className="label-2-register" textKey="password" />
        <Label className="label-3" textKey="repeat_password" />
        <Label className="label-4" textKey="referenceMan" />
        {/* <img src = "/svg/Divider-login.svg" className="divider"/>
         */}
         <div style={{borderTop: "1px solid gray", margin: "20px 0", width: "75%"}} className="divider-1"></div>
        <Sbumit className="sbumit-instance-2" text="注册" textKey='Logon' onClick={()=>{navigate('/login')}}/>
      </div>
    </div>
      }

    </div>
  );
};
