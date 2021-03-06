/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */

if(require){
  System.set('electron', System.newModule(require('electron')));
}

(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',
      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      // other libraries
      'rxjs':                       'npm:rxjs',
      'd3': 'node_modules/d3/d3.min.js',
      'angular2-websocket/angular2-websocket': 'node_modules/angular2-websocket/angular2-websocket.js',
      'ng2-bs3-modal': 'node_modules/ng2-bs3-modal',
      'moment': 'node_modules/moment/moment.js',
      'ng2-validation': 'node_modules/ng2-validation/dist'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      'app': {
        main: './main.js',
        defaultExtension: 'js'
      },
      'rxjs': {
        defaultExtension: 'js'
      },
      'd3': {
        defaultExtension: "js"
      },
      'ang2-websocket':{
        defaultExtension: "js"
      },
      'ng2-bs3-modal':{
        defaultExtension: "js"
      },
      'ng2-validation':{
        main: 'index.js',
        defaultExtension: "js"
      }
    }
  });
})(this);