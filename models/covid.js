let { Model, snakeCaseMappers } = require('objection');

class Covid extends Model {
  static get columnNameMappers() {
    /*
      In JavaScript we want camel case (e.g., createdAt), but
      in SQL we want snake case (e.g., created_at).
      snakeCaseMappers tells Objection to translate between
      the two.
    */
    return snakeCaseMappers();
  }

  static get tableName() {
    return 'covid';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'state',
        // 'date'
      ],
      properties: {
        report_date: { type: 'date' },
        state: { type: 'string', minLength: 1 },
        positive: { type: ['integer', 'null']},
        negative: { type: ['integer', 'null']},
        death: { type: ['integer', 'null']},
      }
    }
  }

  static get relationMappings() {
    // Code here to establish relations with other classes
  }

}

module.exports = Covid;
