
exports.up = function (knex) {
    return knex.schema.createTable("activities", (table) => {
        table.increments('id')
        table.date('date').notNullable();
        table.integer('user_id').notNullable()
        table.foreign('user_id').references('id').inTable('users').onDelete('cascade');
        table.integer('category_id').notNullable()
        table.foreign('category_id').references('id').inTable('categories').onDelete('cascade');
        table.string('name', 255).notNullable()
        table.decimal('amount').notNullable()
        table.enu('type', ['income', 'expense']).notNullable()
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('activities')
};