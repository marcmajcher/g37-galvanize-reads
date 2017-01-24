"use strict";

exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('authors', function(table) {
        table.increments();
        table.string('first_name')
            .notNullable();
        table.string('last_name')
            .notNullable();
        table.text('auth_bio')
            .notNullable();
        table.string('auth_url')
            .notNullable();
        table.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('authors');
};
