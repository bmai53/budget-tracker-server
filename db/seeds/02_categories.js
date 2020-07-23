
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        { user_id: 1, name: 'test_category_1' },
        { user_id: 1, name: 'test_category_2' },
      ]);
    });
};
