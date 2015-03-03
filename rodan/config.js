System.config({
  "baseURL": "/",
  "transpiler": "babel",
  "paths": {
    "*": "*.js",
    "github:*": "libs/github/*.js",
    "npm:*": "libs/npm/*.js"
  },
  "shim": {
    "npm:backbone@1.1.2": {
      "deps": [
        "jquery"
      ]
    }
  }
});

System.config({
  "map": {
    "backbone": "npm:backbone@1.1.2",
    "backbone.marionette": "npm:backbone.marionette@2.4.1",
    "jquery": "npm:jquery@2.1.3",
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.0"
    },
    "npm:backbone.babysitter@0.1.6": {
      "backbone": "npm:backbone@1.1.2",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "underscore": "npm:underscore@1.6.0"
    },
    "npm:backbone.marionette@2.4.1": {
      "backbone": "npm:backbone@1.1.2",
      "backbone.babysitter": "npm:backbone.babysitter@0.1.6",
      "backbone.wreqr": "npm:backbone.wreqr@1.3.1",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "underscore": "npm:underscore@1.6.0"
    },
    "npm:backbone.wreqr@1.3.1": {
      "backbone": "npm:backbone@1.1.2",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "underscore": "npm:underscore@1.6.0"
    },
    "npm:backbone@1.1.2": {
      "process": "github:jspm/nodelibs-process@0.1.1",
      "underscore": "npm:underscore@1.6.0"
    },
    "npm:jquery@2.1.3": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    }
  }
});

