import { push, ref, remove, update } from "firebase/database";
import { dbReal } from "../firebase";

export const createItem = (path, body) => push(ref(dbReal, path), body);
export const updateItem = (path, id, body) =>
  update(ref(dbReal, `${path}/${id}`), body);
export const removeItem = (path, id) => remove(ref(dbReal, `${path}/${id}`));
