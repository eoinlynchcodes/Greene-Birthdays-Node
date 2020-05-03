
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('familyMembers').del()
    .then(function () {
      // Inserts seed entries
      return knex('familyMembers').insert([
        { name: "Eoin Lynch", dateOfBirth: "1995-09-14" }
      ]);
    });
};
