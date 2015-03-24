System.config({
  "paths": {
    "app/*": "src/*.js",
    "github:*": "jspm_packages/github/*.js",
    "*": "*.js",
    "github:angular*": "jspm_packages/github/angular/*.es6"
  },
  "traceurOptions": {
    "annotations": true,
    "types": true
  }
});

System.config({
  "map": {
    "angular/zone.js": "github:angular/zone.js@0.4.1",
    "angular2": "github:angular/angular@2.0.0-alpha.15/dist/js/prod/es6/angular2",
    "automattic/socket.io-client": "github:automattic/socket.io-client@1.3.5"
  }
});

