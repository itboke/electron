'use strict';
const {app} = require('electron');
const {BrowserWindow} = require('electron');
const http = require('http');
let mainWindow = null;


app.on('ready',()=>{
    mainWindow =  new BrowserWindow({width: 500, height: 400,frame:false,resizable:false});
    mainWindow.loadURL('file://' + __dirname + '/app/app.html');
})