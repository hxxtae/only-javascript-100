export const API_END_POINT = 'https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev';

// Add: 여기에 캐시하기
const cache = {};

const request = async (url) => {
  if (cache[url]) {
    console.log(cache)
    return cache[url];
  }
  
  try {
    const res = await fetch(url);

    if(!res.ok) {
      return console.error(`${res.status}/${res.statusText}`);
    }
    const json = await res.json();
    cache[url] = json;
    return json;
  } catch (e) {
    console.error(`Search-Fetch Error: ${e.message}`);
  }
  // throw new Error('요청에 실패함', err);
}

export const fetchLanguage = async (keyword) => request(`${API_END_POINT}/languages?keyword=${keyword}`);

/*
[ 캐시하기 ]

간단하게 메모리를 통해 캐시를 할 수 있습니다.
그외에도 local storage나 session storage, 혹은 쿠키 등을 사용하는 방법도 있습니다만
캐시는 어떻게 만료시킬 것인가를 항상 고민해야 합니다.

무엇보다 중요한 것은 잘못된 응답값이나 에러값을 캐시하면 안 되는 부분인데, 
이렇게 될 경우 해당 캐시를 날리기 전까지 치명적인 에러가 발생하게 될 것입니다. 
이를 방지하려면 fetch 후의 response의 ok값을 검사하고, response의 데이터를 잘 검증한 후 캐시하는 작업이 필요할 것입니다.
*/
