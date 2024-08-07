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


const handleClick = (manager_name, targetAddress, sessionId, setIsLoading, navigate) => {
  // alert("转账成功");
  
  
  if (!check_address(targetAddress)) {
    alert ("地址格式错误");
    return;

  }

  
  
  const userConfirmation = window.confirm("确定删除吗？");

  if (!userConfirmation) {
    return;
  }
  setIsLoading(true);
  // const platform_address = "0xa7f9a19d24c3f887f52b783eb37de2ee683cda9c";
  const platform_address = window.CARBON_CONTRACT_ADDRESS;
  const current_add_manager_template = {
    "jsonrpc": "3.0",
    "method": "chain_carbon",
     "params":[`opcode=carbon&subcode=removeManager&address=${platform_address}&addr1=${targetAddress}`, "encryp=none"],
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
        
         success = true;
      }else{
        console.log('status_code:', status_code);
        alert("删除提交失败");
         success = false;
      }
      }
    )
    .then(
      () => {
        if (success){
          // setIsLoading(false);
          navigate('/CarbonA/PlatformDeleteManager');
        }
        else{
          setIsLoading(false);
        
        }
        // setIsLoading(false);
      }
    )
  })

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

async function fetchManagerList (sessionId, address){
  // const platform_address = "0xa7f9a19d24c3f887f52b783eb37de2ee683cda9c";
  const platform_address = window.CARBON_CONTRACT_ADDRESS;
  const token_list_fetch_template = {
    "jsonrpc": "3.0",
    "method": "chain_carbon",
    "params":[`opcode=carbon&subcode=showManager&address=${platform_address}`,
    //  "params":[`opcode=carbon&subcode=showPending&op=1&address=${platform_address}`,
       "encryp=none"],
        "id": `${sessionId}`};
  let data = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(token_list_fetch_template),
  });
  
  data = await data.json();
  console.log('check pending Manager data')
  console.log(data);
  let token_list = data.result.content;
  return token_list;
}


function backHome(navigate) {
  // navigate('/account/CarbonA');
  // navigate(-1);
  navigate('/CarbonA/PlatformDeleteManager');
}
export const CarbonADeleteManager = () => {
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

  const [ selectedItem, setSelectedItem ] = useState(null);

  const [ manager_name, setManagerName ] = useState('');

  const [ isSelf, setIsSelf ] = useState(false);

  const [textBoxValue, setTextBoxValue] = useState('');

  
  // const [already_confirm, setAlreadyConfirm] = useState(false);

  useLoginRedirect();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // const response = await fetch('YOUR_API_ENDPOINT');
        // const response = await dummyFetch();
        const response = await fetchManagerList(sessionId, address);
        // const data = await response.json();
        // const data = response.Addrs;
        const data = response.Names.map(
          (name, index) => ({
            name: name,
            address: response.Addrs[index]
          }));
        setItems(data);
      } catch (error) {
        console.error('Failed to fetch items:', error);
      }
    };

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
            {translations['member_list']}
          </div>
        <Language className="language-instance-2" property1="default" />

        <div className="scrollable-item-list">
        {items.map((item, index) => (
          <div key={index} className={`item ${selectedItem === item.address ? "selected" : ""}`}
          onClick= {
            () => {
              setSelectedItem(item.address);
              setManagerName(item.name);
              setIsSelf(item.address === address);
              setTextBoxValue(item.address);
              // setAlreadyConfirm(item.op !== 0);
            }
          }
          onDoubleClick={() => {
            setTextBoxValue(item.address);
          }}
          >
            {item.name} {/* Adjust this to match the structure of your items */}
          </div>
        ))}
        
      </div>

      {/* <InputText type="text" className="address-table" value={textBoxValue} disabled = {true} /> */}

      <div className="address-table">
        <Label className="address-table-label" textKey="address"/>
        <InputText className="address-table-text" text="Account" disabled={true} value={textBoxValue}/>
      </div>
        
        
        
        {/* <Sbumit className="sbumit-add-plotform" textKey="add_platform_participation_management" onClick={() => {handleClick(Amount, address, TragetAddress, sessionId, Balance,data, setIsLoading, navigate, setBalance)}} /> */}
        {/* <Sbumit className="sbumit-delete-plotform" textKey="delete_platform_participation_management" onClick={() => {handleClick(Amount, address, TragetAddress, sessionId, Balance,data, setIsLoading, navigate, setBalance)}} /> */}
        
        <Sbumit 
        className={`sbumit-deploy-token ${isSelf ? 'disabled' : ''}`}
        textKey="delete" 
        active = {!isSelf}
        onClick={() => {
          handleClick(
          manager_name, selectedItem, sessionId, setIsLoading, navigate);
          }} />
        <Sbumit className="sbumit-upgrade-token" textKey="cancel" onClick={() => {
          navigate('/CarbonA/PlatformDeleteManager');
          }} />
        {/* <Sbumit className="sbumit-add-minting" textKey="add_minting_address" onClick={() => {handleClick(Amount, address, TragetAddress, sessionId, Balance,data, setIsLoading, navigate, setBalance)}} /> */}
        {/* <Sbumit className="sbumit-minting-address" textKey="delete_minting_address" onClick={() => {handleClick(Amount, address, TragetAddress, sessionId, Balance,data, setIsLoading, navigate, setBalance)}} /> */}
        
        
      </div>
    </div>
        )
      }
    </div>
  );
};
