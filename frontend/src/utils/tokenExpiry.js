// tokenExpiry.js
const setItemWithExpiry = (key, value, expiryInMinutes = 1440) => {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + expiryInMinutes * 60 * 1000, // Convert minutes to milliseconds
    };
    localStorage.setItem(key, JSON.stringify(item));
  };
  
  const getItemWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  };
  
  // Correctly exporting both functions
  export { setItemWithExpiry, getItemWithExpiry };
  