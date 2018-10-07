// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    api_route: 'https://us-central1-milagros-0.cloudfunctions.net/',
    firebase: {
        apiKey: 'AIzaSyCJ34Xs-8b90IKaZKQU8VO2f0UhAq3uphI',
        authDomain: 'milagros-0.firebaseapp.com',
        databaseURL: 'https://milagros-0.firebaseio.com',
        projectId: 'milagros-0',
        storageBucket: 'milagros-0.appspot.com',
        messagingSenderId: '446343513689'
    },
    admin_mails: [
        'codatom.a@gmail.com'
    ],
    imgur: {
        route: 'https://api.imgur.com/3/image',
        client_id: '972ec9ff5da3db2'
    }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
