let host = "localhost"

var db = new PouchDB('todos')
var remoteCouch = false
var cookie

db.changes({
    since: 'now',
    live: true
}).on('change', /*showTodos*/);

// We have to create a new todo document and enter it in the database
/*function addTodo(text) {
    var todo = {
        _id: new Date().toISOString(),
        title: text,
        completed: false
    };
    if (document.getElementById('new-todo').value) {
        db.put(todo).then((result) => {
            console.log('Insertado');
        }).catch((error) => {
        })
    } else {
        alert('Debes llenar el campo')
    }
}

// Show the current list of todos by reading them from the database
function showTodos() {

    db.allDocs({ include_docs: true, descending: true }).then((doc) => {
        redrawTodosUI(doc.rows)
    })

}*/


if (navigator.serviceWorker) {
    //identificar si estoy en local o github
    //navigator.serviceWorker.register('/sw.js');
}


