#dbp

![Build status](https://travis-ci.org/Aggouri/dbp-react.svg?branch=master)

This is a web front-end written in React/Redux which is used as part of an effort to demonstrate the power of an API-first infrastructure. All mock data shown in the app are either in the public domain or randomly generated.

Other components:
- The APIs (back-end), written in Golang, can be found in [dbpgo](https://github.com/Aggouri/dbpgo).
- There's also an iOS app, written in Swift 3, to be found in [dbp-ios](https://github.com/Aggouri/dbp-ios).

## Configuration
To override the back-end used by default, you need to define the ```PORT``` environment variable. Here is an example:

```
# Linux / macOS
PORT=3500 npm start


## Redux Dev Tools
When using the app in development, you can type ```ctrl+h``` to toggle the visibility of the redux development monitors. These monitors allow the following:

- inspecting the store (state) changes caused by each dispatched action
- disabling some of the past actions

You can navigate between the installed monitors with the ```ctrl+m``` shortcut and you can change the dock's position with the ```ctrl-w``` shortcut.

## Type checking with Flow
The project uses [Flow](https://flowtype.org) for static type checking. To run the type checking, execute the following command:
```
npm run flow
```

## Notes
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You will find detailed information on how to perform common tasks on the guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
