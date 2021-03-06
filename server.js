var express=require('express');

var bodyParser=require('body-parser');

var app=express();

var port= process.env.PORT || 3000;

var _=require('underscore');

var todos=[{}];

var todoNext=1;

var db=require('./db.js');	

var sequelize=db.sequelize;

app.use(bodyParser.json());

app.get('/',function(req,res) {
	res.send('Todo API Root');
});

app.post('/todos',function(req,res){

	var body=_.pick(req.body,'description','completed');


	db.todo.create(body).then(function(todo){

			console.log("Todo added to DB");
		
				res.json(todo.toJSON());
			

	}).catch(function(e){

		res.status(400).json(e);
	}); 

		/*var queryParameters=req.query;

		var filteredTodos=todos;

		if(queryParameters.hasOwnProperty('completed') && queryParameters.completed=='true')
			{
				filteredTodos=_.where(todos,{completed:true});
			}	

		else if(queryParameters.hasOwnProperty('completed') && queryParameters.completed=='false')
			filteredTodos=_.where(todos,{completed:false});


		if(queryParameters.hasOwnProperty('q') && queryParameters.q.length>0)
			{
				filteredTodos=_.filter(filteredTodos,function(todo)
					{ 
						return todo.description.toLowerCase().indexOf(queryParameters.q.toLowerCase()) > -1; 
					});
			}	




		res.json(filteredTodos);*/
});

// display the input id from todos array
app.get('/todos/:id',function(req,res){



	var todoID=parseInt(req.params.id,10);

	db.todo.findById(todoID).then(function(todo){
				if(todo) {

				res.json(todo.toJSON());
							
				} else {

					res.status(404).send();
				}

			},function(e){
		res.status(500).json(e);
	});

	/*var matchedTodo=_.findWhere(todos,{id:todoID});

	if(matchedTodo) {
		res.json(matchedTodo);
	}
	else {
		res.status(404).send();
	}*/
	

});

// delete id from todos

app.delete('/todos/:id',function(req,res){

	var todoID=parseInt(req.params.id,10);
	var matchedTodo=_.findWhere(todos,{id:todoID});

	if(matchedTodo) {
	todos=_.without(todos,matchedTodo);
	res.json(matchedTodo);
    }
    else {
    	res.status(404).json({"error":"no todo found with that id"});
    }	

});

//Update todo Array

app.put('/todos/:id',function(req,res){
	var todoID=parseInt(req.params.id,10);

	var matchedTodo=_.findWhere(todos,{id:todoID});

	var body=_.pick(req.body,'description','completed');


	var validAttributes={};


	if(!matchedTodo)
	{
			res.status(404).json({"error":"no todo found with that id"});
	}	



	if(body.hasOwnProperty('completed') && _.isBoolean(body.completed))
	{ 
		validAttributes.completed=body.completed;
	}	
	else if(body.hasOwnProperty('completed'))
	{
		return res.status(400).send();
	}	

	if(body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length != 0)
	{
		validAttributes.description=body.description;
	}	
	else if(body.hasOwnProperty('description'))
	{
		return res.status(400).send();
	}

	_.extend(matchedTodo,validAttributes);	

	res.json(matchedTodo);
});


// POST-Sends value to server
/*app.post('/todos',function(req,res){
	var body=_.pick(req.body,'description','completed');

	if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
		return res.status(400).send();
	}

	body.description=body.description.trim();

	body.id=todoNext++;

	todos.push(body);

	

	res.json(body);

});*/


sequelize.sync().then(function(){

	app.listen(port,function() {
	console.log('Express listening on port'+port+'!');
});

});



