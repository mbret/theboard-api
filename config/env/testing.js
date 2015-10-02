/**
 * Testing environment settings
 *
 */

module.exports = {

    // testing hook
    testing: {
        activated: true
    },

    models: {
        migrate: 'drop'
    },

    log: {
        level: 'warn'
    },

    passport: {
        strategies: {
            jwt: {
                options:{
                    secretOrKey: '0123456789',
                }
            }
        }
    }

};
