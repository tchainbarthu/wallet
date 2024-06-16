import React from "react";
import { Description } from "../../components/Description";
import { InputText } from "../../components/InputText";
import { Label } from "../../components/Label";
import { Language } from "../../components/Language";
import { Sbumit } from "../../components/Sbumit";
import { SingleChoice } from "../../components/SingleChoice";
import { useState } from "react";
import { SessionContext, useAuth } from "../../useAuth";
import "./style.css";
import { useContext } from "react";
import { useLoginRedirect } from '../../loginAuth';

// import { API_URL } from '../../config';


import { check_password } from "../../common_checks/checkpass_work";

import { useNavigate } from 'react-router-dom';

import { WaitingPage } from '../WaitingPage';
import { useAlreadyAccount } from '../../Contexts/AlreadyAccount';

const API_URL = window.TCHAIN_API_URL;



export const ImportPasswd = () => {
  useAuth();
  // useLoginRedirect();
  const { sessionId } = useContext(SessionContext); // Get the sessionId from the context
  const [selectedOption, setSelectedOption] = useState("none");


  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [memo, setMemo] = useState('');
  const [keystore, setKeystore] = useState('');
  const [file1, setFile1] = useState('');
  const [file2, setFile2] = useState('');
  const [isLoaging, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { alreadyAddress, setAlreadyAddress } = useAlreadyAccount();

  async function submitMemo(account, password, memo, sessionId, navigate, setIsLoading) {
    console.log(account)
    console.log(password)
    console.log(memo)
    console.log(sessionId)
  
    const current_template = {
      "jsonrpc": "3.0", 
      "method": "chain_importKey", 
      "params": [`opcode=Mnemonic&account=${account}&pass=${password}&content=${btoa(memo)}`, "encryp =none "],
      "id": sessionId}
    
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(current_template),
    })
    .then(response => response.json())
    .then(data => {
      // console.log('Success:', data);
      // alert('Success:', data);
      if (data.result.ret !== '0'){
        console.log(data.result.err);
        alert(data.result.err);
        setIsLoading(false);
      }else{
        console.log('Success:', data);
        alert('Success:', data);
        setAlreadyAddress(account);
        navigate('/login');
      }
    })
  
  }
  
  async function submitKeystore(account, password, keystore, sessionId, navigate, setIsLoading) {
    const current_template = {
      "jsonrpc": "3.0", 
      "method": "chain_importKeystore", 
      "params": [`opcode=Account&subcode=importkey&account=${account}&pass=${password}&file1=${keystore}`, "encryp=none"],
      "id": sessionId}
    
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(current_template),
    })
    .then(response => response.json())
    .then(data => {
      // console.log('Success:', data);
      // alert('Success:', data);
      if (data.result.ret !== '0'){
        console.log(data.result.err);
        alert(data.result.err);
        setIsLoading(false);
      }else{
        alert('Success:', data);
        setAlreadyAddress(account);
        navigate('/login');
      }
    })
  
  }
  
  async function submitAccount(account, password, sessionId, file1, file2, navigate, setIsLoading) {
    const current_template = {
      "jsonrpc": "3.0",
      "method": "chain_importKey",
      "params": [`opcode=Account&subcode=import&account=${account}&pass=${password}&file1=${file1}&file2=${file2}`, "encryp=none"],
      "id": sessionId
    }
  
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },  
      body: JSON.stringify(current_template),
    })
    .then(response => response.json())
    .then(data => {
      // console.log('Success:', data);
      // alert('Success:', data);
      if (data.result.ret !== '0'){
        console.log(data.result.err);
        alert(data.result.err);
        setIsLoading(false);
      }else{
        alert('Success:', data);
        setAlreadyAddress(account);
        navigate('/login');
      }
    })
  
  }
  // console.log('alreadyAddress:', alreadyAddress);
  // console.log('setAlreadyAddress:', setAlreadyAddress);

function handleSubmit(selectionOption, account, password, memo, sessionId, keystore, file1, file2, navigate, setIsLoading){
  if(account === '' || password === '') {
    alert('账号或密码不能为空');
    return;
  }
  if (memo === '' && selectionOption === 'one'){
    alert('助记词不能为空');
    return;
  }
  if (keystore === '' && selectionOption === 'two'){
    alert('keystore不能为空');
    return;
  }
  if (file1 === '' && selectionOption === 'three'){
    alert('文件1不能为空');
    return;
  }
  if (file2 === '' && selectionOption === 'three'){
    alert('文件2不能为空');
    return;
  }
  
  if (!check_password(password)){
    alert('密码长度不小于8位');
    return;
  }
  if (!check_password(account)){
    alert('账号长度不小于8位');
    return;
  }
  setIsLoading(true);
  switch(selectionOption){
    case 'one':
      submitMemo(account, password, memo, sessionId, navigate, setIsLoading);
      break;
    case 'two':
      submitKeystore(account, password, keystore, sessionId, navigate, setIsLoading);
      break;
    case 'three':
      submitAccount(account, password, sessionId, file1, file2, navigate, setIsLoading);
      break;
    default:
      break;
  }
}
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };
  function backHome(navigate) {
    navigate('/Homepage');
  }
  return (
    <div>
      {
        // isLoaging ? <div>Loading...</div> 
        isLoaging ? (<WaitingPage/>):
        (
          <div className="iphone-pro-import">
      <div className="div-2">
      <img src="/svg/Vector.svg" className="back-img" onClick={() => {backHome(navigate)}}/>
      <img src="/svg/g_description.svg" className="description-instance"/>
      <Language className="language-instance-2" property1="default" />
        {/* <div className="overlap-group">
          <img className="little-robot" alt="Little robot" src="/img/little-robot-1.png" onClick={()=>{navigate('/login')}}/>
          <div className="overlap">
            <Language className="language-instance" property1="default" />
            <Description className="description-instance" property1="chinese" textKey='description'/>
          </div>
        </div> */}
        <Sbumit className={`sbumit-instance${selectedOption === 'three' ? '-3' : ''}`} textKey='import_key' onClick={()=>{
          handleSubmit(selectedOption, account, password, memo, sessionId, keystore, file1, file2, navigate, setIsLoading)
        }}/>
        <SingleChoice
          className="single-choice-component"
          selectedOption={selectedOption}
          onOptionChange={handleOptionChange}
          selectionOptionText="import_memo"
          selectionOptionText1="import_Keystore"
          selectionOptionText2="import_account_password"

        />
        {/* <InputText className="input-text-instance" text="请输入账号（不低于八位）" />
        <InputText className="design-component-instance-node" text="请输入密码（不低于八位）" />
        <Label className="label-instance" text="账号" />
        <Label className="label-2" text="密码" /> */}
        {/* {selectedOption === "three" ? (
          <>
            <InputText className="input-text-instance" text="请输入账号（不低于八位）" />
            <InputText className="design-component-instance-node" text="请输入密码（不低于八位）" />
            <Label className="label-instance" text="账号" />
            <Label className="label-2" text="密码" />
          </>
        ) : null} */}
        <InputText className="input-text-instance" textKey={selectedOption === 'three' ? 'please_enter_old_account': 'please_enter_new_account'} onChange={e => {setAccount(e.target.value)}}/>
            <InputText className="design-component-instance-node" 
           inputType='password' textKey={selectedOption === 'one' ? 'please_enter_new_password':'please_enter_old_password'} onChange={e => {setPassword(e.target.value)}}/>
            <Label className="label-instance" textKey="account" />
            <Label className="label-2" textKey="password" />
        {selectedOption !== 'three' && <textarea className="rectangle" onChange={e => {console.log(e.target.value);setMemo(e.target.value); setKeystore(e.target.value)}}/>}
        {selectedOption === 'three' && <textarea className="rectangle-file1" onChange={e => {setFile1(e.target.value)}}/>}
        {selectedOption === 'three' && <textarea className="rectangle-file2" onChange={e => {setFile2(e.target.value)}}/>}
        {}
      </div>
    </div>
        )
      }
    </div>
  );
};
