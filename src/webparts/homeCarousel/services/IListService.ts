import { ListItem } from "./ListItem";

export interface IListService {
    getAll(): Promise<Array<ListItem>>;
}