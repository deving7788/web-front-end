function genDeleteReqWithRefreshToken(url, body, refreshToken) {
  const request = new Request(url, {
  method: "DELETE",
  mode: "cors",
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${refreshToken}`,
  },
  body: body
  });

  return request;
}

export default genDeleteReqWithRefreshToken;
