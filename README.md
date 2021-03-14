# classproxima-proctoring-example

This is basic react starter kit to use `@classproxima/proctoring` package in your project

## Running

1. Follow instructions in `.npmrc.example`
2. Rename `.npmrc.example` to `.npmrc`
3. Run `npm install`
4. Replace `api-key` on line 25 in [App.js](./src/App.js) with the actual API-Key
5. Run `npm run start` to start the app
6. Navigate to [http://localhost:3000](http://localhost:3000)

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

```ts
const proctoring = new Proctor("api-key");
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

```ts
proctoring.once("page-to-background", () => {
  alert("Auto submitting quiz");
});
proctoring.on("no-face-found", () => {
  alert("Cannot detect face, make sure you are in the viewport");
});
```

## Supported Events

- `mouse-enter`
- `mouse-leave`
- `page-to-background`
- `page-back-to-foreground`
- `gaze-outside`
- `multiple-faces-found`
- `no-face-found`

## Bundled types

**`proctoringEvents`** - Array of all the supported events

Usage:

```typescript
import proctoring, { proctoringEvents } from "@classproxima/proctoring";
```
