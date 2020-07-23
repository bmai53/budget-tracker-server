const { Model } = require('objection')
const knex = require('../db/knex')

Model.knex(knex)

class User extends Model {

    static get tableName() {
        return 'users'
    }

    // static get relationMappings(){
    //     return {
    //         category: {

    //         }
    //     }
    // }

    // get primary key column
    static get idColumn() {
        return 'user_id';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['email', 'password'],
            properties:{
                user_id: { type: 'integer', minLength: 1 },
                email: { type: 'string', minLength: 1, maxLength: 255 },
                password: { type: 'string', minLength: 1, maxLength: 255 },
            }
        }
    }
}

module.exports = User