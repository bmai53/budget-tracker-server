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
            user: {
                relation: Model.BelongsToOneRelation,    // one to one
                modelClass: User,
                join: {
                    from: 'categories.user_id',          // table columns
                    to: 'users.id'
                }
            }
        }
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['user_id', 'name'],
            properties: {
                user_id: { type: 'integer', minLength: 1 },
                name: { type: 'string', minLength: 1, maxLength: 255 },
            }
        }
    }
}

module.exports = Category