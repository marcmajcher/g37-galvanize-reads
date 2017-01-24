module.exports = {

    development: {
        client: 'pg',
        connection: {
            database: 'g37reads',
            host: 'localhost'
        }
    },

    test: {
        client: 'pg',
        connection: {
            database: 'g37reads-test',
            host: 'localhost',
        }
    },

    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
    }

    // production: {
    //   client: 'postgresql',
    //   connection: {
    //     database: 'my_db',
    //     user:     'username',
    //     password: 'password'
    //   },
    //   pool: {
    //     min: 2,
    //     max: 10
    //   },
    //   migrations: {
    //     tableName: 'knex_migrations'
    //   }
    // }

};
