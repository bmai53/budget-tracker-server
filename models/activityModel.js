const { Model } = require('objection')
const knex = require('../db/knex')

Model.knex(knex)

class Activity extends Model {

    static get tableName() {
        return 'activities'
    }

    static get relationMappings() {

        const User = require('./userModel')
        const Category = require('./categoryModel')

        return {
            user: {
                relation: Model.BelongsToOneRelation,    // one to one
                modelClass: User,
                join: {
                    from: 'activities.user_id',          
                    to: 'users.id'
                }
            }, 
            category: {
                relation: Model.BelongsToOneRelation,    // one to one
                modelClass: Category,
                join: {
                    from: 'activities.category_id',
                    to: 'categories.id'
                }
            }, 
        }
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['user_id', 'name', 'date', 'type'],
            properties: {
                date: { type: 'date', minLength: 8, minLength: 10 },
                category_id: { type: 'integer', minLength: 1 },
                user_id: { type: 'integer', minLength: 1 },
                name: { type: 'string', minLength: 1, maxLength: 255 },
                amount: {type: 'decimal', minLength: 1},
            }
        }
    }
}

module.exports = Activity