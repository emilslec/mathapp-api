const handleProblem = (res, req, db) => {
    const {name, description} = req.body;
    if(!name || !description ){
		return res.status(400).json('incorrect submition')
	}
    db('problem').returning('problem_name')
        .insert({
            problem_name: name,
            problem_description: description,
            add_date: new Date()
        })
    .then(resp=>res.json(resp[0]))
}

module.exports = {
    handleProblem
}