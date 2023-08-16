const BASE_URL = "./src/data.json";

const responose = async (url) => {
    const res = await fetch(url);
    
    if(res.ok) {
        const json = await res.json();
        console.log(json);
        return json;
    }
}

export const fetchEmployDatas = async () => responose(BASE_URL);
