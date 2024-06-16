
function getDateStr(date) {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are 0 based, so add 1 and format as 2 digits
    const day = ("0" + date.getDate()).slice(-2); // Format as 2 digits
    const formattedDate = `${year}${month}${day}`;
    return formattedDate;
  }
  
  function convertStr2Date(str) {
    const year = str.slice(0, 4);
    const month = str.slice(4, 6);
    const day = str.slice(6, 8);
    return new Date(`${year}-${month}-${day}`);
  }

export function check_start_date(start_date){
    if (start_date === undefined){
        return false;
    }
    const today = new Date();
    const start_date_obj = convertStr2Date(start_date);
    if (today.getTime() > start_date_obj.getTime()){
        return false;
    }
    return true;
}

export function check_end_date(start_date, end_date){
    if (end_date === undefined){
        return false;
    }
    const start_date_obj = convertStr2Date(start_date);
    const end_date_obj = convertStr2Date(end_date);
    if (start_date_obj.getTime() > end_date_obj.getTime()){
        return false;
    }
    return true;
}

export function check_lock_amount(lock_amount, total_amount){
    if (lock_amount === undefined){
        return false;
    }
    if (lock_amount <= 0){
        return false;
    }
    // if (lock_amount * 1000000000> total_amount){
    //     return false;
    // }
    return true;
}