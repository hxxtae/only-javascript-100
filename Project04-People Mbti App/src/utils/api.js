const BASE_URL = './src/data/new_data.json';

const response = async (url) => {
    const res = await fetch(url);
    if(!res.ok) {
      throw Error('요청에 실패하였습니다.');
    }
    return res.json();
}

export const fetchData = () => response(BASE_URL);
