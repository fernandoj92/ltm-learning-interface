const electron = require('electron');
const fs = require('fs');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

exports.template = {
    label: 'File',
    submenu: [
        {
            label: 'Open',
            accelerator: 'CmdOrCtrl+O',
            // click() handler set in electron-main.js
        },
        {
            label: 'Save',
            accelerator: 'CmdOrCtrl+S',
            // click() handler set in electron-main.js
        },
        {
            label: 'Open file',
            accelerator: 'CmdOrCtrl+U',
            // click() handler set in electron-main.js
        },
    ]
};