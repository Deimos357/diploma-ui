import { Ticket } from "./ticket";

export class Route {
    id: number;
    creationDate: number;
    favorite: boolean;
    name: string;
    tickets: Ticket[];
    factor: number;
    transport: string;

    stations: string;
}
