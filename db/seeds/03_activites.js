
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('activities').del()
    .then(function () {
      // Inserts seed entries
      return knex('activities').insert([
        {user_id: 1, category_id: 1, name: 'test purchase', amount: 10.50},
      ]);
    });
};
