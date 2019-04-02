import {DatabaseManager} from "./DatabaseManager";
import {Data} from "./Data";

class DatabaseClassManager implements DatabaseManager{
    constructor(){

    }
    insert(obj:Data) : Promise<boolean>;

    // @ts-ignore
    remove(id:string) : Promise<boolean> | null {
        return null;
    }

    read(id:string) : Promise<Data> | null {
        return null;
    }

    update(id:string) : void {
        ;
    }
}
export {DatabaseClassManager}