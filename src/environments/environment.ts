// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBeqSy4xHmKXGPKCBPN8E0WUlKCz2WYFcI",
    authDomain: "bakery-management-interface.firebaseapp.com",
    databaseURL: "https://bakery-management-interface.firebaseio.com",
    projectId: "bakery-management-interface",
    storageBucket: "bakery-management-interface.appspot.com",
    messagingSenderId: "1005147179685"
  }
};
