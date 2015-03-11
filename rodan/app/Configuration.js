var Configuration = {
    rodanServer: 'http://rodan-dev.simssa.ca',
    authenticationType: 'session',               // 'session' or 'token'
    authenticationToken: null
};

var Events = {
    RoutesLoaded: 'routesloaded',
    AuthenticationError: 'authenticationerror',
    AuthenticationSuccess: 'authenticationsuccess',
    UserMustAuthenticate: 'usermustauthenticate',
    UserCannotAuthenticate: 'usercannotauthenticate',
    ServerWentAway: 'serverwentaway',

    CurrentApplication: 'currentapplication'
};


export { Configuration, Events };