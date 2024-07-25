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
import { useNavigate, useLocation } from 'react-router-dom';
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

async function fetchMintingList (sessionId, address){
  // const platform_address = "0xa7f9a19d24c3f887f52b783eb37de2ee683cda9c";
  const platform_address = window.CARBON_CONTRACT_ADDRESS;
  const token_list_fetch_template = {
    "jsonrpc": "3.0",
    "method": "chain_carbon",
     "params":[`opcode=carbon&subcode=showPendingCoinage&address=${platform_address}&addr1=${address}&op=1`,
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
  console.log('check pending token data')
  console.log(data);
  let token_list = data.result.content;
  return token_list;
}

const handleClick = (manager_name,carbon_address, targetAddress, sessionId, setIsLoading, navigate) => {
  // alert("转账成功");
  
  console.log('check carbon_address_2:', carbon_address);
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
     "params":[`opcode=carbon&subcode=removeCoinage&address=${platform_address}&addr1=${carbon_address}&addr2=${targetAddress}&name=${manager_name}`, "encryp=none"],
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
        alert("添加提交成功");
        
         success = true;
      }else{
        console.log('status_code:', status_code);
        alert("添加提交失败");
         success = false;
      }
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



function backHome(navigate) {
  // navigate('/account/CarbonA');
  navigate(-1);
}
export const PlatformDeleteMintingAddress = () => {
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

  const location = useLocation();
  const { carbon_address } = location.state || {}; // Access the address from state, with a fallback to an empty object

  const [ selectedItem, setSelectedItem ] = useState(null);

  const [ managerName, setManagerName ] = useState('');

  const [ already_confirm, setAlreadyConfirm ] = useState(false);
  useLoginRedirect();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // const response = await fetch('YOUR_API_ENDPOINT');
        // const response = await dummyFetch();
        // console.log('check location:', location);
        // console.log('carbon_address:', carbon_address);
        const response = await fetchMintingList(sessionId, carbon_address);
        // const response = await fetchTokenList(sessionId, address);
        
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
            {translations['pending_address_to_delete']}
          </div>
        <Language className="language-instance-2" property1="default" />

        <div className="scrollable-item-list">
        {items.map((item, index) => (
          <div key={index} className={`item ${selectedItem === item.address ? "selected" : ""}`}
          onClick={
            () => {
              setSelectedItem(item.address);
              setManagerName(item.name);
              setAlreadyConfirm(item.op !== 0);
            }
          }
          
          >
            {item.name} {/* Adjust this to match the structure of your items */}
          </div>
        ))}
      </div>
        
        
        
        {/* <Sbumit className="sbumit-add-plotform" textKey="add_platform_participation_management" onClick={() => {handleClick(Amount, address, TragetAddress, sessionId, Balance,data, setIsLoading, navigate, setBalance)}} /> */}
        {/* <Sbumit className="sbumit-delete-plotform" textKey="delete_platform_participation_management" onClick={() => {handleClick(Amount, address, TragetAddress, sessionId, Balance,data, setIsLoading, navigate, setBalance)}} /> */}
        
        <Sbumit className="sbumit-deploy-token" textKey="delete_address" onClick={() => {navigate('/CarbonA/DeleteMinting', {state:{carbon_address: carbon_address}})}} />
        <Sbumit className={`sbumit-upgrade-token ${already_confirm ? "disabled" : ""}`} textKey="agree" 
        active={!already_confirm}
        disabled={already_confirm}
        onClick={() => {
          handleClick
            (managerName,carbon_address, selectedItem, sessionId, setIsLoading, navigate)

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
