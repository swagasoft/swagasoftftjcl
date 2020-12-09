https://stackoverflow.com/questions/50641359/angular-material-v6-mat-footer-cannot-read-property-template-of-undefined


Raspberry pi running raspbian as print Server:


sudo apt-get install build-essential libudev-dev


npm i escpos escpos-usb --save


use 'lsusb -v' to figure out the vendor id and product id of the usb printer


Then do:
USB(vid, pid)
const escpos = require('escpos');
escpos.USB = require('escpos-usb');
 const usbDevice = new escpos.USB(0x01, 0xff);
 where 0x01 is vid and 0xff is pid in this case.


usermod -a -G lp pi
to give print rights to user pi


USEFUL RESOURCES

Angular module Architecture - https://youtu.be/-PxdKcpXuBk

Angular @ViewChild and ViewChildren - https://youtu.be/ITctqm-8F4M

RPI as print server (python) - https://www.youtube.com/watch?v=uv6D_BfPLzw

Desktop App resource  https://devdactic.com/ionic-desktop-electron/



CAPACITOR & ELECTRON

Setup
npm install ngx-electron electron
npm install electron-packager --save-dev
ionic integrations enable capacitor -- add capacitor to existing project
// If your template is not yet using Angular 9
ng update @angular/cli @angular/core --allow-dirty

// Needed to run once before adding Capacitor platforms
ionic build
npx cap add electron
npx cap open electron
Right now you might see an error – and to fix this quickly open the src/index.html and simply add a dot before the slash in this line (there is usually only a slash):

Now you can run a build again and copy all contents to your electron platform and launch the app again. These are the commands you need to run whenever you want to create an updated Electron build:

ionic build && npx cap copy

npx cap open electron

IN PACKAGE.JSON 
"electron:mac": "electron-packager ./electron SimonsApp --overwrite --platform=darwin --arch=x64 --prune=true --out=release-builds",
"electron:win": "electron-packager ./electron SimonsApp --overwrite --asar=true --platform=win32 --arch=ia32 --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName='Simons Electron App'"

With above you can do 'npm run electron:mac' or npm run electron:win

For windows executable to be created on macos,
-  brew cask install xquartz
- brew cask install wine-stable
- then npm run electron:mac