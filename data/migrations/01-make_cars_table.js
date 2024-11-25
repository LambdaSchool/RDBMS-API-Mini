exports.up = function (knex) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments()

    tbl.string('vin', 17). notNullable().unique()

    tbl.string('make', 128)

    tbl.string('model', 256).notNullable()

    tbl.integer('mileage').unsigned().notNullable()

    tbl.string('title', 128)

    tbl.string('transmission', 128)
  })
};


exports.down = function (knex) {
  return knex.schema.dropTableIfExists('cars')
};
