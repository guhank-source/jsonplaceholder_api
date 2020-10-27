
let userId = '';
function get_user_api() {
  		var user_name = document.getElementById("get_user").value;
  		sessionStorage.setItem("userName", user_name);
const api_url = 
	`https://jsonplaceholder.typicode.com/users?username=${user_name}`; 
async function getapi(url) { 

	const response = await fetch(url); 
	var data = await response.json(); 
 
	show(data); 
} 
 
getapi(api_url); 

function show(data) { 

	for (let r of data) { 
	console.log(data);
	getapi_post(r.id);
	userId = r.id;
	sessionStorage.setItem("UserId_sess", userId);
	document.getElementById("get_username_form_api").innerHTML = r.username;
	 
	 }
} 
}

function getapi_post(userid){

	const api_url = 
	`https://jsonplaceholder.typicode.com/posts?userId=${userid}`; 

 
async function getapi(url) { 
	const response = await fetch(url); 
	var data = await response.json(); 
	show(data); 
} 
getapi(api_url);  
function show(data) { 
	let title_count = 0;
	let post_user = 
		`<div class="card-body">
        <div class="table-responsive">
        <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
        <thead>
		<tr> 
		<th>Title</th> 
		<th>Body</th>  
		</thead>
		<tbody>`; 
	
for (let r of data) {
		let userid = r.userId; 
		post_user += `
	
	<tr> 
	<td>${r.title} </td> 
	<td>${r.body}</td>  
	</tr>
	`;
	title_count++; 
	} 

	post_user += `
	</tbody>
	</table>
	</div>
	</div>`;
	getapi_todos(userid,title_count);
	document.getElementById("title_count").innerHTML = title_count;
} 


}

function getapi_todos(userid,title_count){
	const api_url = 
	`https://jsonplaceholder.typicode.com/todos?userId=${userid}`;  
async function getapi(url,title_count) { 
	const response = await fetch(url); 
	var data = await response.json();  
	show(data,title_count); 
} 
 
getapi(api_url,title_count);  
function show(data,title_count) { 
	//alert(title_count);
	let title_count_todos = 0;
	let not_completed = 0;
	let completed = 0;
	let total_not_completed=0;
	let total_completed=0;
	let post_user = 
		`<div class="card-body">
        <div class="table-responsive">
        <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
        <thead>
		<tr> 
		<th>Title</th> 
		<th>Status</th>  
		</thead>
		<tbody>`; 
	for (let r of data) { 
		post_user += `
	
	<tr> 
	<td>${r.title} </td> 
	<td>${r.completed}</td>  
	</tr>
	`;
	title_count_todos++;

	if(r.completed==false){

		not_completed++;

	}
	else if(r.completed==true){
		completed++;
	}

	}
	post_user += `
	</tbody>
	</table>
	</div>
	</div>`;
	document.getElementById("todos_count").innerHTML = title_count_todos;
	document.getElementById("completed_task").innerHTML = completed;
	document.getElementById("not_completed_task").innerHTML = not_completed; 
	chart_diagram(title_count,title_count_todos,completed,not_completed); 
} 

}
function chart_diagram(title_count,title_count_todos,completed,not_completed){
	var ctx = document.getElementById("myChart");
var myPieChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ["Posts", "Podos", "completed", "Pending"],
    datasets: [{
      data: [title_count, title_count_todos, completed, not_completed],
      backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
      hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
      hoverBorderColor: "rgba(234, 236, 244, 1)",
    }],
  },
  options: {
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: true,
      caretPadding: 10,
    },
    legend: {
      display: true
    },
    cutoutPercentage: 80,
  },
});

}


function get_title_data(){
	const api_url = 
	`https://jsonplaceholder.typicode.com/posts?userId=${userId}`;  
async function getapi(url) { 
	const response = await fetch(url); 
	var data = await response.json(); 
	show(data); 
}  
getapi(api_url); 
 
function show(data) { 
	let post_user = '';  
	for (let r of data) { 
		post_user += `
	<div class="card">
	<div class="card-body">
	<div style='color:blue' contenteditable='true' id="post_title${r.id}">${r.title}</div>
	<div contenteditable='true' id="post_body${r.id}">${r.body}</div>
	<div><button id="edit_post" class="btn btn-primary"  onclick="edit_post_url(${r.id})">Edit</button></div>
	</div>
	</div>
	
	`;
	
	} 
	
	document.getElementById("get_table_user").innerHTML = post_user;
} 


}

function edit_post_url(id){
	

	let title_content = document.getElementById(`post_title${id}`).textContent;
	let body_content = document.getElementById(`post_body${id}`).textContent;

fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
  method: 'PUT',
  body: JSON.stringify({
    id: id,
    title: title_content,
    body: body_content,
    userId: userId,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json))
}


function get_todos_api_div(){

	let session_id = sessionStorage.getItem("UserId_sess");
	let session_name = sessionStorage.getItem("userName");
	const api_url = 
	`https://jsonplaceholder.typicode.com/todos?userId=${session_id}`; 
async function getapi(url,title_count) { 
	const response = await fetch(url);  
	var data = await response.json();  
	show(data,title_count); 
} 
 
getapi(api_url,title_count); 

function show(data,title_count) { 
	let post_user = ''; 
	
		post_user += `
	<div class="col-md-12">`
	for (let r of data) {
		post_user += `
	<div class="card" class="col-md-6">
	<div class="card-body">
	<div style='color:blue' contenteditable='true' id="todos_title${r.id}">${r.title}</div>
	<div contenteditable='true' id="todos_complete${r.id}">${r.completed}</div>
	<div><button id="edit_post" class="btn btn-primary"  onclick="edit_todos_url(${r.id})">Edit</button></div>
	</div>
	</div>
	
	
	`;
	
	} 
	post_user +=`
	</div>`;
	document.getElementById("get_table_user").innerHTML = post_user;
}
}


function edit_todos_url(id){


let title_content = document.getElementById(`todos_title${id}`).textContent;
let post_complete = document.getElementById(`todos_complete${id}`).textContent;

fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
  method: 'PUT',
  body: JSON.stringify({
    id: id,
    title: title_content,
    completed: post_complete,
    userId: userId,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json))
}




window.onload = function(){
	let session_id = sessionStorage.getItem("UserId_sess");
	let session_name = sessionStorage.getItem("userName");

	document.getElementById("get_user").value = session_name;
	get_user_api();
};
