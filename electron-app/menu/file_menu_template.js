const electron = require('electron');
const fs = require('fs');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

exports.template = {
    label: 'File',
    submenu: [
        {
            label: 'Open learning result',
            accelerator: 'CmdOrCtrl+O',
            // click() handler set in electron-main.js
        },
    ]
};