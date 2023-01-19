import { request } from "@/utils/request";

/**
 * Получение списка todo
 */
async function getTodos() {
  return await request({
    url: "todos",
    method: "get",
  });
}

/**
 * Создание todo
 */
async function createTodo(params = {}) {
  return await request({
    url: "todos",
    method: "post",
    data: params,
  });
}

/**
 * Удаление todo
 */
async function removeTodo(params = {}) {
  return await request({
    url: `todos/${params.id}`,
    method: "delete",
  });
}

export default {
  getTodos,
  createTodo,
  removeTodo,
};
