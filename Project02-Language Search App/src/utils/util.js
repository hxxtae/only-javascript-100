const ACCESS_LOCAL_STORAGE = 'languagesState';

// Add: debounce 기법
export const debounce = (func, timeout = 300) => {
  let timer;
  return (val) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      // func.apply(this, val); // 호출 바인딩!!
      func(val); // 바인딩된 함수!!
    }, timeout);
  }
};


// Add: LocalStorage
// set
export const setLocalStorage = (obj = {}) => {
  localStorage.setItem(ACCESS_LOCAL_STORAGE, JSON.stringify(obj));
}

// get
export const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem(ACCESS_LOCAL_STORAGE));
}

// remove
export const removeLocalStorage = () => {
  localStorage.removeItem(ACCESS_LOCAL_STORAGE);
}

