let data = [];

//Constructor for objects
function UserData(name, task){
    this.name = name;
    this.todos = [task];
}

function saveTodo(name, task){
    for (let i = 0; i < data.length; i++){
        if (data[i].name == name){
            data[i].todos.push(task);
            return ("Todo added")
        }
    }
    let newUser = new UserData(name, task);
    data.push(newUser);
    return ("User added");
}

function searchByUser(name){
    for (let i = 0; i < data.length; i++){
        if (data[i].name == name){
            return data[i];
        }
    }
    return -1;
}

function deleteUser(name){
    for (let i = 0; i < data.length; i++){
        if (data[i].name == name){
            data.splice(i, 1);
            return 1;
        }
    }
    return -1;
}

function updateTaskList(name, target){
    for (let i = 0; i < data.length; i++){
        if (data[i].name == name){
            data[i].todos.splice(target, 1);
            return data[i];
        }
    }
    return -1;
}

module.exports = { saveTodo, searchByUser, deleteUser, updateTaskList };