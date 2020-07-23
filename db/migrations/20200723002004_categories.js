
exports.up = function(knex) {
    return knex.schema.createTable("categories", (table) => {
        table.increments('category_id')
        table.integer('user_id').notNullable()
        table.string('name', 255).notNullable()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('categories')
};
