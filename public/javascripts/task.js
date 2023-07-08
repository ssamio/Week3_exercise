const submitButton = document.getElementById("submit-data");
const searchButton = document.getElementById("search");
let todoListMembers = null;
let deleteUserButton = null;

//Create user/todo
submitButton.addEventListener("click", function() {
  const inputName = document.getElementById("input-name");
  const inputTask = document.getElementById("input-task");
  fetch("http://localhost:3000/todo", {
    method: "post",
    headers: {
      "Content-type": "application/json"
    },
    body: '{ "name":"' + inputName.value + '", "todo":"' + inputTask.value +'"}'
  })
  .then(response => response.text())
  .then(text => document.getElementById("response").innerText = text)
  .catch(error => console.log(error))
});

//Search user and todos
searchButton.addEventListener("click", function() {
  const searchName = document.getElementById("search-name").value;
  fetch("http://localhost:3000/user/" + searchName, {
    method: "get"
  })
  .then(response => response.text())
  .then(text => {
    if (text == "User not found"){
      document.getElementById("search-result").innerText="User not found";
      document.getElementById("todos").innerHTML = "";
    }
    else {
      const userData = JSON.parse(text);
      document.getElementById("search-result").innerHTML= "Name: " + userData.name +"<br><input type='button' id='delete-user' value='Delete user'></input>";
      makeDeleteUserButtonListen(userData.name);
      let list = "";
      for(let i = 0; i < userData.todos.length; i++){
        list = list + "<li class='delete-task' id="+ i +">" + userData.todos[i] + "</li>";  
      };
      document.getElementById("todos").innerHTML = list;
      makeTodoListListen(userData.name);
    }
  })
  .catch(error => console.log(error))
});

function makeDeleteUserButtonListen(name){
  deleteUserButton = document.getElementById("delete-user");
  if(deleteUserButton){
    deleteUserButton.addEventListener("click", function() {
      fetch("http://localhost:3000/user/" + name, {
        method: "delete"
      })
      .then(response => response.text())
      .then(text => {
        console.log(text);
        if (text == "User not found"){
          document.getElementById("delete-error").innerText = text;
        }
        else {
          document.getElementById("search-result").innerText = text;
          document.getElementById("todos").innerHTML = "";
        }
      })
    })
  }
}


function makeTodoListListen(name){
  todoListMembers = document.getElementsByClassName("delete-task");
  if(todoListMembers){
    for(let i = 0; i < todoListMembers.length; i++){
      todoListMembers[i].addEventListener("click", (e) => {
        e.preventDefault();
        fetch("http://localhost:3000/user", {
          method: "put",
          headers: {
            "Content-type": "application/json"
          },
          body: '{ "name":"' + name + '", "todo":"' + e.target.getAttribute("id") +'"}'
        })
        .then(response => response.text())
        .then(text => {
          if (text == "User not found"){
            document.getElementById("search-result").innerText="User not found";
            document.getElementById("todos").innerHTML = "";
          }
          else {
            const userData = JSON.parse(text);
            document.getElementById("search-result").innerHTML= "Name: " + userData.name +"<br><input type='button' id='delete-user' value='Delete user'></input>";
            makeDeleteUserButtonListen(userData.name);
            let list = "";
            for(let i = 0; i < userData.todos.length; i++){
              list = list + "<li class='delete-task' id="+ i +">" + userData.todos[i] + "</li>";  
            };
            document.getElementById("todos").innerHTML = list;
            makeTodoListListen(userData.name);
          }
        })
        .catch(error => console.log(error))
      });
    }
  }
}