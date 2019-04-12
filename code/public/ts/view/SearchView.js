"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PageView_1 = require("./PageView");
const SearchPresenter_1 = require("../presenter/SearchPresenter");
class SearchView extends PageView_1.PageView {
    constructor(app) {
        super();
        this.resultList = null;
        this.searchPresenter = new SearchPresenter_1.SearchPresenter(this);
        this.searchPresenter.update(app);
    }
    setResultList(value) {
        this.resultList = value;
    }
    getPage() {
        let ret = this.getHead();
        ret += this.getMenu();
        ret += "<div class=\"container\">\n" +
            "\t<h1 class ='text-center mb-5'>Ricerca esercizio</h1>\n" +
            "\t<form method ='post' action='/searchexercise'>\n" +
            "\t\t<div class=\"form-group\">\n" +
            "\t\t\t<input type=\"text\" class=\"form-control\" id='sentence' name='sentence' placeholder=\"Inserisci una frase\" required=\"required\">" +
            "\t\t</div>" +
            "\t\t<div class=\"form-group text-center\">" +
            "\t\t\t<button type=\"submit\" class=\"btn btn-primary my-2 my-sm-0 w-25\">Cerca</button>" +
            "\t\t</div>" +
            "\t</form>";
        ret += this.printList();
        ret += "</div>" + this.getFoot("");
        return ret;
    }
    getMenu() {
        let ret = "<nav class=\"navbar navbar-expand-sm bg-dark navbar-dark\">" +
            "    <div class=\"navbar-brand\">Colletta</div>" +
            "    <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapsibleNavbar\">" +
            "        <span class=\"navbar-toggler-icon\"></span>" +
            "    </button>" +
            "    <div class=\"collapse navbar-collapse\" id=\"collapsibleNavbar\">" +
            "<ul class=\"navbar-nav mr-auto\">";
        for (let i in this.menuList) {
            ret += "" +
                "<li class=\"nav-item\">" +
                "   <a class=\"nav-link\" href=\"" + this.menuList[i].link + "\">" + this.menuList[i].name + "</a>" +
                "</li>";
        }
        ret += "</ul>";
        //aggiungo login o logout
        ret += this.getLoginArea();
        ret += "    </div>" +
            "</nav>";
        return ret;
    }
    getLoginArea() {
        if (this.searchPresenter.isLoggedIn()) {
            return "" +
                "        <form class='form-inline my-2 my-lg-0' action='/logout'>\n" +
                "           <div class=\"form-group\">" +
                "               <a class=\"btn btn-default btn-circle btn-sm mr-4 pt-2\" href=\"/profile\" role=\"button\"><i class=\"fas fa-user-circle\" style=\"color: white; font-size:26px\"></i></a>\n" +
                "               <button type=\"submit\" class=\"btn-sm btn btn-primary my-2 my-sm-0\">Logout</button>\n" +
                "           </div>\n" +
                "        </form>\n";
        }
        else {
            let ret = "";
            ret += "" +
                "\t\t<form class='form-inline my-2 my-lg-0' method ='post' action='/checklogin'>\n";
            if (this.searchPresenter.isLoginInvalid()) {
                ret += "\t\t\t<p class='text-danger m-1 p-1'>username o password invalidi</p>\n";
            }
            ret += "\t\t\t<div class=\"form-group\">\n" +
                "\t\t\t\t<input type=\"text\" class=\"form-control mr-sm-2\" name='username' placeholder=\"Username\" required=\"required\">\n" +
                "\t\t\t</div>\n" +
                "\t\t\t<div class=\"form-group\">\n" +
                "\t\t\t\t<input type=\"password\" class=\"form-control mr-sm-2\" name='password' placeholder=\"Password\" required=\"required\">\n" +
                "\t\t\t</div>\n" +
                "\t\t\t<div class=\"form-group\">\n" +
                "\t\t\t\t<button type=\"submit\" class=\"btn-sm btn btn-primary my-2 my-sm-0 mr-2\">Accedi</button>\n" +
                "\t\t\t\t<a class=\"btn-sm btn btn-primary my-2 my-sm-0\" href=\"/registration\" role=\"button\">Registrati</a>\n" +
                "\t\t\t</div>\n" +
                "\t\t</form>\n";
            return ret;
        }
    }
    printList() {
        if (this.resultList === null) {
            return ""; //resultList is not set yet, cause nobody searched yet
        }
        if (this.resultList.size <= 0) {
            return "<h2 class='h5 text-danger text-center'>Nessun risultato</h2>"; //resultList is not set yet, cause nobody searched yet
        }
        let ret = "<h2>Esercizi: </h2>\n" +
            "<form method='post' action='/exercise'>" +
            "<ul class=\"list-group\">\n";
        this.resultList.forEach((value, key) => {
            ret += "<li class=\"list-group-item\"><p class='d-inline pr-1'>" + value + "</p>" +
                "<button class='btn btn-primary btn-sm float-right' name='sentence' value='" + value + "' type='submit'>Esegui esercizio</button>" +
                "</li>\n";
        });
        return "</ul></form>\n" + ret;
    }
}
exports.SearchView = SearchView;
//# sourceMappingURL=SearchView.js.map