const SchemaName = `Chat`
const mongoose = require( 'mongoose' )

var mongoosePaginate = require( 'mongoose-paginate' )

const id = require( '../_atoms/string-required' )
const type = require( '../_atoms/string-required' )
const title = require( '../_atoms/string' )
const first_name = require( '../_atoms/string' )
const last_name = require( '../_atoms/string' )
const username = require( '../_atoms/string' )
const created_at = require( '../_atoms/date-default' )
const updated_at = require( '../_atoms/date-default' )

const Schema = new mongoose.Schema( {
  id,
  type,
  title,
  first_name,
  last_name,
  username,
  created_at,
  updated_at
} )

// Question.index( {login: 1,status: 1,email: 1} )

Schema.plugin( mongoosePaginate )

const Molecule = mongoose.model( SchemaName, Schema )

module.exports = Molecule
