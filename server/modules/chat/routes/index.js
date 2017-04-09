/*
	Crud business User
*/
const Model = require('../../../_molecules/question-model');
const create = require('../../../_hadrons/question/create')
const list 	= require('../../../_hadrons/question/list')
const listOne = require('../../../_hadrons/question/listOne')
const update = require('../../../_hadrons/question/update')
const remove = require('../../../_hadrons/question/remove')
// const auth = require('../../../_hadrons/question/auth')
// const createDefault = require('../../../_hadrons/question/default')
// const validateRequest = require('../validate-user');
// const forgot = require('../../../_hadrons/question/forgot')
// const validateForgot = require('../../../_hadrons/question/validate-forgot')
// const passwordUpdate = require('../../../_hadrons/question/new-password') 

var express = require('express');
var router = express.Router();


	// route login jwt
	router.route('/')
		.get( list( Model) )
		.post( create( Model ) )

	// routes base (CRUD)
	// app.route(url)
	// 	.post(validateRequest.make, create(Model))
	// 	.get(list(Model))

	// app.route(url+ '/paginate/:start/:end')
	// 	.get(list(Model))

	// app.route('/forgot/:email')
	//    .get(forgot(Model))

	// app.route('/forgot/validate/:forgot')
 //       .get(validateForgot(Model))

 //     app.route('/forgot/password')
 //     	.post(passwordUpdate(Model))

	// app.route(url + '/:id')
	// 	.get(validateRequest.change, listOne(Model))
	// 	.put(validateRequest.change, update(Model))
	// 	.delete(validateRequest.delete, remove(Model))

	// // Default User login: 'higor' password '1234'
	// app.route('/default')
	// 	.get(createDefault(Model))

	// }

module.exports = router
