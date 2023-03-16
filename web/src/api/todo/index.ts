import { request } from "@/utils/request";
import type { Todo } from "@/types/todo/todo";

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
async function createTodo(params: Todo) {
  return await request({
    url: "todos",
    method: "post",
    data: params,
  });
}

/**
 * Удаление todo
 */
async function removeTodo(params: Todo) {
  return await request({
    url: `todos/${params.id}`,
    method: "delete",
  });
}

async function updateTodo(params: Todo) {
  return await request({
    url: `todos/${params.id}`,
    method: "put",
    data: params,
  });
}

export default {
  getTodos,
  createTodo,
  removeTodo,
  updateTodo,
};
