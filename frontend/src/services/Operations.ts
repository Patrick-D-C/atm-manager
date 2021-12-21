import { api } from "../config/api";
import { IUserProps } from "./User";

export interface IOperationPropsNew {
  value: number;
  pref_note: number;
}

export interface IOperationProps {
  id_operation: string;
  parent_id?: string;
  client_id: string;
  value: number;
  pref_note: number;
  status: number;
  updated_at: Date;
  client: IUserProps;
  children_operation: [];
}

const getListOperations = async (): Promise<IOperationProps[]> => {
  return await api.get("/operations").then((response) => {
    return response.data as IOperationProps[];
  });
};

const createOperation = async (data: IOperationPropsNew) => {
  return await api
    .post("/operation", data)
    .then((response) => {
      return response.data as IOperationProps;
    })
    .catch((err) => {
      console.log(err);
      return err.response;
    });
};

const deleteOperation = async (id_operation: string) => {
  return await api
    .delete(`/operation/${id_operation}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return err.response;
    });
};

export { getListOperations, createOperation, deleteOperation };
