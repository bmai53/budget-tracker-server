const { Model } = require('objection')
const knex = require('../db/knex')

Model.knex(knex)

class Category extends Model {

    static get tableName() {
        return 'categories'
    }

    static get relationMappings() {

        const User = require('./userModel')

        return {
            category: {
                relation: Model.BelongsToOneRelation,    // one to many
                modelClass: User,
                join: {
                    from: 'categories.user_id',          // table columns
                    to: 'users.user_id'
                }
            }
        }
    }

    // get primary key column
    static get idColumn() {
        return 'category_id';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['category_id', 'user_id', 'name'],
            properties: {
                category_id: { type: 'integer', minLength: 1 },
                user_id: { type: 'integer', minLength: 1 },
                name: { type: 'string', minLength: 1, maxLength: 255 },
            }
        }
    }
}

module.exports = User