// config.js
// export const API_URL = 'https://www.trc100.com:8080';
// export const API_URL = 'https://103.147.14.84:39001';
// export const API_URL = '';
// export const DATABASE_ROOT='http://localhost:8082';
// export const DATABASE_ROOT="https://103.147.14.84:39002";
// export const DATABASE_ROOT="http://120.78.142.134:3001";
// export const API_URL = 'https://www.trc100.com/t_chain_api/';
// export const DATABASE_ROOT="https://www.trc100.com/database_api/";
// export const API_URL= 'https://103.147.14.84:80/t_chain_api';
// export const DATABASE_ROOT= 'https://103.147.14.84:80/database_api';
export const API_URL = process.env.TCHAIN_API_URL || 'http://localhost:8081/t_chain_api/';
export const DATABASE_ROOT = process.env.TCHAIN_DATABASE_ROOT || 'http://localhost:8081/database_api/';
export const REQUEST_SESSION_TEMPLATE = {
    "jsonrpc": "3.0",
    "method": "chain_getKey",
    "params": [],
    "id": 1
};

export const REGISTER_TEMPLATE = { 
    "jsonrpc": "3.0", 
    "method": "chain_register", 
    "params":["opcode=Account&subcode=Regsiter&account={}&pass={}&refer=", "encryp=none"], 
    "id": ""}

export const LOGIN_TEMPLATE = {
    "jsonrpc": "3.0", 
    "method": "chain_logon", 
    "params":["opcode=Account&subcode=Logon&account=jwang_test_web7&pass=12345678", "encryp=none"], 
    "id": "cd97bab762ef54c35faf7c13"}

export const EXPORT_MNEM_TEMPLATE = { 
    "jsonrpc": "3.0", 
    "method": "chain_exportKeystore", 
    "params": ["opcode=Account&subcode=exportMnem", "encryp=none"], 
    "id": "aa80aa0c6bb0c7d81ac7e5b3"}

export const ADDRESS_QUERY_TEMPLATE = { 
    "jsonrpc": "3.0",
    "method": "chain_queryInfo", 
    "params":["pubChainQuery","op=queryAddress&value=0x053288e276ee77e231e306332b2c88283796be45<->latest","encryp=none"], 
    "id": "1"}


export const TRANSFER_TEMPLATE = {
    "jsonrpc": "3.0", 
    "method": "chain_sendTransaction", 
    "params": [
    { "from": "0xc3b6472d6370eaf4eb58fff19ce1724c9d61892c", 
    "to": "0x6268af5542c4b0ccbb650a0aaccbfcdfbabf6b52",
    "value": "0x2E90EDD00"
    }, "", "encryp=none"], 
    "id": "d2c8fe196f9f8d8ace952e9e"}
