const { Model } = require('objection')
const knex = require('../db/knex')

Model.knex(knex)

class Category extends Model {

    static get tableName() {
        return 'categories'
    }

    // static get relationMappings(){
    //     return {

    //     }
    // }

    // get primary key column
    static get idColumn() {
        return 'category_id';
    }
    
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['email', 'password'],
            properties: {
                category_id: { type: 'integer', minLength: 1 },
                email: { type: 'string', minLength: 1, maxLength: 255 },
                password: { type: 'string', minLength: 1, maxLength: 255 },
            }
        }
    }
}

module.exports = User