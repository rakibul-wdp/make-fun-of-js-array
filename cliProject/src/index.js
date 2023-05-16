const { argv } = require("yargs");
const path = require("path");
const Todo = require("./Todo");
const { saveFile, readFile } = require("./utils");
const { ADD, UPDATE, NEXT, DONE, FIND, LIST } = require("./commands");

const fileName = "../data.json";
const filePath = path.resolve(
  __dirname,
  fileName
);

(function init() {
  const data = readFile(filePath) || [];
  const todo = new Todo(data);
  const { _: baseCommand } = argv;

  switch (baseCommand[0]) {
    case ADD: {
      todo.addItem(argv.text);
      console.log("Todo Added");
      saveFile(todo.todoList, filePath);
      break;
    }
    case UPDATE: {
      todo.update(argv.id, argv.text);
      console.log("Todo Updated");
      saveFile(todo.todoList, filePath);
      break;
    }
    case NEXT: {
      const item = todo.next();
      console.log(`${item.id} - ${item.text} [${item.created}]`);
      break;
    }
    default:
      throw new Error("Command Not Found");
  }
})();