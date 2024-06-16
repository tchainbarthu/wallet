// import { API_URL } from "../config";
const API_URL = window.TCHAIN_API_URL;



function check_hash(txhash){
    const current_json_template = {
        "jsonrpc": "3.0",
        "method": "chain_queryInfo",
        "params":["pubChainQuery",`op=queryTx&hash=${txhash}`,"encryp=none"],
        "id": 1
    }
    return new Promise(
        (resolve, reject) => {
            fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(current_json_template),
            })
            .then(response => response.json())
            .then(data => {
                // console.log('Success:', data);
                // return data.result.content.status;
                resolve(data.result.content[0].status);
            })
            .catch(
                error => {
                    reject(error);
                }
            )
        }
    )
}

export const wait_for_txhash = async (txhash) => {
    let status_code = await check_hash(txhash);

    console.log(status_code);
    while(status_code !== 2 && status_code !== 3){
        await new Promise(r => setTimeout(r, 1000));
        status_code = await check_hash(txhash);
        console.log(status_code);
        if (status_code === 2 || status_code === 3){
            break;
        }
    }
    return status_code;

}
    