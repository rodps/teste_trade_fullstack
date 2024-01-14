const env = {
  backendUrl: process.env.REACT_APP_BACKEND_URL ?? "http://localhost:3001",
  githubClientId: process.env.REACT_APP_GITHUB_CLIENT_ID ?? "",
  githubRedirectUri:
    process.env.REACT_APP_GITHUB_REDIRECT_URI ??
    "http://127.0.0.1:3000/oauth/github",
};

export { env };
