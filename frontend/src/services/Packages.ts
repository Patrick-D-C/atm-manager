import { api } from "../config/api";
import { IOperationProps } from "./Operations";
import { IUserProps } from "./User";

export interface IPackageProps {
  id_package: string;
  operation_id: string;
  client_id: string;
  value: number;
  type_note: number;
  quantity_notes: number;
  status: number;
  created_at: Date;
  updated_at: Date;
  closed_at: Date;
  client: IUserProps;
  operation: IOperationProps;
}

const getListPackages = async (): Promise<IPackageProps[]> => {
  return await api.get("/packages").then((response) => {
    return response.data as IPackageProps[];
  });
};

export { getListPackages };
