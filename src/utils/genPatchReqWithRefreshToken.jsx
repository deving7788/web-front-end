function genPatchReqWithRefreshToken(url, body, refreshToken) {
  const request = new Request(url, {
    method: "PATCH",
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

export default genPatchReqWithRefreshToken;
