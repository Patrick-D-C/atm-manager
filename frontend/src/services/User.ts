import { api } from "../config/api";

export interface IUserProps {
  id_user?: string;
  email: string;
  password: string;
  name: string;
  identity: string;
  date_birth: Date;
  address: string;
  number: number;
  district: string;
  city: string;
  state: string;
  admin: boolean;
}

async function createUser(data: IUserProps) {
  return await api
    .post("/user", data)
    .then((response) => {
      return true;
    })
    .catch((err) => {
      return false;
    });
}

async function updateUser(data: IUserProps) {
  return await api
    .patch("/user", data)
    .then((response) => {
      return response.data as IUserProps;
    })
    .catch((err) => {
      return null;
    });
}

const deleteUser = async (id_user: string) => {
  return await api
    .delete(`/user/${id_user}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response;
    });
};

export { createUser, updateUser, deleteUser };
