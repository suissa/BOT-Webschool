module.exports = (Model) => (req,res) =>
  require('../../_organelles/organelle-create')(Model)(req.body)(res)		
	



