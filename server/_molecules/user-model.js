const SchemaName = `User`
const mongoose = require( 'mongoose' )
const mongoosePaginate = require( 'mongoose-paginate' )

const name = require( '../_atoms/string-required' )
const email = require( '../_atoms/string-required' )
const forgot = require( '../_atoms/string' )
const login = require( '../_atoms/string-required-unique' )
const password = require( '../_atoms/string-password-crypt' )
const token = require( '../_atoms/string' )
const status = require( '../_atoms/boolean-default-true' )
const created_at = require( '../_atoms/date-default' )
const updated_at = require( '../_atoms/date-default' )

const Schema = new mongoose.Schema({
	name,
	login,
	password,
	email,
	token,
	forgot,
	status,
	created_at,
	updated_at
})

Schema.index( { login: 1,status: 1,email: 1 } )
Schema.plugin( mongoosePaginate )

const Molecule = mongoose.model( SchemaName, Schema )

module.exports = Molecule
