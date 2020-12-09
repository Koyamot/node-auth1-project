exports.seed = function (knex) {
  // 000-cleanup.js already cleaned out all tables

  const users = [
    {
      username: "admin", // will get id 1
      password: "password",
      email: "email@email.com"
    },
    {
      username: "user", // will get id 2
      password: "password",
      email: "email@email.com"
    },
  ];

  return knex("users")
    .insert(users)
    .then(() => console.log("\n== Seed data for users table added. ==\n"));
};