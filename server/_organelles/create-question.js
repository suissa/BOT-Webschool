module.exports = (Organism) => ( question, infos ) =>  //console.log('mod', mod)
	Organism.create( { question, user_id: infos.from.id } )
    			// .then(success)
    			// .catch(error)


