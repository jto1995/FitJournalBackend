
exports.up = function(knex) {
  return knex.schema 
  .createTable('users', (table) => {
    table.uuid("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("password").notNullable();    
  })
  .createTable("workout", (table) => {
    table.uuid("id").primary();
    table
        .uuid("user_id")
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    table.string("exercise").notNullable();
    table.integer("sets").notNullable();
    table.integer("reps").notNullable();
    table.timestamp("created_at").date()
  })
  .createTable("weight", (table) => {
    table.uuid("id").primary();
    table
        .uuid("user_id")
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    table.integer("weight").notNullable();
    table.integer("bmi").notNullable();
    table.integer("height").notNullable();
    table.timestamp("created_at", true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("weight").dropTable("workout").dropTable("users");
};
