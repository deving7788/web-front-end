
function genPostReq(url, body) {
  const request = new Request(url, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: body,
  });

  return request;
}

export default genPostReq;
