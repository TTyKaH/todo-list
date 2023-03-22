import { request } from "@/utils/request";
// import authHeader from "@/api/auth/auth-header";
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
    // headers: authHeader(),
  });
}

/**
 * Удаление todo
 */
// TODO: Не кастыль ли это, что я сделал "Todo | undefined"? Написал так, так как геттер getActiveTodo в сторе может вернуть indefined
async function removeTodo(params: Todo | undefined) {
  return await request({
    url: `todos/${params?.id}`,
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
