module.exports = (sequelize, Sequelize) => {
  const Todo = sequelize.define("todo", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    priorityId: {
      type: Sequelize.INTEGER
    }
  })

  return Todo;
};