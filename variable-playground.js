var grades=['A','B'];

function update_1(obj)
{

	obj=['A','B','C'];

}

function update_2(obj)
{

	obj.push('C');

	debugger;

}


//update_1(grades);

//console.log(grades);

update_2(grades);

console.log("New Updated Array:"+grades);
