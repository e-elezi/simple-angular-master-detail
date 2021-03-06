// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  graphql: {
    url: 'https://api.github.com/graphql',
    token: '7bfd17677470204b52e0c627f508d1247b0739ad'
  },
  githubRestApi: {
    url: "https://api.github.com",
    headers: {
      'Accept': 'application/vnd.github.v3+json'
    }
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
