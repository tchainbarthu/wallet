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

const dummyFetch = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([{ name: 'Item 1' }, { name: 'Item 2' }, { name: 'Item 3' },
        { name: 'Item 1' }, { name: 'Item 2' }, { name: 'Item 3' },
        { name: 'Item 1' }, { name: 'Item 2' }, { name: 'Item 3' }
      ]); // Simulated data
    }, 1000); // Simulate network delay
  });
};


const handleClick = (name, targetAddress, sessionId, setIsLoading, navigate) => {
  // alert("转账成功");
  
  
  if (!check_address(targetAddress)) {
    alert ("地址格式错误");
    return;

  }

  
  
  const userConfirmation = window.confirm("确定增加吗？");

  if (!userConfirmation) {
    return;
  }
  setIsLoading(true);
  // const platform_address = "0xa7f9a19d24c3f887f52b783eb37de2ee683cda9c";
  const platform_address = window.CARBON_CONTRACT_ADDRESS;
  const current_add_manager_template = {
    "jsonrpc": "3.0",
    "method": "chain_carbon",
     "params":[`opcode=carbon&subcode=removeToken&address=${platform_address}&addr1=${targetAddress}&name=${name}&type=0`, "encryp=none"],
      "id": `${sessionId}`};
  
  fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(current_add_manager_template),
  })
  .then(response => response.json())
  .then(data => {
    console.log('quick check current data',data);
    if (data.result.ret !== '0'){
      alert(data.result.err);
      setIsLoading(false);
      return;
    }
    console.log(data);
    
    const success = data.result.ret === '0';
    const txhash = data.result.content.txhash;
    
    
    
    console.log('txhash:', txhash);
    // return [wait_for_txhash(txhash), txhash];
    wait_for_txhash(txhash)
    .then(
      status_code => {
        let success = false;
      if (status_code === 2){
        alert("删除提交成功");
        setIsLoading(false);
         success = true;
      }else{
        console.log('status_code:', status_code);
        alert("删除提交失败");
        setIsLoading(false);
         success = false;
      }
      }
    )
    .then(
      () => {
        if (success){
          // setIsLoading(false);
          navigate('/CarbonA/PlatformDeployToken');
        }
        else{
          setIsLoading(false);
        
        }
        // setIsLoading(false);
      }
    )
  })

}

async function fetchTokenList (sessionId, address){
  // const platform_address = "0xa7f9a19d24c3f887f52b783eb37de2ee683cda9c";
  const platform_address = window.CARBON_CONTRACT_ADDRESS;
  const token_list_fetch_template = {
    "jsonrpc": "3.0",
    "method": "chain_carbon",
     "params":[`opcode=carbon&subcode=showPengindToken&address=${platform_address}&op=1`, "encryp=none"],
        "id": `${sessionId}`};
  let data = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(token_list_fetch_template),
  });
  
  data = await data.json();
  console.log('check pending token data')
  console.log(data);
  let token_list = data.result.content;
  return token_list;
}


function backHome(navigate) {
  navigate('/CarbonA/PlatformManagement');
  // navigate(-1);
}
export const PlatformDeleteToken = () => {
  const { sessionId } = useContext(SessionContext); // Get the sessionId from the context
  const { address} = useAddress();

  const [ TragetAddress, setTragetAddress ] = useState('');
  const [ Amount, setAmount ] = useState('');

  const { Balance, setBalance } = useBalance();

  const navigate = useNavigate();

  const [ isLoading, setIsLoading ] = useState(false);
  const [lockedAmount, setLockedAmount] = useState(0);
  const [data, setData] = useState({});

  const { language, translations } = useContext(LanguageContext);
  
  const [items, setItems] = useState([]); // Initialize state to hold your items

  const [selectedItem, setSelectedItem] = useState(null);

  const [shouldRefetch, setShouldRefetch] = useState(false);

  const [already_confirm, setAlreadyConfirm] = useState(false);

  const [carbonA_name, setCarbonAName] = useState('');

  useLoginRedirect();

  const fetchItems = async () => {
    try {
      // const response = await fetch('YOUR_API_ENDPOINT');
      // const response = await dummyFetch();
      const response = await fetchTokenList(sessionId, address);
      
      // const data = response;
      const data = response.Names.map(
        (name, index) => ({
          name: name,
          address: response.Addrs[index],
          op: response.Type[index]
        }));
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch items:', error);
    }
  };

  useEffect(() => {
    if (shouldRefetch){
      fetchItems();
      setShouldRefetch(false);
    }
  }, [shouldRefetch]);

  useEffect(() => {
    

    fetchItems();
  }, []);



  return (
    <div>
      {
        isLoading ? (<WaitingPage />) : (
          <div className="iphone-pro-platform-carbonA-platform-management">
      <div className="div-2">
        <img src="/svg/Vector.svg" className="back-img" onClick={() => {backHome(navigate)}}/>
        <div className="little-tittle">
            {translations['token_list_to_remove']}
          </div>
        <Language className="language-instance-2" property1="default" />

        <div className="scrollable-item-list">
        {items.map((item, index) => (
          <div key={index} className={`item ${selectedItem === item.address ? "selected" : "" }`}
          onClick = {
            () => {
              setSelectedItem(item.address);
              setCarbonAName(item.name);
              setAlreadyConfirm(!(item.op === 0));
            }
          }>
            {item.name} {/* Adjust this to match the structure of your items */}
          </div>
        ))}
      </div>
        
        
        
        {/* <Sbumit className="sbumit-add-plotform" textKey="add_platform_participation_management" onClick={() => {handleClick(Amount, address, TragetAddress, sessionId, Balance,data, setIsLoading, navigate, setBalance)}} /> */}
        {/* <Sbumit className="sbumit-delete-plotform" textKey="delete_platform_participation_management" onClick={() => {handleClick(Amount, address, TragetAddress, sessionId, Balance,data, setIsLoading, navigate, setBalance)}} /> */}
        
        <Sbumit className="sbumit-deploy-token" textKey="delete_token" onClick={() => {navigate('/CarbonA/RemoveToken')}} />
        <Sbumit className={`sbumit-upgrade-token ${already_confirm ? "disabled" : ""}`}
        active={!already_confirm}
        textKey="agree" 
        onClick={() => {
          if (! selectedItem){
            alert("请先选择一个代币");
            return;
          }
          handleClick(
          carbonA_name, selectedItem, sessionId, setIsLoading, setShouldRefetch
        );
        }} />
        {/* <Sbumit className="sbumit-add-minting" textKey="add_minting_address" onClick={() => {handleClick(Amount, address, TragetAddress, sessionId, Balance,data, setIsLoading, navigate, setBalance)}} /> */}
        {/* <Sbumit className="sbumit-minting-address" textKey="delete_minting_address" onClick={() => {handleClick(Amount, address, TragetAddress, sessionId, Balance,data, setIsLoading, navigate, setBalance)}} /> */}
        <div className="address-table">
        <Label className="address-table-label" textKey="address"/>
        <InputText className="address-table-text" text="Account" disabled={true} value={selectedItem}/>
      </div>
        
      </div>
    </div>
        )
      }
    </div>
  );
};
