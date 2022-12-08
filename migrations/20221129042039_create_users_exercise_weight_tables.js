const e = require("cors");

const timestamp = Date.now()
exports.up = function(knex) {
  return knex.schema
  .createTable('users', (table) => {
    table.uuid("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("password").notNullable();    
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
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
  .createTable("posts", (table) => {
    table.uuid("id").primary();
    table
      .uuid("user_id")
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.string("post").notNullable();
    table.integer("likes").defaultTo(0);
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
  .createTable("workouts", (table) => {
    table.uuid("id").primary();
    table
    .uuid("user_id")
    .references("id")
    .inTable("users")
    .onUpdate("CASCADE")
    .onDelete("CASCADE");
    table.string("workout_name").notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());

  })

  .createTable("exercises", (table) => {
    table.uuid("id").primary();
    table.string("category").notNullable();
    table.string("name").notNullable();
    table.integer("sets")
    table.integer("reps");
    table.integer("weight");
  })

  .createTable("workout_exercise", (table) => {
    table
    .uuid("workouts_id")
    .references("id")
    .inTable("workouts")
    .onUpdate("CASCADE")
    .onDelete("CASCADE");
    table
    .uuid("exercises_id")
    .references("id")
    .inTable("exercises")
    .onUpdate("CASCADE")
    .onDelete("CASCADE");
    table.primary(["workouts_id", "exercises_id"])

  })

};


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("exercises").dropTable("workout_exercise").dropTable("workouts").dropTable("posts").dropTable("weight").dropTable("users");
};
