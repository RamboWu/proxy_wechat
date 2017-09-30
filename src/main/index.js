import { app, ipcMain, BrowserWindow } from 'electron' // eslint-disable-line
import Weixinbot from '../wechat/weixinbot';
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:9080'
    : `file://${__dirname}/index.html`;

function createWindow() {
    /**
   * Initial window options
   */
    mainWindow = new BrowserWindow({
        height: 563,
        useContentSize: true,
        width: 1000,
    });

    mainWindow.loadURL(winURL);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

let bot = null;

function initIPC() {
    ipcMain.on('qrcode_auth_opened', (event) => {
        bot = new Weixinbot();
        // 二维码信息获取到了
        bot.on('qrcode', (qrcodeUrl) => {
            event.sender.send('weixinbot:qrcode', qrcodeUrl);
            console.log(qrcodeUrl);
        });

        bot.on('qrcode_scaned', () => {
            event.sender.send('weixinbot:qrcode_scaned');
            console.log('二维码已经扫描');
        });

        bot.on('login_confirmed', () => {
            console.log('用户已经点击登录');
        });

        bot.on('friend', (msg) => {
            console.log(`${msg.Member.NickName}: ${msg.Content}`);
            bot.sendText(msg.FromUserName, 'Got it');
        });

        bot.on('logged_out', () => {
            console.log('用户已经登出');
        });
        bot.run();
    });

    ipcMain.on('qrcode_auth_closed', (event) => {
        bot = null;
    });
}

initIPC();
