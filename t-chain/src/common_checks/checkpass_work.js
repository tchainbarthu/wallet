export function check_password(password){
    if (password.length < 8){
        return false;
    }
    return true;
}

