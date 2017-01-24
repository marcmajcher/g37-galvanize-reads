exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('books_authors', function(table) {
        table.increments();
        table.integer('book_id')
            .unsigned()
            .index()
            .references('id')
            .inTable('books')
            .onDelete('CASCADE');
        table.integer('authors_id')
            .unsigned()
            .index()
            .references('id')
            .inTable('authors')
            .onDelete('CASCADE');
        table.timestamps(true, true);
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('books_authors');
};
