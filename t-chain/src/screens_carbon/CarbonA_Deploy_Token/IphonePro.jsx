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
     "params":[`opcode=carbon&subcode=deployToken&address=${platform_address}&addr1=${targetAddress}&name=${name}&type=0`, "encryp=none"],
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



function backHome(navigate) {
  // navigate('/account/CarbonA');
  navigate(-1);
}
export const CarbonADeployToken = () => {
  const { sessionId } = useContext(SessionContext); // Get the sessionId from the context
  const { address} = useAddress();
  const [name, setName] = useState('');
  const [ TragetAddress, setTragetAddress ] = useState('');
  

  const navigate = useNavigate();

  const [ isLoading, setIsLoading ] = useState(false);

  const { language } = useContext(LanguageContext);
  
  useLoginRedirect();

  return (
    <div>
      {
        isLoading ? (<WaitingPage />) : (
          <div className="iphone-pro-transfer">
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
        <Label className="label-instance" textKey="address" />
        <InputText className={`input-text-instance ${language}`} text="Amount" onChange={e => { setTragetAddress(e.target.value); console.log('Account input changed:', e.target.value); }}/>
        </div>

        <div className="display-2">
        <Label className="design-component-instance-node" textKey="name"/>
        <InputText className={`input-text-2 ${language}`} text="Account" onChange={e => { setName(e.target.value); console.log('Amount input changed:', e.target.value); }}/>
          </div>

          <div className="display-3">
        <Label className="design-component-instance-node" textKey="address"/>
        <InputText className={`input-text-2 ${language}`} text="Account" onChange={e => { setTragetAddress(e.target.value); console.log('Amount input changed:', e.target.value); }}/>
          </div>
        {/* <img src="/svg/circle-transfer.svg" className="img"/>
        <img src="/svg/coin-transfer.svg" className="img-1"/> */}
        
        
        <Sbumit className="sbumit-instance" textKey="deploy" onClick={() => {handleClick(name, TragetAddress, sessionId, setIsLoading, navigate)}} />
        <Sbumit className="sbumit-instance-cancel" textKey="cancel" onClick={() => {navigate('/CarbonA/PlatformDeployToken')}} />
        
        
      </div>
    </div>
        )
      }
    </div>
  );
};
