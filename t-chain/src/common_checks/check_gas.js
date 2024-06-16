export function check_gas(gas_value, transfer_value){
    // console.log('transfer_value:', transfer_value)
    // console.log('gas_value:', gas_value)
    transfer_value = transfer_value * 1000000000;
    if (transfer_value === null) {
        
        return false;
    }

    if (gas_value < transfer_value){
        return false;
    }
    if (transfer_value <= 0){
        return false;
    }
    return true;
}