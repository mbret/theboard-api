'use strict';

/**
 * Passport configuration
 *
 * This is the configuration for your Passport.js setup and it where you'd
 * define the authentication strategies you want your application to employ.
 *
 * Authentication scopes can be set through the `scope` property.
 *
 * For more information on the available providers, check out:
 * http://passportjs.org/guide/providers/
 */

module.exports.passport = {

    // Used to hash password
    bcrypt: {
        rounds: 8
    },

    // Used to generate json web token
    jwt: {
        secret: 'cfb30a124904ef2bf7de83d7f85e4f51',
        options: {
            expiresInSeconds: false, // Time interval in minutes when token will be expired or false if not expires
            algorithm: "HS256" // Algorithm that using for signing JWT
        }
    },

    // Used to authenticate request using several strategies
    strategies: {

        local: {
            strategy: require('passport-local').Strategy,
            options: {
                // Since we need to allow users to login using both usernames as well as
                // emails, we'll set the username field to something more generic.
                usernameField: 'email',
                passwordField: 'password'
            }
        },

        basic: {
            strategy: require('passport-http').BasicStrategy,
            protocol: 'basic'
        },

        //google: {
        //    name: 'Google',
        //    protocol: 'oauth2',
        //    strategy: require('passport-google-oauth').OAuth2Strategy,
        //    options: {
        //        clientID: 'your-client-id',
        //        clientSecret: 'your-client-secret',
        //        scope: ['profile', 'email']
        //    }
        //},
        //twitter: {
        //    name: 'Twitter',
        //    protocol: 'oauth',
        //    strategy: require('passport-twitter').Strategy,
        //    options: {
        //        consumerKey: 'your-consumer-key',
        //        consumerSecret: 'your-consumer-secret'
        //    }
        //},
        //github: {
        //    name: 'GitHub',
        //    protocol: 'oauth2',
        //    strategy: require('passport-github').Strategy,
        //    options: {
        //        clientID: 'your-client-id',
        //        clientSecret: 'your-client-secret'
        //    }
        //},
        //facebook: {
        //    name: 'Facebook',
        //    protocol: 'oauth2',
        //    strategy: require('passport-facebook').Strategy,
        //    options: {
        //        clientID: 'your-client-id',
        //        clientSecret: 'your-client-secret'
        //    }
        //},
        //youtube: {
        //    name: 'Youtube',
        //    protocol: 'oauth2',
        //    strategy: require('passport-youtube').Strategy,
        //    options: {
        //        clientID: 'your-client-id',
        //        clientSecret: 'your-client-secret'
        //    }
        //},
        //'youtube-v3': {
        //    name: 'Youtube',
        //    protocol: 'oauth2',
        //    strategy: require('passport-youtube-v3').Strategy,
        //    options: {
        //        clientID: 'your-client-id',
        //        clientSecret: 'your-client-secret',
        //        // Scope: see https://developers.google.com/youtube/v3/guides/authentication
        //        scope: [ 'https://www.googleapis.com/auth/youtube.readonly' ],
        //    }
        //},
    }

};