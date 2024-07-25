import React, {useState, useContext, useEffect} from "react";
import { Description } from "../../components/Description";
import { InputText } from "../../components/InputText";
import { Label } from "../../components/Label";
import { Language } from "../../components/Language";
import { Sbumit } from "../../components/Sbumit";
import "./style.css";
import { useLoginRedirect } from '../../loginAuth';
import { SessionContext, useAuth } from "../../useAuth";
import { useAddress } from '../../Contexts/AddressContext';
import { useAccount } from '../../Contexts/AccountContext';
import { useNavigate } from 'react-router-dom';
// import { API_URL } from "../../config";


import { useBalance } from '../../Contexts/BalanceContext';

import { check_gas } from "../../common_checks/check_gas";

import { check_address } from "../../common_checks/check_address";

import { wait_for_txhash } from "../../common_waiting/wait_for_txhash";

import { WaitingPage } from "../WaitingPage";

// import { DATABASE_ROOT } from "../../config";

import { LanguageContext } from "../../Language/LanguageContext";
// import { useNavigate } from "react-router-dom";
const API_URL = window.TCHAIN_API_URL;
const DATABASE_ROOT = window.TCHAIN_DATABASE_ROOT;

function decimalToHexadecimal(decimalNumber) {
  console.log('decimalNumber:', decimalNumber)
  return decimalNumber.toString(16);
}
function getDateStr(date) {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are 0 based, so add 1 and format as 2 digits
  const day = ("0" + date.getDate()).slice(-2); // Format as 2 digits
  const formattedDate = `${year}${month}${day}`;
  return formattedDate;
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

function calculateLeft(balance, data)
{
  
  // console.log('check type:', data.result.content.LType)
  
  if (data && data.result && data.result.content && data.result.content.LType && data.result.content.LType === 0){
    // console.log('') 
    const startDate = data.result.content.Begin.toString();
    console.log('startDate:', startDate);
    const today = new Date();
    const todayDate = getDateStr(today);
    console.log('todayDate:', todayDate);
    const cur_len = calculateDays(startDate, todayDate);
    const total_len = data.result.content.Days;
    const left = balance - data.result.content.Nums * (1 - cur_len / total_len);
    console.log('left:', left);
    return left;
  }
  else if (data && data.result && data.result.content && data.result.content.LType && data.result.content.LType === 1){
    console.log('check how many:', balance - data.result.content.Nums)
    return balance - data.result.content.Nums;
  }else{
    return balance;
  
  }
}

const handleClick = (amount,contract_address, OriginalAddress, targetAddress, sessionId, balance,data, setIsLoading, navigate, setBalance) => {
  // alert("转账成功");
  
  
  if (!check_address(targetAddress)) {
    alert ("地址格式错误");
    return;

  }

  // const left = balance - lockedAmount;
  const left = calculateLeft(balance, data);
  if (!check_gas(left, amount)) {
    alert ("余额不足或不合法");
    return;
  }
  
  const userConfirmation = window.confirm("确定转账吗？");

  if (!userConfirmation) {
    return;
  }
  setIsLoading(true);
  var real_amount = amount * 1000000000;
  // var real_amount = amount;
  var hexadecimal_amount = decimalToHexadecimal(real_amount);
  hexadecimal_amount = '0x' + hexadecimal_amount.toUpperCase();
  console.log('hexadecimal_amount:', hexadecimal_amount)
  const current_transfer_template = {
    "jsonrpc": "3.0", 
    "method": "chain_carbon", 
    "params":[`opcode=carbon&subcode=carbonTrans&address=${contract_address}&addr1=${targetAddress}&value=", "encryp=none`], 
    "id": sessionId}
  
  fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(current_transfer_template),
  })
  .then(response => response.json())
  .then(data => {
    console.log('quick check current data',data);
    if (data.result.ret !== '0'){
      alert(data.result.err);
      setIsLoading(false);
      const success = false;
      const txhash = null;
      const save_data = {
        OriginalAddress,
        targetAddress,
        hexadecimal_amount,
        success ,
        // transferTime,
        txhash
  
      }
      fetch(
        'http://localhost:3001/save-CarbonA-transfer',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(save_data),
        }
      )
      .then(response => response.json())
      .then(data => {
        console.log(data);
        console.log('Save fail transfer data:', save_data);
      })
      .catch(
        error => {
          console.error('Error:', error);
        }
      )
      return;
    }
    console.log(data);
    
    const success = data.result.ret === '0';
    const txhash = data.result.content.txhash;
    
    
    
    console.log('txhash:', txhash);
    
    wait_for_txhash(txhash)
    .then(
      status_code => {
        let success = false;
      if (status_code === 2){
        alert("转账成功");
        setBalance(left);
         success = true;
      }else{
        console.log('status_code:', status_code);
        alert("转账失败");
         success = false;
      }
      const save_data = {
        OriginalAddress,
        targetAddress,
        hexadecimal_amount,
        success ,
        // transferTime,
        txhash
  
      }

      return fetch(
        `${DATABASE_ROOT}/save-transfer`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(save_data),
        }
      )
      .then(response => response.json())
      .then(data => {
        console.log(data);
        console.log('Save success transfer data:', save_data);
      })
      .catch(
        error => {
          console.error('Error:', error);
        }
      )
      

      }
    )
    .then(
      () => {
        if (success){
          // setIsLoading(false);
          navigate('/account/CarbonA');
        }
        else{
          setIsLoading(false);
        
        }
        // setIsLoading(false);
      }
    )
  })

}

const fetchLockStatus = async (sessionId, address,setData, setLockedAmount) => {
  // console.log('current address', address);
  const current_json_template = { 
    "jsonrpc": "3.0", 
    "method": "chain_queryInfo", 
    "params": [
      "pubChainQuery",
    `op=querylock&addr=${address}`,
    "encryp=none"], 
    "id": sessionId}

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(current_json_template),
  });

  if (!response.ok) {
    console.error('Error:', response.status, response.statusText);
    return;
  }

  const data = await response.json();
  setData(data);
  if (data.result.content)
    setLockedAmount(data.result.content.Nums); 
  console.log('Data:', data);
};

function backHome(navigate) {
  // navigate('/account/CarbonA');
  navigate(-1);
}
export const CarbonATransfer = () => {
  const { sessionId } = useContext(SessionContext); // Get the sessionId from the context
  const { address} = useAddress();

  const [ TragetAddress, setTragetAddress ] = useState('');
  const [ Amount, setAmount ] = useState('');

  const { Balance, setBalance } = useBalance();

  const navigate = useNavigate();

  const [ isLoading, setIsLoading ] = useState(false);
  const [lockedAmount, setLockedAmount] = useState(0);
  const [data, setData] = useState({});

  const { language } = useContext(LanguageContext);
  
  useLoginRedirect();

  useEffect(() => {
    fetchLockStatus(sessionId, address, setData, setLockedAmount);
  }, [sessionId, address]);
  useEffect(() => {
    console.log('lockedAmount:', lockedAmount);
  }, [lockedAmount]);
  return (
    <div>
      {
        isLoading ? (<WaitingPage />) : (
          <div className="iphone-pro-transfer-carbon">
      <div className="div-2">
        <img src="/svg/Vector.svg" className="back-img" onClick={() => {backHome(navigate)}}/>
        {/* <div className="overlap-group">
          <img className="little-robot" alt="Little robot" src="/img/little-robot-1.png" onClick={()=>{backHome(navigate)}}/>
          <div className="overlap">
            <Language className="language-instance" property1="default" />
            <Description className="description-instance" property1="chinese" textKey='description'/>
          </div>
        </div> */}

        {/* <img className="img" alt="Little robot" src="/img/little-robot-2.png" /> */}
        <Language className="language-instance-2" property1="default" />
        <div className="display-1">
        <Label className="label-instance" textKey="targetAddress" />
        <InputText className={`input-text-instance ${language}`} text="Amount" onChange={e => { setTragetAddress(e.target.value); console.log('Account input changed:', e.target.value); }}/>
        </div>

        <div className="display-2">
        <Label className="design-component-instance-node" textKey="transferAmount"/>
        <InputText className={`input-text-2 ${language}`} text="Account" onChange={e => { setAmount(e.target.value); console.log('Amount input changed:', e.target.value); }}/>
          </div>
        <img src="/svg/circle-transfer.svg" className="img"/>
        <img src="/svg/coin-transfer.svg" className="img-1"/>
        
        
        <Sbumit className="sbumit-instance" textKey="transfer" onClick={() => {handleClick(Amount, address, TragetAddress, sessionId, Balance,data, setIsLoading, navigate, setBalance)}} />
        
        
      </div>
    </div>
        )
      }
    </div>
  );
};
