
exports.up = function (knex) {
    return knex.schema.createTable("activities", (table) => {
        table.increments('id')
        table.integer('user_id').notNullable()
        table.foreign('user_id').references('users.id').onDelete('cascade');
        table.integer('category_id').notNullable()
        table.foreign('category_id').references('categories.id').onDelete('cascade');
        table.string('name', 255).notNullable()
        table.decimal('amount').notNullable()
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('activities')
};