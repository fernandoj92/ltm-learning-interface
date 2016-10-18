const electron = require('electron');
const fs = require('fs');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

exports.template = {
    label: 'Run',
    submenu: [
        {
            label: 'Approximate Bridged Islands',
            accelerator: 'CmdOrCtrl+A',
            // click() handler set in electron-main.js
        },
        {
            label: 'SALL',
            accelerator: 'CmdOrCtrl+S',
            // click() handler set in electron-main.js
        },
    ]
};