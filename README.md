# CLock Screen Saver
This is a small utility app that provides a minimalistic landing experience.

Uses Vanilla JS for both the app portion ([Electron](https://electronjs.org/)) and the UI frontend ([React](https://reactjs.org/)).

## Landing Preview
![App Landing](https://user-images.githubusercontent.com/79176075/217884272-1ac0ca6b-7e0e-4502-8279-1bfa8975cb52.png)

_Shoutout to [@Scoder12](https://github.com/Scoder12) for help with animations :)_

---
## Usage
### Dev
`$ npm i` + `$ npm run dev`
- spins up a React Development Server and runs Electron in dev mode.
### Prod
`$ npm i` + `$ npm run build` + (`$ electron-bundler .` | `YOUR_BUILD_SYSTEM_HERE`)
- compiles and minifies React JSX, then bundles the app as a .exe 

---
Enjoy ⏰
