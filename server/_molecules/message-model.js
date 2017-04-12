const SchemaName = `Message`
const mongoose = require( 'mongoose' )

var mongoosePaginate = require( 'mongoose-paginate' )

const message_id = require( '../_atoms/string-required' )
const from = require( '../_atoms/string' )
const chat = require( '../_atoms/string' )
const reply_to_message = require( '../_atoms/string' )
const text = require( '../_atoms/string' )
const created_at = require( '../_atoms/date-default' )
const updated_at = require( '../_atoms/date-default' )

const Schema = new mongoose.Schema( {
  message_id,
  from,
  chat,
  reply_to_message,
  text,
  created_at,
  updated_at
  // entities,
  // edit_date,
  // forward_from,
  // forward_from_chat,
  // forward_from_message_id,
  // forward_date,
  // audio,
  // document,
  // game,
  // photo,
  // sticker,
  // video,
  // voice,
  // caption,
  // contact,
  // location,
  // venue,
  // pinned_message,
} )

// Question.index( {login: 1,status: 1,email: 1} )

Schema.plugin( mongoosePaginate )

const Molecule = mongoose.model( SchemaName, Schema )

module.exports = Molecule
