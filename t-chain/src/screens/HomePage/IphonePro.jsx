import React from "react";
import { CurrentCoinType } from "../../components/CurrentCoinType";
import { DetailComponent } from "../../components/DetailComponent";
import { DisplayHead } from "../../components/DisplayHead";
import { HomePageButton } from "../../components/HomePageButton";
import { Property1Hover } from "../../icons/Property1Hover";

import { SessionContext, useAuth } from "../../useAuth";

import { useLoginRedirect } from '../../loginAuth';

import { HomeListComponet } from "../../components/HomeListComponet";

import { useNavigate, useLocation } from 'react-router-dom';

import { useState } from "react";

import { useAddress, AddressProvider } from '../../Contexts/AddressContext';

import { useBalance, BalanceProvider } from '../../Contexts/BalanceContext';

import { Description } from "../../components/Description";

import { Language } from "../../components/Language";
import { useAccount } from "../../Contexts/AccountContext";
import { useEffect } from "react";
import { Sbumit } from "../../components/Sbumit";
import "./style.css";

import { WaitingPage } from "../WaitingPage";

import { useGasValue, GasValueProvider } from '../../Contexts/GasValueContext';

import { useGasBuyValue, GasBuyValueProvider } from '../../Contexts/GasBugValueContext';
// import {API_URL} from '../../config';

const API_URL=window.TCHAIN_API_URL;

const handleListComponentClick = (selectedItem, setSelectedItem) => {
  console.log('Clicked');
  setSelectedItem(selectedItem);
};

const handleListComponentDoubleClick = (navigate, setSelectedItem) => {
  console.log('Double clicked');
  if (setSelectedItem === 1){
    navigate('/account');
  }
  else{
    navigate('/account/CarbonA')
  }
  
};

const handleDetailedComponentClick = (navigate) => {
  navigate('/account')
}


const handleHomePageButtonOnClick = (currentProfile, setCurrentProfile)=>{
  // console.log(currentProfile)
  setCurrentProfile(currentProfile);
}

export const Homepage = () => {
  useAuth();
  useLoginRedirect();
  const navigate = useNavigate();
  const [currentProfile, setCurrentProfile] = useState(1);
  const [selectedItem, setSelectedItem] = useState(1);
  const { address, setAddress } = useAddress();

  const { Balance, setBalance } = useBalance();
  const { GasValue, setGasValue } = useGasValue();
  const { GasBuyValue, setGasBuyValue } = useGasBuyValue();
  const { Account, setAccount } = useAccount();

  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async (current_address_query_template) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(current_address_query_template),
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    response.json().then(
      data => {
        console.log(data);
        // setAddress(data.result);
        if (data && data.result && data.result.content)
          {
            console.log('data exists');
            setBalance(data.result.content.Balance);
          setGasValue(data.result.content.GasValue);
          setGasBuyValue(data.result.content.GasBuyValue);
          } else{
            alert('数据解析失败');
            navigate('/login');
          }

  
  
      }
    );
    // return data;
  };

  const current_address_query_template = { 
    "jsonrpc": "3.0",
    "method": "chain_queryInfo", 
    "params":["pubChainQuery",`op=queryAddress&value=${address}<->latest`,"encryp=none"], 
    "id": "1"}
    // const location = useLocation();
    // console.log(location);
  useEffect(() => {
    
    fetchData(current_address_query_template)
    .then(() => {
      setIsLoading(false);
  })
  }
  , [address, isLoading]);
  
  return (
    <div>
      {isLoading ? (
        // <div>Loading...</div>) 
        <WaitingPage />
      ) :
        (
          <div className="iphone-pro-Homepage">
      <div className="div-2">
      {/* <div className="overlap-group-more">
        
      <div className="overlap-group-lan">
            <Language className="language-instance" property1="default" />
            <Description className="description-instance" textKey='description' />
        </div>
        <img className="little-robot" alt="Little robot" src="/img/little-robot-1.png" />
        </div> */}
      <img src="/svg/g_description.svg" className="description-instance"/>
      
        <Language className="language-instance-2" property1="default" />
        {/* <img src='/svg/HomePage-button1.svg' className="button1"/> */}

        <div className="overlap" onClick={() =>{
          if (selectedItem === 1){
            navigate('/account');
          }else{
            navigate('/account/CarbonA');
          }
        }}>
          <DisplayHead className="design-component-instance-node" 
          address={address} balance={Balance / 1000000000} img_src={
            selectedItem === 1 ? '/svg/t-chain-coin.svg' : '/img/carbon-v0.png'
          }
          description={
            selectedItem === 1 ? "TChain" : "CarbonA"
          }
          />
          {/* <DetailComponent className="detail-component-instance" onClick={()=>{handleDetailedComponentClick(navigate)}}/> */}
        </div>
        <div className="t-chain-coin-list">
          <div className="overlap-group-2">
            <HomeListComponet className="home-list-component-instance" 
            selected={selectedItem === 1}
            onClick={() => {handleListComponentClick(1, setSelectedItem)}}
            onDoubleClick={()=>{handleListComponentDoubleClick(navigate, 1)}}
            img_src='/svg/t-chain-coin.svg'
            name="TChain"
            description="TChain Platform Coin"
            />
            {/* <HomeListComponet className="home-list-componet-2" 
            selected={selectedItem === 2}
            img_src='/img/carbon-v0.png'
            onClick={() => {handleListComponentClick(2, setSelectedItem)}}
            onDoubleClick={()=>{handleListComponentDoubleClick(navigate, 2)}}
            name="CarbonA"
            description="CarbonA Platform Coin"
            /> */}
            {/* <HomeListComponet className="home-list-componet-3" 
            selected={selectedItem === 3}
            onClick={() => {handleListComponentClick(3, setSelectedItem)}}
            onDoubleClick={()=>{handleListComponentDoubleClick(navigate)}}/> */}
          </div>
          
        </div>
        {/* <div className="overlap-2">
          <CurrentCoinType className="design-component-instance-node" textKey={"T_chain_wallet"}/>
          <Property1Hover className="property-1-hover" color="white" stroke="black" />
          <Property1Hover className="property-1-hover" stroke="black" />
        </div> */}
        
        {/* <HomePageButton className="home-page-button-instance" textKey='HomePageWallet'
        onClick={()=>{handleHomePageButtonOnClick(1, setCurrentProfile)}}
        selected={currentProfile === 1}/> */}
        {/* <HomePageButton className="home-page-button-2"  textKey='HomePageMine' disabled={true}
        onClick={()=>{handleHomePageButtonOnClick(2, setCurrentProfile)}}
        selected={currentProfile === 2}/> */}
        {/* <Sbumit className="sbumit-instance-2" text="注册" textKey='check_details' onClick={()=>{handleDetailedComponentClick(navigate)}}/> */}
      </div>
    </div>
        )}
    </div>
  );
};
