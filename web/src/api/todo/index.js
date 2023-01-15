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

export default {
  getTodos,
};
