const db = require("../models");
const Todo = db.todos;
const Task = db.tasks;
const Op = db.Sequelize.Op;

// Create and Save a new Todo
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Todo
  const todo = {
    title: req.body.title,
    description: req.body.description,
  };

  let todoId = null
  // Save Todo in the database
  await Todo.create(todo)
    .then(data => {
      todoId = data.id
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Todo."
      });
    });

  // Save tasks if it exist
  let tasks = req.body.tasks
  if (tasks.length) {
    for (let task of tasks) {
      task.todo_id = todoId
      Task.create(task)
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Task."
          });
        });
    }
  }

  res.send({
    msg: 'Todo successful created'
  })
};

// Retrieve all Todos from the database.
exports.findAll = async (req, res) => {
  let todos = []

  await Todo.findAll()
    .then(data => {
      todos = data
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving todos."
      });
    });

  // find all tasks related with one todo and add them to the todo
  await getAllTasksByTodoId(todos)
    .then((data) => {
      console.log('wait')
    })

  res.send(todos);
};

// Find a single Todo with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Todo.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Todo with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Todo with id=" + id
      });
    });
};

// Update a Todo by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Todo.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        // res.send({
        //   message: "Todo was updated successfully."
        // });
      } else {
        res.send({
          message: `Cannot update Todo with id=${id}. Maybe Todo was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Todo with id=" + id
      });
    });

  // same updating for tasks related with todo
  updateTaskByTodoId(req.body)
    .then((data) => {
      console.log(data)
    })

  res.send({
    message: "Todo and related data was updated successfully."
  });
};

// Delete a Todo with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Todo.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Todo was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Todo with id=${id}. Maybe Todo was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Todo with id=" + id
      });
    });
};

// Delete all Todos from the database.
exports.deleteAll = (req, res) => {
  Todo.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Todos were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all todos."
      });
    });
};

// Более сложные методы - это комбинация стандартных sequelize CRUD операций и сложной логики внутри метода с использованием условий sql (sequelize)

// В дальнейшем следует принять решение куда выносить функции используемые внутри контроллеров
// =========================
async function getAllTasksByTodoId(todos) {
  for (todo of todos) {
    await Task.findAll({
      where: {
        todo_id: todo.id,
      }
    })
      .then((data) => {
        todo.dataValues.tasks = data
      })
  }
}

async function updateTaskByTodoId(todo) {
  for (task of todo.tasks) {
    await Task.update(task, {
      where: {
        id: task.id
      }
    })
  }
}