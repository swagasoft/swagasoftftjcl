These are Cordova resources. You can replace icon.png and splash.png and run
`ionic cordova resources` to generate custom icons and splash screens for your
app. See `ionic cordova resources --help` for details.

Cordova reference documentation:

- Icons: https://cordova.apache.org/docs/en/latest/config_ref/images.html
- Splash Screens: https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-splashscreen/



<base href="./" />
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
    - then npm run electron:win
