exports.up = function (knex) {
    return knex.schema
      .createTable("users", tbl => {
        tbl.increments();
  
        tbl.string("username", 24).notNullable().unique().index();
        tbl.string("password", 256).notNullable();
        tbl.string("email", 128).notNullable();
      });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("users");
  };