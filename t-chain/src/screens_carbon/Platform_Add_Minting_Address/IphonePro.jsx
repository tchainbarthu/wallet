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
     "params":[`opcode=carbon&subcode=showPendingCoinage&address=${platform_address}&addr1=${address}&op=0`,
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





function backHome(navigate) {
  navigate('/Homepage');
}
export const PlatformAddMintingAddress = () => {
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

  useLoginRedirect();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // const response = await fetch('YOUR_API_ENDPOINT');
        // const response = await dummyFetch();
        // console.log('check location:', location);
        console.log('carbon_address:', carbon_address);
        const response = await fetchMintingList(sessionId, carbon_address);
        // const response = await fetchTokenList(sessionId, address);
        
        // const data = response;
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
          <div className="iphone-pro-platform-carbonA-platform-add-minging">
      <div className="div-2">
        <img src="/svg/Vector.svg" className="back-img" onClick={() => {backHome(navigate)}}/>
        <div className="little-tittle">
            {translations['token_list_to_deploy']}
          </div>
        <Language className="language-instance-2" property1="default" />

        <div className="scrollable-item-list">
        {items.map((item, index) => (
          <div key={index} className="item">
            {item.name} {/* Adjust this to match the structure of your items */}
          </div>
        ))}
      </div>
        
        
        
        {/* <Sbumit className="sbumit-add-plotform" textKey="add_platform_participation_management" onClick={() => {handleClick(Amount, address, TragetAddress, sessionId, Balance,data, setIsLoading, navigate, setBalance)}} /> */}
        {/* <Sbumit className="sbumit-delete-plotform" textKey="delete_platform_participation_management" onClick={() => {handleClick(Amount, address, TragetAddress, sessionId, Balance,data, setIsLoading, navigate, setBalance)}} /> */}
        
        <Sbumit className="sbumit-deploy-token" textKey="deploy_token" onClick={() => {navigate('/CarbonA/AddMinting', {state: {carbon_address: carbon_address}})}} />
        <Sbumit className="sbumit-upgrade-token" textKey="agree" onClick={() => {navigate('/CarbonA/DeleteManager')}} />
        {/* <Sbumit className="sbumit-add-minting" textKey="add_minting_address" onClick={() => {handleClick(Amount, address, TragetAddress, sessionId, Balance,data, setIsLoading, navigate, setBalance)}} /> */}
        {/* <Sbumit className="sbumit-minting-address" textKey="delete_minting_address" onClick={() => {handleClick(Amount, address, TragetAddress, sessionId, Balance,data, setIsLoading, navigate, setBalance)}} /> */}
        
        
      </div>
    </div>
        )
      }
    </div>
  );
};
