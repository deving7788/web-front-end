
function genGetReq(url) {
  const request = new Request(url, {
    method: "GET",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
  });

  return request;
}

export default genGetReq;
