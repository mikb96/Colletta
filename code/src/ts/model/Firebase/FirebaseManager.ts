import * as Admin from "firebase-admin";
import {Data} from "../Data/Data";

/**
 *   Class to manage the database.
 *   @abstract
 */
abstract class FirebaseManager {
    private static registry: Map<string, FirebaseManager> = new Map<string, FirebaseManager>();
    protected static database: Admin.database.Database = FirebaseManager.initDB();

    protected constructor() {}

    /**
     * This method executes the connection with firebase database.
     * @returns {admin.database.Database} reference to the database service.
     */
    private static initDB() {
        const admin = require("firebase-admin");

        let serviceAccount : any;
        try {
            serviceAccount = require('../../../../src/ts/model/Firebase/colletta-3e789-firebase-adminsdk-e5uh6-1be19838f7.json');
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                databaseURL: "https://colletta-3e789.firebaseio.com"
            });
            return admin.database();
        } catch (e) {
            console.log(e.message);
        }
    }

    /**
     *   This method checks if the instance exists into the database
     *   @param instanceName - the name of the instance
     *   @return {FirebaseManager} the instance if exists
     */
    protected static lookup(instanceName: string): FirebaseManager | null | undefined{
        if (FirebaseManager.registry.has(instanceName))
            return FirebaseManager.registry.get(instanceName);
        return null;
    }


    /**
     *   This method adds a new object into the database
     *   @param obj - the object to insert
     *   @returns { boolean } returns "true" if the operation is successful
     */
    public abstract insert(obj: Data): Promise<boolean>;

    /**
     *   This method removes an object from the database
     *   @param id - the id of the object to remove
     *   @returns { boolean } returns "true" if the operation is successful
     */
    public abstract remove(id: string): Promise<boolean>;

    /**
     * This method looks for all the elements into the database
     * @returns {Map<string, string>} a map
     */
    public abstract elements(): Promise<Map<string, string>>;

    /**
     *   This method looks for data into the database
     *   @param dataName - the name of the data to search
     */
    public abstract search(dataName:string) : Promise<string>;

    /**
     *   This method reads objects informations from the database
     *   @param id - the id of the object to read
     */
    public abstract read(id: string): Promise<Data>;

    /**
     *   This method modifies data informations into the database
     *   @param path - the path of the data to modify
     *   @param value - the new value
     */
    public abstract update(path:string, value: any): void;

    /**
     *   This method adds a new instance into the database
     *   @param instanceName - the name of the instance
     *   @param instance - the one to register
     */
    public static registerInstance(instanceName : string, instance : FirebaseManager) : void{
        FirebaseManager.registry.set(instanceName,instance);
    }

    /**
     *   This method returns a database instance
     *   @param instanceName - the name of the instance to look for
     */
    public static getInstance(instanceName : string) : FirebaseManager {
        const dbInstance = FirebaseManager.lookup(instanceName);
        if(dbInstance === null || dbInstance === undefined)
            throw new Error('Error: Database non trovato');
        return dbInstance;
    }

}

export {FirebaseManager};