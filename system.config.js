System.config({
  "traceurOptions": {
    "types": true,
    "annotations": true,
    "memberVariables": true
  },
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  }
});

System.config({
  "map": {
    "automattic/socket.io-client": "github:automattic/socket.io-client@1.3.5",
    "traceur": "github:jmcriffey/bower-traceur@0.0.87",
    "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.87"
  }
});

