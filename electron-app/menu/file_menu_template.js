const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

exports.template = {
    label: 'File',
    submenu: [{
        label: 'Open learning result',
        accelerator: 'CmdOrCtrl+O',
        click: function () {
            electron.dialog.showOpenDialog({ 
              title: 'Open a stored Bayesian network',
              filters: [{ name: 'text', extensions: ['json'] }],
              properties: ['openFile', 'createDirectory']
            }, 
            function(filenames){
                if (fileNames === undefined) 
                    return;
                let fileName = fileNames[0];
                fs.readFile(fileName, 'utf-8', function (err, fileData) {
                    try{
                        var jsonContent = JSON.parse(fileData);
                        mainWindow.webContents.on('did-finish-load', () => {
                            mainWindow.webContents.send('load-BN', jsonContent)
                        });
                    }catch(e){
                        console.log(e); //There was an error while parsing
                    }
                }); // readFile
            }); // showOpenDialog
        }
    },
    ]
};