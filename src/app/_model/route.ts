import { Ticket } from "./ticket";

export class Route {
    id: number;
    creationDate: number;
    isFavorite: boolean;
    name: string;
    tickets: Ticket[];
}
