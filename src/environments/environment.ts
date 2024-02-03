// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCnEMtHpsign_S78Jn93XxMPOxvw0gB96s",
    authDomain: "aboutcambodia-a1c89.firebaseapp.com",
    databaseURL: "https://aboutcambodia-a1c89-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "aboutcambodia-a1c89",
    storageBucket: "aboutcambodia-a1c89.appspot.com",
    messagingSenderId: "752303778292",
    appId: "1:752303778292:web:80539d70386bfa024771a1",
    measurementId: "G-S2FCS9HBMQ"
  }
};


const app = initializeApp(environment?.firebase);
const analytics = getAnalytics(app);
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
