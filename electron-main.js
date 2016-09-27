const fileMenu = require('./electron-app/menu/file_menu_template');
const editMenu = require('./electron-app/menu/edit_menu_template');
const devMenu =  require('./electron-app/menu/dev_menu_template');

const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

let setApplicationMenu = function () {
  
    let menus = [
      fileMenu.template, 
      editMenu.template, 
      devMenu.template
      ];

    Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

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

let setMenu = () => {
  fileMenu.template.submenu.find
}

let setFileMenu = () => {
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
            try{
                var jsonContent = JSON.parse(fileData);
                console.log(BrowserWindow.getFocusedWindow())
                mainWindow.webContents.on('did-finish-load', () => {
                      mainWindow.webContents.send('load-BN', jsonContent)
                });
            }catch(e){
                console.log(e); //There was an error while parsing
            }
        }); // readFile
    }); // showOpenDialog
        
}

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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
