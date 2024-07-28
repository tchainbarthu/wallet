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
// import { QRCode } from 'qrcode.react';

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


async function fetchTokenList (sessionId, address){
  // const platform_address = "0xa7f9a19d24c3f887f52b783eb37de2ee683cda9c";
  const platform_address = window.CARBON_CONTRACT_ADDRESS;

  const token_list_fetch_template = {
    "jsonrpc": "3.0",
    "method": "chain_carbon",
     "params":[`opcode=carbon&subcode=showToken&address=${platform_address}`,
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
  // console.log('check real token data')
  // console.log(data);
  let token_list = data.result.content;
  return token_list;
}


function backHome(navigate) {
  navigate('/account/CarbonA');
  // navigate(-1);
}
export const PlatformManagement = () => {
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

  const [data_str, setDataStr] = useState('');
  // const [already_confirm, setAlreadyConfirm] = useState(false);



  useLoginRedirect();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // const response = await fetch('YOUR_API_ENDPOINT');
        // const response = await dummyFetch();
        const response = await fetchTokenList(sessionId, address);
        // const data = await response.json();
        // const data = response.Addrs;
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
        
        <Language className="language-instance-2" property1="default" />
          <div className="little-tittle">
            {translations['platform_token_list']}
          </div>
        <div className="scrollable-item-list">
        {items.map((item, index) => (
          <div key={index} className={`item ${selectedItem === item.address ? "selected" : ""}`}
          onClick={
            () => {
              setSelectedItem(item.address);
              // setAlreadyConfirm(item.op === 1);
            }
          }
          >
            {item.name} {/* Adjust this to match the structure of your items */}
          </div>
        ))}
      </div>
        
        
        
        <Sbumit className="sbumit-add-plotform" textKey="add_platform_participation_management" onClick={() => { navigate('/CarbonA/PlatformAddManager') }} />
        <Sbumit className="sbumit-delete-plotform" textKey="delete_platform_participation_management" onClick={() => {navigate('/CarbonA/PlatformDeleteManager') }} />
        
        <Sbumit className="sbumit-deploy-token" textKey="deploy_token" onClick={() => {navigate('/CarbonA/PlatformDeployToken') }} />
        
        <Sbumit className="sbumit-upgrade-token" textKey="delete_token" onClick={() => {navigate('/CarbonA/PlatformDeleteToken') }} />

        {/* <Sbumit className="sbumit-add-minting-1" textKey="add_minting_address" onClick={() => {navigate('/CarbonA/PlatformAddMintingAddress') }} /> */}

        {/* <Sbumit className="sbumit-delete-minting" textKey="delete_minting_address" onClick={() => {navigate('/CarbonA/PlatformDeleteMintingAddress') }} /> */}
        <Sbumit className="sbumit-add-minting-1" textKey="add_minting_address" onClick={() => { 
          if (selectedItem === null) {
            // alert('Please select a token');
            alert(translations['please_select_a_token_first']);
            return;
          }
          navigate('/CarbonA/PlatformAddMintingAddress', { state: {carbon_address: selectedItem} });
        }} />
        <Sbumit className="sbumit-delete-minting" textKey="delete_minting_address" onClick={
          () => { 
            if (selectedItem === null) {
              // alert('Please select a token');
              alert(translations['please_select_a_token_first']);
              return;
            }
            navigate('/CarbonA/PlatformDeleteMintingAddress', { state: {carbon_address: selectedItem} });
          }} 
          />

        
        
        
      </div>
    </div>
        )
      }
    </div>
  );
};
