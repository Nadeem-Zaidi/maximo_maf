# About your application

## Directory structure

- `src/app.xml` is your main application xml.
- `src/AppController.js` is a default simple Application Controller for your application.

All your source files should go in the `src` folder.

- `build/app/src` is where your generated application files will be put. You should never edit these files directly, since they are overwritten when you build. Make sure you edit your files in the `src` folder only.

## Initial setup and/or updating dependencies

Run `yarn` from the graphite root.

## Building the application

If you make changes to the files in the `src` folder, you must run the build command to rebuild the application.

```bash
yarn build
```

## Starting the development web server

While the application itself does not refer to `React` the underlying platform is built on `React` and uses the `React` build and test tools. To start the server you can run

```bash
yarn start
```

This will start a React development server (usually on port 3000) and then open your default web brwoser.

You can leave the `React` web server running, and then simply edit the `app.xml` and re-run the `yarn build` command to refresh your application.

In many cases, you might have 2 terminals open. The first terminal is used for rebuilding your application, and the second is running the development web server.

## Automatically rebuild the application when it changes

You can have the application automatically rebuild when it detects changes in the `src` folder.

```bash
yarn build --watch
```

Now, when you save changes in your IDE, the application is automatically rebuilt and the development web server will pick up those changes automatically.

## Understanding the role of IDs in your application

The `yarn build` command automatically adds `id` attributes to your xml elements. You can still manually specify your own `id`, but, if you don't provide an `id`, then one will generated for you. You can change an element's `id` later if you want, up until the point that you publish your application. Once an application is published the IDs should never changed, since, the automation testing and upgrade tools may depend on those IDs being static.

Some elements require an `id` to be explicitly set. ie, a `<page>` or `<maximo-datasource>` will require that you provide the `id` and it will not generate one. This is because some of these elements require human readable IDs since you'll be referencing them throughout your xml and Javascript code.

## Communicating with `Maximo` from the dev server

Eventually your application will be hosted within Maximo, but, for development you want to run your application locally while allowing it to communicate to a real Maximo server. The development server supports being able to proxy a Maximo server for development purposes. This process enables the local dev server to automatically route Maximo API requests to Maximo fully authenticated. To set this up, run the command

```bash
npx @maximo/maxdev-cli setup-proxy --help
```

The `setup-proxy` command will allow your to setup a proxy to your development or QA Maximo. This commands creates a `src/setupProxy.js` file that contains the proxy information. This file is never checked into source control, and you can freely edit this file, manually, if you want. If you change this file, then you need to restart the development server for the changes to take effect.

# Mobile application

## Install container

Install container pre-configured for your app. Find the installer at [pokgsa repo](http://pokgsa.ibm.com/projects/m/maximoanywhereplatform/Graphite/releases/released_to_qa/containers/android/).
After download, drag and drop the container into your emulator.

To use applications within Login container, the apps should be manually loaded.
Use `yarn build:production` and move its output to **[device/emulator]/data/data/com.ibm.iot.maximoanywhere.techmobile/files/www/apps/build**\_

_For installation with Navigator use [Maximo Login container](http://pokgsa.ibm.com/projects/m/maximoanywhereplatform/Graphite/releases/released_to_qa/containers/android/MobileLogin-7.6.4.1.apk)_

## Build your app for mobile

At application level, run a normal build;

```bash
yarn clean
yarn build
```

Add mobile feature to your app;

`npx @maximo/maxdev-cli add-feature mobile`

Make sure _build.properties_ have the proper credentials to build and upload the app to the pointed Maximo instance.

```text
serverUrl=http://localhost:7001/maximo
user=wilson
password=wilson
```

Run command to build for mobile and upload the app.
`yarn build:maximoMobile:all:dev`

## Debug mobile application

Access inspect session of chrome browser (for Android devices) at URL bar with `chrome://inspect`. Find the device/emulator your using and click on inspect button.

## Deploy application to test environment

1. Fetch the latest changes.

   ```bash
   git pull
   ```

2. Re-insert login page. Access src\app.xml and uncomment the login page.

3. Clean previous build

   ```bash
   yarn clean
   ```

4. Include mobile capabilities to the app and install dependencies.

   ```bash
   npx @maximo/maxdev-cli add-feature mobile
   yarn install --network-timeout 600000
   ```

5. Change build.properties to point to the correct server, being:

   ```text
   serverUrl=http://iotvmdb031.fyre.ibm.com:7001/maximo
   #or
   serverUrl=http://iotvmdb031.fyre.ibm.com:7003/maximo
   ```

6. Add extra memory for the build and run build commands.

   ```bash
   export NODE_OPTIONS=--max_old_space_size=8192
   yarn build
   yarn build:production
   ```

7. Last run command to build application for mobile and upload it to the server indicated by `build.properties`.

   ```bash
   yarn build:maximoMobile:all:dev
   ```
