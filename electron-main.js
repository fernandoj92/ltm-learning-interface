const fileMenu = require('./electron-app/menu/file_menu_template');
const runMenu = require('./electron-app/menu/run_menu_template');
const editMenu = require('./electron-app/menu/edit_menu_template');
const devMenu =  require('./electron-app/menu/dev_menu_template');

const fs = require('fs')
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const ipcMain = electron.ipcMain

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, menu

let createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`)

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

let setApplicationMenu = () => {

  let menus = [
    fileMenu.template,
    runMenu.template, 
    //editMenu.template, 
    devMenu.template
  ];

  // Functionalities
 
 // ===== File menu ===== 
  menus[0].submenu
    .find(item => item.label === 'Open')
    .click = () => {
      console.log("Open - click called")

      var text = '{ "employees" : [' +
        '{ "firstName":"John" , "lastName":"Doe" },' +
        '{ "firstName":"Anna" , "lastName":"Smith" },' +
        '{ "firstName":"Peter" , "lastName":"Jones" } ]}';

      var obj = JSON.parse(text);
          mainWindow.webContents.send('open-file', obj)
        }

  menus[0].submenu
    .find(item => item.label === 'Save')
    .click = () => {
      console.log("Save - click called")
      mainWindow.webContents.send('save-file');
    }
  
  menus[0].submenu
    .find(item => item.label === 'Open file')
    .click = () => {
      console.log("Open file - click called")
      electron.dialog.showOpenDialog({ 
        title: 'Open a stored Bayesian network',
        filters: [{ name: 'text', extensions: ['json'] }],
        properties: ['openFile', 'createDirectory']
      }, 
      function(fileNames){
          if (fileNames === undefined) 
              return;
          let fileName = fileNames[0];
          fs.readFile(fileName, 'utf-8', function (err, fileData) {
              if(err)
                console.log("An error ocurred loading the file "+ err.message)

              try{
                  var jsonContent = JSON.parse(fileData);
                  mainWindow.webContents.send('load-ExecutionResult', jsonContent); 
                  console.log("load-ExecutionResult sent")
              }catch(e){
                  console.log(e); //There was an error while parsing
                  // TODO: instead of logging, send notification to the Angular 2 notification manager component
              }
          }); // readFile
      }); // showOpenDialog

    } // Open file click()
  
  // ===== Run menu ===== 
  menus[1].submenu
    .find(item => item.label === 'Approximate Bridged Islands')
    .click = () => {
      console.log("ABI - click called")
      mainWindow.webContents.send('run-abi', 'run-abi-void-msg-content');
    }
  
  menus[1].submenu
    .find(item => item.label === 'SALL')
    .click = () => {
      console.log("SALL - click called")
      mainWindow.webContents.send('run-sall');
    }
  // Create previously defined menus
  menu = Menu.buildFromTemplate(menus)
  Menu.setApplicationMenu(menu);
}

// ============================= IPC Main Event Handler =============================

ipcMain.on('export-ExecutionResult', (event, fileOutExecutionResult) => {
  console.log("export-ExecutionResult received")

  electron.dialog.showSaveDialog({ 
        title: 'Save the Execution result'
      }, function(fileName){

            if (fileName === undefined){
               console.log("You didn't save the file");
               return;
            }

            fs.writeFile(fileName+"."+fileOutExecutionResult.fileFormat, JSON.stringify(fileOutExecutionResult.executionResult), function (err) {
              if(err)
                  console.log("An error ocurred creating the file "+ err.message);
              else         
                console.log("The file has been succesfully saved");
            });
  });
})

// ==================================    APP    =====================================

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function(){

  setApplicationMenu();

  createWindow();
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})
