import {PageView} from "./PageView";
import {SearchPresenter} from "../presenter/SearchPresenter";

/**
 *   Class to display the search bar and search results
 *   @extends PageView
 */
class SearchView extends PageView{

    private searchPresenter : SearchPresenter;
    constructor(app : any){
        super();
        this.searchPresenter= new SearchPresenter(this);
        this.searchPresenter.update(app);
    }

    /**
     * This method is used to display the page body structure
     * @return {string} the HTML source
     */
    async getPage() {
        let ret = this.getHead();
        ret +=this.getMenu();
        ret +="<div class=\"container\">\n";
        if(this.searchPresenter.getSearchType()==="exercise" || this.searchPresenter.getSearchType()==="classExercise") {
            ret += "\t<h1 class ='text-center mb-5'>Ricerca esercizio</h1>\n" +
                "\t<form method ='post' action='/searchexercise'>\n";
        }
        if(this.searchPresenter.getSearchType()==="student") {
            ret += "\t<h1 class ='text-center mb-5'>Ricerca studente</h1>\n" +
            "\t<form method ='post' action='/searchstudent'>\n";
        }

        ret+="\t\t<div class=\"form-group\">\n"+
            "\t\t\t<input type=\"text\" class=\"form-control\" id='sentence' name='sentence' placeholder=\"Inserisci una frase\" required=\"required\">" +
            "\t\t</div>" +
            "\t\t<div class=\"form-group text-center\">" +
            "\t\t\t<button type=\"submit\" class=\"btn btn-primary my-2 my-sm-0 w-25\">Cerca</button>" +
            "\t\t</div>" +
            "\t</form>";
            ret+= this.printList();
        ret+="</div>"+this.getFoot("");
        return ret;
    }

    /**
     * This method is used to display the page menù
     * @return {string} the HTML source
     */
    private getMenu() : string {
        let ret ="<nav class=\"navbar navbar-expand-sm bg-dark navbar-dark\">" +
            "    <div class=\"navbar-brand\">Colletta</div>" +
            "    <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapsibleNavbar\">" +
            "        <span class=\"navbar-toggler-icon\"></span>" +
            "    </button>" +
            "    <div class=\"collapse navbar-collapse\" id=\"collapsibleNavbar\">"+
            "<ul class=\"navbar-nav mr-auto\">";
        for(let i in this.menuList) {
            ret += ""+
                "<li class=\"nav-item\">" +
                "   <a class=\"nav-link\" href=\""+this.menuList[i].link+"\">"+this.menuList[i].name+"</a>" +
                "</li>";
        }
        ret+="</ul>";
        //aggiungo login o logout
        ret+=this.getLoginArea();
        ret+="    </div>" +
            "</nav>";
        return ret;
    }

    /**
     * This method is used to display the page login area
     * @return {string} the HTML source
     */
    private getLoginArea() : string {

        if(this.searchPresenter.isLoggedIn()){
            return "" +
                "        <form class='form-inline my-2 my-lg-0' action='/logout'>\n" +
                "           <div class=\"form-group\">" +
                "               <a class=\"btn btn-default btn-circle btn-sm mr-4 pt-2\" href=\"/profile\" role=\"button\"><i class=\"fas fa-user-circle\" style=\"color: white; font-size:26px\"></i></a>\n" +
                "               <button type=\"submit\" class=\"btn-sm btn btn-primary my-2 my-sm-0\">Logout</button>\n" +
                "           </div>\n" +
                "        </form>\n";
        }
        else{
            let ret ="";
            ret += "" +
                "\t\t<form class='form-inline my-2 my-lg-0' method ='post' action='/checklogin'>\n";
            if(this.searchPresenter.isLoginInvalid()){
                ret+="\t\t\t<p class='text-danger m-1 p-1'>username o password invalidi</p>\n";
            }
            ret+="\t\t\t<div class=\"form-group\">\n" +
                "\t\t\t\t<input type=\"text\" class=\"form-control mr-sm-2\" name='username' placeholder=\"Username\" required=\"required\">\n" +
                "\t\t\t</div>\n" +
                "\t\t\t<div class=\"form-group\">\n" +
                "\t\t\t\t<input type=\"password\" class=\"form-control mr-sm-2\" name='password' placeholder=\"Password\" required=\"required\">\n" +
                "\t\t\t</div>\n" +
                "\t\t\t<div class=\"form-group\">\n" +
                "\t\t\t\t<button type=\"submit\" class=\"btn-sm btn btn-primary my-2 my-sm-0 mr-2\">Accedi</button>\n" +
                "\t\t\t\t<a class=\"btn-sm btn btn-primary my-2 my-sm-0\" href=\"/registration\" role=\"button\">Registrati</a>\n"+
                "\t\t\t</div>\n" +
                "\t\t</form>\n";
            return ret;
        }
    }

    /**
     * This method is used to display the list of search results
     * @return {string} the HTML source
     */
    private printList() {
        let results = this.searchPresenter.getResults();
        if(results===undefined){
            return "";//resultList is not set yet, cause nobody searched yet
        }
        if(results.size<=0){
            return "<h2 class='h5 text-danger text-center'>Nessun risultato</h2>";//resultList is not set yet, cause nobody searched yet
        }
        let ret="<h2>Esercizi: </h2>\n";
        if(this.searchPresenter.getSearchType()==="exercise") {
            ret+="<form method='post' action='/exercise'>";
        }
        if(this.searchPresenter.getSearchType()==="classExercise") {
            ret+="<form method='post' action='/addexercise'>";
        }
        if(this.searchPresenter.getSearchType()==="student") {
            ret+="<form method='post' action='/addstudent'>";
        }
        ret+="<ul class=\"list-group\">\n";
        results.forEach((value: string, key: string) => {
            ret+="<li class=\"list-group-item\"><p class='d-inline pr-1'>" + value + "</p>";
            if(this.searchPresenter.getSearchType()==="exercise") {
                ret+="<button class='btn btn-primary btn-sm float-right' name='sentence' value='" + value + "' type='submit'>Esegui esercizio</button>";
            }
            if(this.searchPresenter.getSearchType()==="classExercise") {
                ret+="<button class='btn btn-primary btn-sm float-right' name='exerciseId' value='" + key + "' type='submit'>Aggiungi esercizio alla classe</button>";
            }
            if(this.searchPresenter.getSearchType()==="student") {
                ret+="<button class='btn btn-primary btn-sm float-right' name='studentId' value='" + key + "' type='submit'>Aggiungi alla classe</button>";
            }
            ret+="</li>\n";
        });
        return "</ul></form>\n"+ret;
    }
}
export {SearchView};