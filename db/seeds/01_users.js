
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          email: 'test@test.com',
          password: '$2b$10$LOCALXSbbG6cLQP2qYgNPOpKpEviYJIzBpUidX2BIxTwRrVP9MRFG'
        }
      ]);
    });
};
