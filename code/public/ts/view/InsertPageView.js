"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PageView_1 = require("./PageView");
const InsertPagePresenter_1 = require("../presenter/InsertPagePresenter");
class InsertPageView extends PageView_1.PageView {
    constructor(app) {
        super();
        this.insertPageController = new InsertPagePresenter_1.InsertPagePresenter(this);
        this.insertPageController.update(app);
    }
    getPage() {
        return "<!DOCTYPE html> " +
            "<html lang=\"it\"> " +
            "<head> " +
            "<meta charset=\"UTF-8\"> " +
            "<title>Inserimento frase</title> " +
            "<link rel=\"stylesheet\" href=\"/style.css\"> " +
            "</head> " +
            "<body> " +
            "<div id=\"back\"> " +
            "<h1>NUOVO ESERCIZIO</h1>" +
            "<form method=\"POST\" action=\"/exercise\"> " +
            "<label for=\"sentence\">Inserisci una frase</label> " +
            "<input type=\"text\" id=\"sentence\" name=\"sentence\"/> " +
            "<input type=\"submit\" value=\"invia\"/> </form> " +
            "</div> " +
            "</body> " +
            "</html>";
    }
}
exports.InsertPageView = InsertPageView;
//# sourceMappingURL=InsertPageView.js.map