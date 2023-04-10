module.exports = (sequelize, Sequelize) => {
  const Status = sequelize.define("status", {
    // база данных сама создала ключ todoId
    title: {
      type: Sequelize.STRING
    }
  })

  return Status;
};