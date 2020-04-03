exports.up = function(knex) {
  return knex.schema.createTable('covid', (table) => {
    table.increments('id').primary();
    table.date('report_date').notNullable();
    table.string('state').notNullable();
    table.integer('positive');
    table.integer('negative');
    table.integer('death');

    table.unique(['report_date', 'state']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('covid');
};
