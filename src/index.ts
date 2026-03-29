import { TodoItem } from "./todoItem.js";
import { TodoCollection } from "./todoCollection.js";

let todos: TodoItem[] = [
    new TodoItem(1, "Buy Flowers"),
    new TodoItem(2, "Get Shoes"),
    new TodoItem(3, "Collect Tickets"),
    new TodoItem(4, "Call Joe", true)
];

let collection: TodoCollection = new TodoCollection("Andres", todos);

function mostrarLista(): void {
    console.log(`\n${collection.userName}'s Todo List (${collection.getItemCounts().incomplete} pendientes)\n`);
    collection.getTodoItems(true).forEach(item => item.printDetails());
}

console.clear();

// READ
//mostrarLista();

// CREATE
let id = collection.addTodo("Study TypeScript");
console.log("\nNueva tarea agregada");

// UPDATE
collection.markComplete(id, true);
console.log("Tarea marcada como completa");

// DELETE
collection.removeComplete();
console.log("Tareas completadas eliminadas");

// READ FINAL
mostrarLista();


import inquirer from "inquirer";

enum Opciones {
    Mostrar = "Mostrar tareas",
    Agregar = "Agregar tarea",
    Salir = "Salir"
}

function menu(): void {
    inquirer.prompt({
        type: "list",
        name: "opcion",
        message: "¿Qué deseas hacer?",
        choices: Object.values(Opciones)
    }).then((respuesta: any) => {

        switch (respuesta.opcion) {

            case Opciones.Mostrar:
                mostrarLista();
                menu();
                break;

            case Opciones.Agregar:
                inquirer.prompt({
                    type: "input",
                    name: "tarea",
                    message: "Escribe la nueva tarea:"
                }).then((res: any) => {
                    collection.addTodo(res.tarea);
                    console.log("✅ Tarea agregada");
                    menu();
                });
                break;

            case Opciones.Salir:
                console.log("👋 Saliendo...");
                break;
        }
    });
}

menu();