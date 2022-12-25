module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define("task", {
    todo_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.BOOLEAN
    }
  })

  return Task;
};