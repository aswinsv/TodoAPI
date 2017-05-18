var express=require('express');

var bodyParser=require('body-parser');

var app=express();

var port= process.env.PORT || 3000;


var todos=[{}];

var todoNext=1;

/*var todos=[{
	id:1,
	description: 'Complete Cracking the Coding Interview',
	completed: false
},{
	id:2,
	description: 'Complete Mobile Application',
	completed: true
},
{
	id:3,
	description: 'Complete Node js Application',
	completed: true
},
{
	id:4,
	description: 'Watch Real Madrid Game',
	completed: false
},
{
	id:5,
	description: 'Buy Groceries',
	completed: true
}];*/

app.use(bodyParser.json());

app.get('/',function(req,res) {
	res.send('Todo API Root');
});

app.get('/todos',function(req,res){
		res.json(todos);
});

app.get('/todos/:id',function(req,res){
	var todoID=req.params.id;
	var flag=true;

	for(var i=0; i< todos.length;i++)
	{
		if(todos[i].id == todoID)
		{
			res.json(todos[i]);
			flag=false;
		}	
	}	

	if(flag)
		res.status(404).send();
});

app.post('/todos',function(req,res){
	var body=req.body;

	body.id=todoNext++;

	todos.push(body);

	

	res.json(body);

});

app.listen(port,function() {
	console.log('Express listening on port'+port+'!');
});