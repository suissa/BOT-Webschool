module.exports = (Model) => (req,res)=>{
	
	const select = ''
	const query = {}
	const paginate = {
		start: parseInt(req.params.start) || 1,
		end: parseInt(req.params.start) || 10	
	}

	require('../../_organelles/organelle-find')(Model)(query,select,paginate)(res);		
	
}


