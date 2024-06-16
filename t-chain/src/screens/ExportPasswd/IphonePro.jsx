import React, {useState, useContext, useCallback} from "react";
import { Description } from "../../components/Description";
import { Language } from "../../components/Language";
import { Sbumit } from "../../components/Sbumit";
import { SingleChoice } from "../../components/SingleChoice";
 
import "./style.css";

import { useLoginRedirect } from '../../loginAuth';

// import {API_URL} from '../../config';

import bcrypt from 'bcryptjs';

import { SessionContext, useAuth } from "../../useAuth";
import { useNavigate } from 'react-router-dom';

import { WaitingPage } from "../WaitingPage";

import { LanguageContext } from "../../Language/LanguageContext";

import { usePassword } from "../../Contexts/PasswordContext";
const API_URL=window.TCHAIN_API_URL;
function export_account_password(sessionId, setFile1, setFile2) {
  // This function is not implemented, this is just a mock function for the purpose of the example
  console.log("Exporting account password");
  
  const current_export_template = {
    "jsonrpc": "3.0", 
    "method": "chain_exportKey", 
    "params": ["opcode=Account&subcode=export", 
    "encryp=none"], 
    "id": sessionId};
  fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(current_export_template),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    setFile1(data.result.content.file1);
    setFile2(data.result.content.file2);
  })
}

function export_keyStore(sessionId, setKeyStore) {
  // This function is not implemented, this is just a mock function for the purpose of the example
  console.log("Exporting key store");
  
  const current_export_template = { 
    "jsonrpc": "3.0", 
    "method": "chain_exportKeystore", 
    "params": ["opcode=Account&subcode=exportkey", "encryp=none"], 
    "id": sessionId};
  fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(current_export_template),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    setKeyStore(data.result.content.info);
  })
}

function export_Memo(sessionId, setMemo) {
  // This function is not implemented, this is just a mock function for the purpose of the example
  console.log("Exporting memo");
  
  const current_export_template = { 
    "jsonrpc": "3.0", 
    "method": "chain_exportKeystore", 
    "params": ["opcode=Account&subcode=exportMnem", "encryp=none"], 
    "id": sessionId};
  fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(current_export_template),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    setMemo(data.result.content.info);
  })

}

function backHome(navigate) {
  navigate('/Homepage');
}

export const ExportPasswd = () => {
  useAuth();
  const { translations } = useContext(LanguageContext);
  const { sessionId } = useContext(SessionContext); // Get the sessionId from the context
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [keyStore, setKeyStore] = useState(null);
  const [memo, setMemo] = useState(null);
  const navigate = useNavigate();
  useLoginRedirect();
  const [selectedOption, setSelectedOption] = useState("none");

  const { AlreadyPassword, setAlreadyPassword } = usePassword();
  const [isPromptOpen, setIsPromptOpen] = useState(false);

  const [password, setPassword] = useState('');



  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = async (selectedOption, sessionId) => {
    // Prompt the user for their password
  // const inputPassword = prompt("请再次输入密码:");
  // Hash the input password
  // const salt = bcrypt.genSaltSync(10);
  // const hashedInputPassword = bcrypt.hashSync(inputPassword, salt);
    switch (selectedOption) {
      case "one":
        export_Memo(sessionId, setMemo);
        setFile1('');
        setFile2('');
        setKeyStore('');

        break;
      case "two":
        export_keyStore(sessionId, setKeyStore);
        setMemo('');
        setFile1('');
        setFile2('');

        break;
      case "three":
        export_account_password(sessionId, setFile1, setFile2);
        setMemo('');
        setKeyStore('');

        break;
      default:
        console.log("No option selected");

  }
  
}

const PasswordPrompt = ({ isOpen, onClose, onConfirm }) => {
  const [password, setPassword] = useState('');

  if (!isOpen) {
    return null;
  }

  return (
    <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'gray', padding: '20px', borderRadius: '5px', zIndex: 100 }}>
      <p>{translations['please_enter_password_again']}</p>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
      />
      <button onClick={() => {
        onConfirm(password);
        onClose();
      }}>{translations['confirm']}</button>
      <button onClick={onClose}>{translations['cancel']}</button>
    </div>
  );
};
const usePrompt = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [promiseResolver, setPromiseResolver] = useState(null);

  const Passwordprompt = useCallback(() => {
    setIsOpen(true);
    return new Promise((resolve) => {
      setPromiseResolver(() => resolve);
    });
  }, []);

  const handleConfirm = useCallback((inputValue) => {
    if (promiseResolver) {
      promiseResolver(inputValue);
    }
    setIsOpen(false);
  }, [promiseResolver]);

  const handleClose = useCallback(() => {
    if (promiseResolver) {
      promiseResolver(null);
    }
    setIsOpen(false);
  }, [promiseResolver]);

  const PromptComponent = isOpen ? (
    <PasswordPrompt isOpen={isOpen} onClose={handleClose} onConfirm={handleConfirm} />
  ) : null;

  return { PromptComponent, Passwordprompt };
};

const { PromptComponent, Passwordprompt } = usePrompt();
const handleSubmit_New = async (select, sessionId, alreadyPassword) => {
  // Prompt the user for their password
  // const inputPassword = prompt("请再次输入密码:");
  // setIsPromptOpen(true);
  const inputPassword = await Passwordprompt();
  // Hash the input password
  // const salt = bcrypt.genSaltSync(10);
  // console.log('salt:', salt)
  const salt = "$2a$10$fXsWaI9SItNQjohNtraQC.";
  console.log('alreadyPassword:', alreadyPassword)
  if (!alreadyPassword){
    alert("请输入密码");
    return;
  }
  if (!inputPassword){
    alert("请输入密码");
    return;
  }
  const hashedInputPassword = bcrypt.hashSync(inputPassword, salt);
  console.log('hashedInputPassword:', hashedInputPassword)
  // console.log('alreadyPassword:', alreadyPassword)
  // Compare the input password with the stored hashed password
  if (!hashedInputPassword){
    alert("请输入密码");
    return;
  }
  if (hashedInputPassword === ""){
    alert("请输入密码");
    return;
  }
  
  if (!alreadyPassword){
    alert("请输入密码");
    return;
  }
  if (!bcrypt.compareSync(inputPassword, alreadyPassword)) {
    alert(" 密码错误，请重新输入");
    return; // Stop the function execution if the password is incorrect
  }
  switch (select) {
    case "one":
      export_Memo(sessionId, setMemo);
      setFile1('');
      setFile2('');
      setKeyStore('');

      break;
    case "two":
      export_keyStore(sessionId, setKeyStore);
      setMemo('');
      setFile1('');
      setFile2('');

      break;
    case "three":
      export_account_password(sessionId, setFile1, setFile2);
      setMemo('');
      setKeyStore('');

      break;
    default:
      console.log("No option selected");

}

}
const handleConfirm = (inputValue) => {
  setPassword(inputValue);
  // Handle the password input as needed
};
  return (
    <div className="iphone-pro-export">
      {PromptComponent}
      {/* <PasswordPrompt isOpen={isPromptOpen} onClose={() => setIsPromptOpen(false)} onConfirm={handleConfirm} /> */}
      <div className="div">
      <img src="/svg/Vector.svg" className="back-img" onClick={() => {backHome(navigate)}}/>
      <Language className="language-instance-2" property1="default" />
        {/* <div className="overlap-group">
          <img className="little-robot" alt="Little robot" src="/img/little-robot-1.png" onClick={()=>{backHome(navigate)}}/>
          <div className="overlap">
            <Language className="language-instance" property1="default" />
            <Description className="description-instance" property1="chinese" textKey='description'/>
          </div>
        </div> */}
        {/* <img className="img-export" alt="Little robot" src="/img/little-robot-2.png" /> */}
        {/* <Sbumit className="sbumit-instance-export" textKey="exportKey" onClick={() => {handleSubmit(selectedOption, sessionId)}}/> */}
        {/* <SingleChoice
          className="single-choice-component"
          selectedOption={selectedOption}
          onOptionChange={handleOptionChange}
          selectionOptionText="export_memo"
          selectionOptionText1="export_Keystore"
          selectionOptionText2="export_account_password"
        /> */}
        <Sbumit className="sbumit-instance-export_memo" textKey="export_memo" onClick={() => {setIsPromptOpen(true);handleSubmit_New('one', sessionId, AlreadyPassword)}}/>
        <Sbumit className="sbumit-instance-export_Keystore" textKey="export_Keystore" onClick={() => {handleSubmit_New('two', sessionId, AlreadyPassword)}}/>
        <Sbumit className="sbumit-instance-export_account_password" textKey="export_account_password" onClick={() => {handleSubmit_New('three', sessionId, AlreadyPassword)}}/>
        {file1 && file1 !== '' && <textarea className="textarea-file1" readOnly value={ (file1)} />}
        {file2 && file2 !== '' && <textarea className="textarea-file2" readOnly value={ (file2)} />}
        {keyStore && keyStore  !== '' && <textarea className='textarea-others' readOnly value={(keyStore)} />}
        {memo && memo !== '' && <textarea className='textarea-others' readOnly value={atob(memo)} />}
        {keyStore && <textarea className='note-instance' readOnly value={translations['please_keep_keyword_encrypt']}/>}
        {file1 && file1 !='' && file2 && file2 != '' && <textarea className='note-instance-2' readOnly value={translations['please_keep_file1_file2']}/>}
      </div>
    </div>
  );
};
