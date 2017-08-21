var Sequelize=require('sequelize');

var sequelize=new Sequelize(undefined,undefined,undefined, {

	'dialect':'sqlite',
	 'storage':__dirname+'/basic-sqlite-database.sqlite'
});

var Todo= sequelize.define( 'todo', {

	description:{

		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len:[1,250]
		}
	},

	completed:{

		type: Sequelize.BOOLEAN,
		allowNull:false,
		defaultValue:false
	}

})

// Setting force to true, ensures that the table is dropped even if it exists and then recreate them later.
sequelize.sync({// force:true

}).then(function() {
	console.log('Everything is synced');

}).then(function(){

	return Todo.find({

		where:{
			id: 3
		}

	});

}).then(function(todo){
		if(todo) {

		console.log(todo.toJSON());
					
		} else {

			console.log('no todo found!');
		}

	});

//});

	/*Todo.create({

		description	:"Get Job Offer",
		
	}).then( function(todo){

		return Todo.create({

				description: "Clean Office"	
		});	

		
	}).then(function(){
		return Todo.findAll({
			where: {
				description:{
					$like:"%off%"
				}	
					
			}
		});
	}).then(function(todos){
		if(todos) {

			todos.forEach(function(todo){

				console.log(todo.toJSON());
			});
			
		} else {

			console.log('no todo found!');
		}

	}).catch(function(e){

		console.log(e);
	}); //create table and insert row into it*/

	


