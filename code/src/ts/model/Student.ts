import {User} from "./User";
import {Class} from "./Class";
import {Exercise} from "./Exercise";
import {Solution} from "./Solution";

class Student extends User {

    constructor (username : string, password: string, name : string, lastname:string, city:string, school : string){
        super(username, password, name, lastname, city, school);
    }

    public getClasses(classList: Class[]): Class[] {
        let lista : Class[] =[];
        classList.forEach((_class) => {
            if (_class.getStudents().indexOf(this.getID()) !== -1){
                lista.push(_class);
            }
        });

        return lista;
    }

    public getAverage(exercises : Exercise[]) : Map<number,number> {
        let averageMap = new Map<number,number>();
        let solutions : Solution[] = [];

        for (let i =0 ; i < exercises.length; i++)
            solutions.concat((exercises[i].getSolutions()).filter((sol) => sol.getSolverId() === this.getID()));

        solutions = solutions.sort((sol1,sol2) => sol1.getTime().getTime() - sol2.getTime().getTime());

        let totalValutation = 0;
        let counter = 0;

        for (let i =0 ; i < solutions.length; i++) {
            let valutations = solutions[i].getValutations();

            if (valutations) {
                valutations.forEach((value, key) => {
                    totalValutation += value;
                });
                counter += valutations.size;
            }

            averageMap.set(solutions[i].getTime().getTime(),totalValutation/counter);
        }

        return averageMap;
    }
}
export {Student}