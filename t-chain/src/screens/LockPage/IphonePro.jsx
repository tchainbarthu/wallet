import React, { useEffect } from "react";
import { Description } from "../../components/Description";
import { InputText } from "../../components/InputText";
import { Label } from "../../components/Label";
import { Language } from "../../components/Language";
// import { QueryTime } from "../../components/QueryTime";
import { LockType } from "../../components/LockType";
import { Sbumit } from "../../components/Sbumit";
import  { useState } from 'react';
import "./style.css";

import { useAddress } from "../../Contexts/AddressContext";
import { useAuth } from "../../useAuth";
import { useLoginRedirect } from '../../loginAuth';
// import { API_URL } from "../../config";

import { useBalance, BalanceProvider } from '../../Contexts/BalanceContext';

import { useContext } from "react";

import { SessionContext } from "../../useAuth";
import { useNavigate } from 'react-router-dom';

import { wait_for_txhash } from "../../common_waiting/wait_for_txhash";

import { check_end_date, check_start_date, check_lock_amount}  from "../../common_checks/check_lock_date";
import { WaitingPage } from "../WaitingPage";

import { LanguageContext } from "../../Language/LanguageContext";

const API_URL=window.TCHAIN_API_URL;
function decimalToHexadecimal(decimalNumber) {
  console.log('decimalNumber:', decimalNumber)
  return decimalNumber.toString(16);
}

const fetchLockStatus = async (sessionId, address, setData, setLockedAmount) => {
  // console.log('current address', address);
  const current_json_template = { 
    "jsonrpc": "3.0", 
    "method": "chain_queryInfo", 
    "params": [
      "pubChainQuery",
    `op=querylock&addr=${address}`,
    "encryp=none"], 
    "id": sessionId}


  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(current_json_template),
  })
  .then(response => {
    if (!response.ok) {
      console.error('Error:', response.status, response.statusText);
      return;
    }
    return response.json();
  })
  .then(data => {
    setData(data);
    if (data.result.content)
      {setLockedAmount(data.result.content.Nums);}
      // console.log('set value', data.result.content.Nums);}

    console.log('Data:', data);
  });
};



function getDateStr(date) {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are 0 based, so add 1 and format as 2 digits
  const day = ("0" + date.getDate()).slice(-2); // Format as 2 digits
  const formattedDate = `${year}${month}${day}`;
  return formattedDate;
}

function convertStr2Date(str) {
  const year = str.slice(0, 4);
  const month = str.slice(4, 6);
  const day = str.slice(6, 8);
  return new Date(`${year}-${month}-${day}`);
}
function calculateDays(startDate, endDate) {
  // Convert yyyymmdd to yyyy-mm-dd
  const start = `${startDate.slice(0, 4)}-${startDate.slice(4, 6)}-${startDate.slice(6, 8)}`;
  const end = `${endDate.slice(0, 4)}-${endDate.slice(4, 6)}-${endDate.slice(6, 8)}`;
  // const start = convertStr2Date(startDate);
  // const end = convertStr2Date(endDate);

  // Convert to Date objects
  const startDateObj = new Date(start);
  const endDateObj = new Date(end);

  // Calculate the difference in milliseconds
  const diffInMs = Math.abs(endDateObj - startDateObj);

  // Convert to days and return
  return diffInMs / (1000 * 60 * 60 * 24);
}

const calculateEndDate = (startDate, days) => {
  // console.log(days)
  // console.log(startDate)
  // console.log(typeof startDate)
  // const startDateObj = new Date(startDate);
  // const start_format = `${startDate.slice(0, 4)}-${startDate.slice(4, 6)}-${startDate.slice(6, 8)}`
  const startDateStr = startDate.toString();
  const startDateObj = new Date(`${startDateStr.slice(0, 4)}-${startDateStr.slice(4, 6)}-${startDateStr.slice(6, 8)}`);
  const endDateObj = new Date(startDateObj);
  endDateObj.setDate(startDateObj.getDate() + days);
  
  return endDateObj.toISOString().split('T')[0].replace(/-/g, '');
}
const handleLockSubmit = async (locked, sessionId, startDate, lockAmount, endDate, lock_type, setIsLoading, 
  Balance,address, setData, setLockedAmount) => {
    if (startDate === undefined || endDate === undefined) {
      alert('日期不能为空');
      return;
    }
    console.log('startDate', startDate);
    console.log('endDate', endDate);
  if (!check_start_date(startDate)) {
    alert('开始日期不能早于今天');
    return;
  }

  if (!check_end_date(startDate, endDate)) {
    alert('结束日期不能早于开始日期');
    return;
  }
  console.log('lockAmount', lockAmount);
  if (!check_lock_amount(lockAmount, Balance)) {
    alert('锁定金额不合法');
    return;
  }
  const days = calculateDays(startDate, endDate);
  // console.log('days', days);
  // console.log('startDate', startDate);
  // console.log('endDate', endDate);
  const userConfirmation = window.confirm("确定要锁定吗？");

  if (!userConfirmation) {
    return;
  }
  console.log('lockAmount', lockAmount);
  setIsLoading(true);
  // const real_amount = lockAmount * 1000000000;
  const real_amount = Math.floor(lockAmount * 100);
  // var hexadecimal_amount = decimalToHexadecimal(real_amount);
  const lock_type_num = lock_type === 'based_on_day' ? 1 : 0;
  // console.log('lock_type_num', lock_type_num);
  const current_json_template = {
    "jsonrpc": "3.0",
    "method": "chain_tvm",
    "params":[
      `opcode=token&subcode=lock&nums=${real_amount}&begin=${startDate}&days=${days}&type=${lock_type_num}`, 
    "encryp=none"],
    "id": sessionId
  };
  console.log('current_json_template', current_json_template)
  // console.log('current address', address);
  if (!locked) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(current_json_template),
    });
    

    
    if (!response.ok) {
      console.error('Error:', response.status, response.statusText);
      alert('Error:', response.status, response.statusText);
      return;
    }

    const data = await response.json();
    const txhash = data.result.content.txhash;
    const status_code = await wait_for_txhash(txhash);

    // console.log('Data:', data);
    
    // if (data.result.ret !== '0') {
    //   // alert('Success');
    //   alert ('Error:', data.result.err);
    //   if (data.result.ret === '101') {
    //     alert('Session 过期，请重新登录');
    //   }
    // }
    // else{
    //   alert('锁定成功');
    

    // }
    if (status_code === 2) {
      alert('Success');
    }
    else {
      alert('Failed');
    }

    // setIsLoading(false);
    // setIsLoading(false);
  fetchLockStatus(sessionId,address, setData, setLockedAmount)
  .finally(() => setIsLoading(false));
  }
}

// const handleUnlock
const handleUnlockSubmit = async (sessionId, setIsLoading, address, setData, setLockedAmount) => {
  const userConfirmation = window.confirm("确定要解锁吗？");

  if (!userConfirmation) {
    return;
  }
  setIsLoading(true);
  const current_json_template = {
    "jsonrpc": "3.0",
    "method": "chain_tvm",
    "params":[
      `opcode=token&subcode=unlock`, "encryp=none"],
    "id": sessionId
  };
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(current_json_template),
  })
  const data = await response.json();
  
  console.log('Success:', data);
  if (data.result.ret === '0') {
    // alert('Success');
    const txhash = data.result.content.txhash;
    const status_code = await wait_for_txhash(txhash);
    console.log('current status_code', status_code);
    if (status_code === 2) {
      alert('Success');
    }
    else {
      console.log('status_code', status_code);
      alert('Failed');
    }
  }
  if (data.result.ret === '1003') {
    alert('Session 过期，请重新登录');
  }
  
  

  // setIsLoading(false);
  fetchLockStatus(sessionId,address, setData, setLockedAmount)
      .finally(() => setIsLoading(false));
}



function backHome(navigate) {
  navigate('/Homepage');
}

export const LockPage = () => {
  useAuth();
  useLoginRedirect();
  const [startDate, setStartDate] = useState();
  const [lockAmount, setLockAmount] = useState(0);
  const [endDate, setEndDate] = useState();
  const [lockedAmount, setLockedAmount] = useState(0);
  const [lock_type, setType] = useState('linear');
  
  // const [TotalLockAmout, setStatus4] = useState('');
  // const [allowedAmount, setStatus5] = useState('');
  const { address, setAddress } = useAddress();
  
  const [data, setData] = useState({});

  const { Balance, setBalance } = useBalance();

  const { sessionId } = useContext(SessionContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [locked, setLocked] = useState(false);
  const [can_be_unlocked, setCanBeUnlocked] = useState(false);
  const [isWriting, setIsWriting] = useState(false);

  const { language } = useContext(LanguageContext);
  // let locked = false;
  // let can_be_unlocked = false;
  useEffect(() => {
    setIsLoading(true);
    fetchLockStatus(sessionId,address, setData, setLockedAmount)
      .finally(() => setIsLoading(false));
    // console.log('locked', locked);
  }, [sessionId, address, Balance, lockedAmount, locked, can_be_unlocked]);
  
  useEffect(() => {
    if (endDate != undefined){
      
        
        if(lockedAmount !== 0){
          
          // locked = true;
          setLocked(true);
          // console.log('locekd', locked);
          const today = new Date();
        // get end date
        console.log(endDate)
        const end = convertStr2Date(endDate);
        // console.log('today', today);
        // console.log('end', end);
        if( today.getTime() > end.getTime()) {
          // can_be_unlocked = true;
          setCanBeUnlocked(true);
        }else{
          // can_be_unlocked = false;
          setCanBeUnlocked(false);
        }
        // console.log('can_be_unlocked', can_be_unlocked);
      }else{
          // locked = false;
          setLocked(false);
          // console.log('locked', locked);
      }
    
      
    }
  }, [isLoading, lockedAmount, data]);



  useEffect(() => {
    
    if (data && data.result){
      if (data.result.content) {
        // console.log('locked', locked);
        console.log('current Data', data)
        setStartDate(data.result.content.Begin);
        const endDay = calculateEndDate(data.result.content.Begin, data.result.content.Days);
        setEndDate(endDay);
        setLockAmount(data.result.content.Nums / 1000000000);
     
      }
      setIsWriting(false);
    }
  }, [isLoading, data]);
  useEffect(() => {
    console.log('locked', locked);
  }, [locked]);
  useEffect(() => {
    console.log('can_be_unlocked', can_be_unlocked);
  }, [can_be_unlocked]);
  return (
    <div>
      {
        (isLoading || isWriting) ? (
          // <div className="waiting-box">Loading...</div>
          <WaitingPage />
        ) : (
          <div className="iphone-pro-lockpage">
      <div className="div-2">
        {/* <div className="overlap-group">
          <img className="little-robot" alt="Little robot" src="/img/little-robot-1.png" onClick={()=>{backHome(navigate)}}/>
          <div className="overlap">
            <Language className="language-instance" property1="default" />
            <Description className="description-instance" property1="chinese" textKey='description'/>
          </div>
        </div> */}
        <Language className="language-instance-2" property1="default" />
        <img src="/svg/Vector.svg" alt="back" className="back" onClick={()=>{backHome(navigate)}}/>
        <div className="display-1">
        <Label className="label-instance" textKey="startDate"/>
        <InputText className="input-text-instance" textKey="" disabled={locked} specialText={startDate} inputType="date" onChange={
          (e) => {
          // console.log('startDate', startDate);
          const formattedDate = getDateStr(new Date(e.target.value));
          setStartDate(formattedDate);
        }
        }/>
        </div>

        <div className="display-2">
        <Label className="label-2" textKey="endDate" />
        <InputText className="input-text-3" textKey="" disabled={locked} specialText={endDate} inputType="date" onChange={
          (e) => {
          // console.log('endDate', endDate);
          const formattedDate = getDateStr(new Date(e.target.value));
          // console.log('formattedDate', formattedDate);
          setEndDate(formattedDate);
          }
        }/>
          </div>
        

        <div className="display-3">
        <Label className="design-component-instance-node" textKey="lockAmount" />
        <InputText className="input-text-2" textKey="" disabled={locked} specialText={locked? lockedAmount / 1000000000 :0} onChange={
          (e) => {
            setLockAmount(e.target.value);
            console.log('e.target.value', e.target.value);
          console.log('lockAmount', lockAmount);
        }
        }/>
          </div>
        
        <div className="display-4">
        <Label className="label-3" textKey="lockType" />
        <LockType className="lock-type-instance" property1="default" LockType={lock_type} setType={setType} disabled={locked}/>
        </div>

        <div className="display-5">
        <Label className="label-4" textKey="TotalLockAmout" />
        <div className={`text-wrapper-4 ${language}`}>{Balance / 1000000000}</div>
        
          </div>
        

        <div className="display-6">
        <Label className="label-5" textKey="allowedAmount" />
        <div className={`text-wrapper-5 ${language}`}>{Math.max(Balance / 1000000000 - lockedAmount / 1000000000, 0)}</div>
          </div>
        
        
        <Sbumit className="sbumit-instance" textKey="unlock" active={locked && can_be_unlocked} onClick={()=>{
          handleUnlockSubmit(sessionId, setIsLoading,
            address, setData, setLockedAmount);
          }}/>
        <Sbumit className="sbumit-2" textKey="lock" active={!locked} onClick={
          () => {
            handleLockSubmit(locked, sessionId, startDate, lockAmount, endDate, lock_type, setIsLoading, Balance, 
              address, setData, setLockedAmount);
            }
        }/>
        
        
        
        {/* <InputText className="input-text-4" textKey="" />
        <InputText className="input-text-5" textKey="" /> */}
        
        
        
      </div>
    </div>
        )
      }
    </div>
  );
};
