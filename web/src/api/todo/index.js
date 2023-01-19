import { request } from "@/utils/request";

/**
 * Получение списка todo
 */
async function getTodos(params = {}) {
  return await request({
    url: "todos",
    method: "get",
    params,
  });
}

/**
 * Создание todo
 */
async function createTodo(body = {}, params = {}) {
  console.log(params);
  return await request({
    url: "todos",
    method: "post",
    data: body,
    params: params,
  });
}

export default {
  getTodos,
  createTodo,
};
