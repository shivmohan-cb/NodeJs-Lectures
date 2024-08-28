const todoDiv = document.querySelector(".todo");
let Todo = [];
// const div = document.createElement("div");// creating new element
// div.classList.add("todo-item");// adding class to it
// div.innerText = "this todo item"// giving text
// todoDiv.append(div);

let url = "http://localhost:2000/todo/";
const FetchTodo = async (url) => {
    try {
        const res = await fetch(url);
        const jsonData = await res.json();
        for (let i = 0; i < jsonData.length; i++) {
            const div = document.createElement("div");// creating new element
            div.classList.add("todo-item");// adding class to it
            div.innerHTML = `
              <img src="${jsonData[i].image}" alt="todo image">
              <h2>${jsonData[i].title}</h2>
              <p>${jsonData[i].desc}</p>
              <p><span>Status :</span>&nbsp;<span>${jsonData[i].status == "on" ? "Completed" : "Pending"}</span></p>
              <button id="delete" onclick="DeleteTodo('${url}','${jsonData[i].id}')">&#128465;</button>
              <div id="update-buttons">
               <button id="edit" >Edit</button>
               <button id="status" onclick="StatusUpdate('${url}','${jsonData[i].id}','${jsonData[i].status}')">Status</button>
              </div>
            `
            todoDiv.append(div);// appending to div element with class todo
        }
        Todo = jsonData;
        console.log(jsonData);
    } catch (err) {
        console.log(err);
    }
}

FetchTodo(url);

const DeleteTodo = async (url, id) => {
    let deleteUrl = url + "delete/" + id;
    try {
        const res = await fetch(deleteUrl, {
            method: "delete"
        });
        const jsonData = await res.json();
        todoDiv.innerHTML = "";
        FetchTodo(url);
    } catch (err) {
        console.log(err);
    }
}

const StatusUpdate = async (url, id, status) => {
    let patchUrl = url + "patch/" + id;
    let Status = { status: status == "on" ? "off" : "on" }
    try {
        const res = await fetch(patchUrl, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Status)
        });
        const json  = await res.json();
        console.log(json)
        todoDiv.innerHTML = "";
        FetchTodo(url);
    } catch (err) {
        console.log(err);
    }
}