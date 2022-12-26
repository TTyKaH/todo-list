module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define("task", {
    // базха данных сама создала ключ todoId
    description: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.BOOLEAN
    }
  })

  return Task;
};