
function genGetReqWithRefreshToken(url, token) {
  const request = new Request(url, {
    method: "GET",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  return request;
}


export default genGetReqWithRefreshToken;
