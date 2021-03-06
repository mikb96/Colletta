import * as chai from 'chai';
import 'mocha';
import {ProfilePresenter} from "../../src/ts/presenter/ProfilePresenter";
import {ProfileView} from "../../src/ts/view/ProfileView";
import {UserClient} from "../../src/ts/model/Client/UserClient";
import {ExerciseClient} from "../../src/ts/model/Client/ExerciseClient";
import * as express from "express";
var session = require('express-session');

//@ts-ignored
import * as chaiHttp from 'chai-http';


// Configure chai
chai.use(chaiHttp);
chai.should();

describe('ProfilePresenter', function() {

    let test:ProfilePresenter;
    const app=express();
    // app.use(require('body-parser').json());

    before( function () {

        session.username=undefined;
        test = new ProfilePresenter(new ProfileView(app));

        //@ts-ignored
        test.client = {
            getUserClient(): UserClient | undefined {

                let tryclass = class extends UserClient {

                    async getUserData(id:string) : Promise<any> {
                        console.log("user data");
                        return true;
                    }

                    async search(username:string) : Promise<string> {
                        return "0";
                    }

                    checkPassword(insertedPassword:string,password:string) : boolean{
                        console.log("si");
                        return (insertedPassword===password);
                    }
                    hashPassword(plain :string): string{
                        return plain;
                    }

                    async isTeacher(username: string): Promise<any> {
                        return ("teacher" === username);
                    }
                    async updateUser(username:string, userUpdateData : any){
                        return;
                    }
                };

                return new tryclass();
            },

            getExerciseClient(): ExerciseClient | undefined {

                const tryclass = class extends ExerciseClient {
                    async getStudentAverage(studentId: string): Promise<any> {
                        return true;
                    }
                };
                return new tryclass();
            }


        };//end test.client

        //@ts-ignored
        test.view={
            setUserKind(numero: any) {
                return true;
            },
            setUserData(obj : any){
                return true;
            },
            setTitle(value: any) {
                return true;
            },
            setError(error : string) {
                if(error==="Password modificata")
                    return ;
            },
            async getPage(): Promise<string> {
                return "Page";
            }
        };


    });//end beforeEach
    
    describe('ProfilePresenter.getStudentClass()', function () {
        it('should return student class', async function () {
            test.getStudentClass();
        });
    });

    describe('ProfilePresenter.getAverageInfo()', function () {
        it('should return average student', async function () {
            test.getAverageInfo();
        });
    });
});