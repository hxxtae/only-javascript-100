import { COMMON_PATH } from './path.js';

const cache = new Map();

const response = async (url) => {
  const res = await fetch(url).catch((err) => {
    alert('요청에 실패하였습니다. 다시 시도해주세요.');
    throw new Error(err);
  });
  return res.json();
}

export const fetchData = async (nodeId = '0') => {
  if(cache.get(nodeId)) return cache.get(nodeId);
  const data = await response(`${COMMON_PATH}${nodeId !== '0' ? nodeId : ''}`).catch((err) => {
    throw new Error(err);
  });
  cache.set(nodeId, data);
  return data;
}

