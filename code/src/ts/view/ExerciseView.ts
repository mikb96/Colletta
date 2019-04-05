import {PageView} from "./PageView";

class ExerciseView extends PageView{
    private sentence : any;
    private key : any;
    private hunposTranslation : any;
    private hunposTags : any;
    private fileSystem : any;
    constructor(app : any){
        super(app);
        this.sentence = null;
        this.key = null;
        this.hunposTranslation = null;
        this.hunposTags = null;
        this.fileSystem = require('fs');
    }

    setSentence(value : string) {
        this.sentence = value;
    }

    setKey(value : number) {
        this.key = value;
    }

    setHunposTranslation(value : string[]) {
        this.hunposTranslation = value;
    }

    setHunposTags(value : string[]) {
        this.hunposTags = value;
    }

    getPage() {
        let data =  this.fileSystem.readFileSync('./public/exercise.html').toString();
        const words = this.sentence.split(" ");
        data=data.replace(/\*table\*/g, this.buildForm(words));
        data=data.replace(/\*script\*/g, this.getScript());
        data=data.replace(/\*css\*/g, this.buildCss(words));
        //data=data.replace(/\*wordsnumber\*/g, words.length);
        data=data.replace(/\*sentence\*/g, this.sentence);
        data=data.replace(/\*key\*/g, this.key);
        data=data.replace(/\*hunposTags\*/g, JSON.stringify(this.hunposTags));
        return data;
    }
    buildForm(words : string[]){
        let table="";
        for(let i=0;i < words.length;i++){
            table += "<li class='first'>" + words[i] + "</li><li class='second'>"+this.hunposTranslation[i]+"</li><li class='third'>"+this.getSelect(i)+"</li>\n";
        }
        return table;
    }

    buildCss(words : string[]){
        let css="";
        for(let i=0;i < words.length;i++){
            css += this.getCss(i);
        }
        return css;
    }

    getSelect(index : number){
        const input =  this.fileSystem.readFileSync('./public/htmlSelect.html').toString();
        return input.replace(/\*i\*/g,index);
    }

    getScript(){
        return this.fileSystem.readFileSync('./public/jsSelect.js').toString();
    }

    getCss(index : number){
        const input =  this.fileSystem.readFileSync('./public/cssSelect.css').toString();
        return input.replace(/\*i\*/g,index);
    }
}
export {ExerciseView};