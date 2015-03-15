System.config({
  "baseURL": "/",
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js"
  }
});

System.config({
  "map": {
    "automattic/socket.io-client": "github:automattic/socket.io-client@1.3.5"
  }
});

