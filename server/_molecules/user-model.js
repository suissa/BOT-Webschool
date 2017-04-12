const SchemaName = `User`
const mongoose = require( 'mongoose' )
const mongoosePaginate = require( 'mongoose-paginate' )

// const name = require( '../_atoms/string-required' )
// const email = require( '../_atoms/string-required' )
// const forgot = require( '../_atoms/string' )
// const login = require( '../_atoms/string-required-unique' )
// const password = require( '../_atoms/string-password-crypt' )
// const token = require( '../_atoms/string' )
// const status = require( '../_atoms/boolean-default-true' )
// Telegram
const id = require('../_atoms/string-required')
const first_name = require('../_atoms/string')
const last_name = require('../_atoms/string')
const username = require('../_atoms/string')
const created_at = require( '../_atoms/date-default' )
const updated_at = require( '../_atoms/date-default' )

const Schema = new mongoose.Schema({
  id,
  first_name,
  last_name,
  username,
	created_at,
	updated_at
})

Schema.index( { login: 1,status: 1,email: 1 } )
Schema.plugin( mongoosePaginate )

const Molecule = mongoose.model( SchemaName, Schema )

module.exports = Molecule
