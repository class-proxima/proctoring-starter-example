# classproxima-proctoring-example

This is basic react starter kit to use `@classproxima/proctoring` package in your project

## Running

1. Follow instructions in `.npmrc.example`
2. Rename `.npmrc.example` to `.npmrc`
3. Run `npm install`
4. Replace `api-key` on line 25 in [App.js](./src/App.js) with the actual API-Key
5. Run `npm run start` to start the app
6. Navigate to [http://localhost:3000](http://localhost:3000)

# Class Proxima proctoring

NPM package to integrate class-proxima proctoring services in your web app.

## Supports

- ReactJS
- SvelteJS
- AngularJS
- VueJS
- Any other frontend javascript library and framework

The package includes bundled types and can be used in both javascript and typescript.

## Authorization

After purchasing the license you will receive

- NPM Token
- API Key
- NPM Password

### Installing the package

Create a `.npmrc` file on the same level as `package.json` with the under mentioned text and replace `NPM TOKEN` with the npm token you recieved.

```
@classproxima:registry=https://npm.class-proxima.com/
//npm.class-proxima.com/:_authToken="NPM Token"
```

Next you can run `npm i @classproxima/proctoring` to install the package

**Troubleshoot:** If you cannot install the package try deleting `package-lock.json/yarn.lock` file and running the install command again.

### Using the package

```typescript
import proctoring from "@classproxima/proctoring";
```

## API reference

### `constructor`

|      Argument      |    Type    | Required | Default |                              Description                              |
| :----------------: | :--------: | :------: | :-----: | :-------------------------------------------------------------------: |
|    User Config     | userConfig |   Yes    |    -    |                                   -                                   |
| getRealTimeUpdates |  boolean   |    No    |  false  | Allows user to set realtime proctoring event callback using `on/once` |

`userConfig` is an object with fields

|     Key      |  Type  | Required |
| :----------: | :----: | :------: |
|  studentUID  | string |   Yes    |
|    apiKey    | string |   Yes    |
| activityUID  | string |   Yes    |
| activityName | string |    No    |

```ts
const proctoring = new Proctor(
  {
    studentUID: "student123",
    apiKey: "api-key",
    activityUID: "activity456",
    activityName: "demo-activity",
  },
  false
);
```

**Note:** Replace `api-key` with the actual API Key you received

### `startMonitoring`

```ts
async startMonitoring(){
    const monitoringStatus = await proctoring.startMonitoring();
    if(monitoringStatus.status)
        console.info("Monitoring service started")
    else console.error(monitoringStatus.error);
}
```

### `stopMonitoring`

```ts
proctoring.stopMonitoring();
```

### `on` / `once`

`on` - Listen to events multiple times  
`once` - Listen to a particular event only once

**Note**: This feature requires `getRealTimeUpdates` to be true in constructor

#### Supported Realtime Events

- `mouse-enter`
- `mouse-leave`
- `page-to-background`
- `page-back-to-foreground`
- `multiple-faces-found`
- `no-face-found`

```ts
proctoring.once("page-to-background", () => {
  alert("Auto submitting quiz");
});
proctoring.on("no-face-found", () => {
  alert("Cannot detect face, make sure you are in the viewport");
});
```

### Listening to error

You can also listen to error related to api quota exhaustion and unauthorised request. Currently there are 2 error events you can listen to

- `unauthorised-user`
- `quota-limit-reached`

```ts
proctoring.on("unauthorised-user", () => {
  // Code to handle it
});
proctoring.on("quota-limit-reached", () => {
  // Code to handle it
});
```

## Bundled types

**`realtimeEvents`** - Array of all the supported events

Usage:

```typescript
import proctoring, { realtimeEvents } from "@classproxima/proctoring";
```

## Limitation

Currently we do not support server side rendering.

## Starter kit

We have created a starter kit for you to test and easily understand the workings of the module. You can view the starter kit [here](https://github.com/class-proxima/proctoring-starter-example)
