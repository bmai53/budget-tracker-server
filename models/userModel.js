const { Model } = require('objection')
const knex = require('../db/knex')

Model.knex(knex)

class User extends Model {

    static get tableName() {
        return 'users'
    }

    static get relationMappings(){

        const Category = require('./categoryModel')

        return {
            category: {
                relation: Model.HasManyRelation,    // one to many
                modelClass: Category,
                join: {
                    from: 'users.id',          // table columns
                    to: 'categories.user_id'
                }
            },
            activity: {
                relation: Model.HasManyRelation,    // one to many
                modelClass: Category,
                join: {
                    from: 'users.id',          // table columns
                    to: 'activities.user_id'
                }
            }
        }
        
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['email', 'password'],
            properties:{
                email: { type: 'string', minLength: 1, maxLength: 255 },
                password: { type: 'string', minLength: 1, maxLength: 255 },
            }
        }
    }
}

module.exports = User