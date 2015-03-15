System.config({
  "paths": {
    "app/*": "src/*.js",
    "github:*": "jspm_packages/github/*.js",
    "*": "*.js"
  },
  "traceurOptions": {
    "annotations": true,
    "types": true
  }
});

System.config({
  "map": {
    "angular/zone.js": "github:angular/zone.js@0.4.1",
    "angular2": "github:angular/angular@master/dist/js/prod/es5/angular2",
    "automattic/socket.io-client": "github:automattic/socket.io-client@1.3.5"
  }
});
