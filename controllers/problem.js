const handleProblem = (res, req, db) => {
    const {name, description} = req.body;
    if(!name || !description ){
		return res.status(400).json('incorrect submition')
	}
    db('problem').returning('task_name')
        .insert({
            task_name: name,
            task_description: description,
            add_date: new Date()
        })
    .then(resp=>res.json(resp))
}

module.exports = {
    handleProblem
}