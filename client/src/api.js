async function request(path, options = {}) {
  const url = `${process.env.REACT_APP_API_ORIGIN}${path}`;
  console.log(url);
  const response = await fetch(url, options);
  return response.json();
}

async function postRequest(path, jsonData) {
  const requestOptions ={
    method: 'POST',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify(jsonData)
  };
  return await request(path, requestOptions);
}

//ジャンケンリストを取得
export async function getJankenList(path){
  return await request(path);
}

//指定されたジャンケンを取得
export async function getJanken(path){
  return await request(path);
}

//ジャンケンの結果を送信
export async function postPlayJanken(path, win){
  return await postRequest(path, {win: win});
}

//ジャンケン製作の結果を送信
export async function postMakeJanken(path, title, rock, scissors, paper){
  return await postRequest(path, {title:title, rock:rock, scissors:scissors, paper:paper});
}