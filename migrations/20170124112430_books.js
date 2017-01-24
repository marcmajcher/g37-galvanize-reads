"use strict";

exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('books', function(table) {
        table.increments();
        table.string('title');
        table.string('genre');
        table.text('description');
        table.string('cover_url');
        table.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('books');
};
