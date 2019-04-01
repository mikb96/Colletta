//import * as functions from 'firebase-functions';//
import * as express from "express";

import {InsertPageView} from './ts/view/InsertPageView';
import {InsertPageController} from './ts/controller/InsertPageController';
import {ExercisePageView} from "./ts/view/ExercisePageView";
import {ExerciseController} from "./ts/controller/ExerciseController";
/*import {SavePageController} from "./ts/controller/SavePageController";*/
import {SavePageView} from "./ts/view/SavePageView";
import {LoginView} from "./ts/view/LoginView";
import {RegistrationView} from "./ts/view/RegistrationView";
import {AuthenticationController} from "./ts/controller/AuthenticationController";


import {FirebaseUserManager} from "./ts/model/FirebaseUserManager";
// @ts-ignore
import {Data} from ".ts/model/Data";

const objDb = new FirebaseUserManager();
// @ts-ignore

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));

const insertPageView = new InsertPageView();
const insertPage = new InsertPageController(insertPageView);
insertPage.update(app);

const savePageView = new SavePageView();
const exercisePageView = new ExercisePageView();
const exercisePage = new ExerciseController(exercisePageView, savePageView, objDb );//objDb
exercisePage.update(app);

/*var savePageView = new SavePageView();
var savePage = new SavePageController(savePageView, objDb);
savePage.update(app);*/

//import {Exercise} from "./ts/model/Exercise";


const loginView  = new LoginView();
const registrationView : any= new RegistrationView();
const LoginPage = new AuthenticationController(loginView,registrationView);
LoginPage.update(app);

app.listen(8080, async function () {
    const host = "127.0.0.1";
    const port = "8080";
    console.log("Example app listening at http://%s:%s", host, port);

});