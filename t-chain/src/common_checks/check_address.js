export function check_address(address) {
  if (address.length !== 42) {
    return false;
  }
  if (address.slice(0, 2) !== '0x') {
    return false;
  }
  return true;
}

