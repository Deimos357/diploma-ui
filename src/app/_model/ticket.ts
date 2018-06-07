import { Station } from "./station";
import { Company } from "./company";

export class Ticket {
    id : number;
    name : string;
    cost : number;
    duration : number;
    departureTime : number;
    transport : number;
    from : Station;
    to : Station;
    company : Company;
    available : boolean;
}
