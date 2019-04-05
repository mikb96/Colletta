"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PageView is an abstract class that represents the view
 * for all the application pages
 */
class PageView {
    /**
     * PageView is an abstract class and it cannot have objects
     */
    constructor() {
        this.menuList = null;
        this.title = null;
    }
    setTitle(value) {
        this.title = value;
    }
    setMenuList(value) {
        this.menuList = value;
    }
    getHead() {
        return "<!DOCTYPE html>" +
            "<html lang=\"en\">" +
            "<head>" +
            "    <meta charset=\"UTF-8\">" +
            "    <title>" + this.title + "</title>" +
            "    <link rel=\"stylesheet\" type=\"text/css\" href=\"/newStyle.css\">" +
            "    <link rel=\"stylesheet\" type=\"text/css\" href=\"/style.css\">" +
            "    <!--bootstrap-->" +
            "    <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css\">" +
            "    <script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js\"></script>" +
            "    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js\"></script>" +
            "    <script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js\"></script>" +
            "</head>" +
            "<body>";
    }
    getFoot(script) {
        return "</body>" +
            "<script>" + script + "</script>" +
            "</html>";
    }
}
exports.PageView = PageView;
//# sourceMappingURL=PageView.js.map