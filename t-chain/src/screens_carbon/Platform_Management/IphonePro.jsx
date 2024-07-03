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



function backHome(navigate) {
  navigate('/Homepage');
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

  useLoginRedirect();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // const response = await fetch('YOUR_API_ENDPOINT');
        const response = await dummyFetch();
        // const data = await response.json();
        const data = response;
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
          <div key={index} className="item">
            {item.name} {/* Adjust this to match the structure of your items */}
          </div>
        ))}
      </div>
        
        
        
        <Sbumit className="sbumit-add-plotform" textKey="add_platform_participation_management" onClick={() => { navigate('/CarbonA/PlatformAddManager') }} />
        <Sbumit className="sbumit-delete-plotform" textKey="delete_platform_participation_management" onClick={() => {navigate('/CarbonA/PlatformDeleteManager') }} />
        
        <Sbumit className="sbumit-deploy-token" textKey="deploy_token" onClick={() => {navigate('/CarbonA/PlatformDeployToken') }} />
        <Sbumit className="sbumit-upgrade-token" textKey="upgrade_token" onClick={() => {navigate('/CarbonA/PlatformUpgradeToken') }} />
        <Sbumit className="sbumit-add-minting" textKey="add_minting_address" onClick={() => { }} />
        <Sbumit className="sbumit-minting-address" textKey="delete_minting_address" onClick={() => { }} />
        
        
      </div>
    </div>
        )
      }
    </div>
  );
};
