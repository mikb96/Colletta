"use strict";
//<reference path="POSManager.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
class HunposManager {
    constructor() {
        this.fileSystem = require('fs');
        this.shell = require('shelljs');
        //this.train();
        //scommentare per mac/linux
        /*this.inputFilePath='src/ts/presenter/hunpos/input.txt';
        this.outputFilePath='src/ts/presenter/hunpos/output.txt';
        this.modelFilePath='src/ts/presenter/hunpos/italian_model';*/
        //scommentare per windows
        this.inputFilePath = 'src\\ts\\presenter\\hunpos\\input.txt';
        this.outputFilePath = 'src\\ts\\presenter\\hunpos\\output.txt';
        this.modelFilePath = 'src\\ts\\presenter\\hunpos\\italian_model';
    }
    setModel(modelFilePath) {
        //this.modelFilePath=modelFilePath;
    }
    ;
    buildInputFile(sentence) {
        var words = sentence.split(" ");
        this.fileSystem.writeFile(this.inputFilePath, '', () => console.log('done'));
        for (let i = 0; i < words.length; i++) {
            this.fileSystem.appendFileSync(this.inputFilePath, words[i] + "\n", (err) => {
                if (err)
                    throw err;
                console.log('The "data to append" was appended to file!');
            });
            /*if(i<(words.length-1)){
                fileSystem.appendFileSync('input.txt', '\n', (err) => {    //controllo per non far mettere l'ultimo invio
                    if (err) throw err;
                });
            }*/
        }
    }
    ;
    buildSolution() {
        var wordSolArray = this.fileSystem.readFileSync(this.outputFilePath).toString().split("\n");
        console.log("arr: " + wordSolArray);
        let obj = {
            sentence: []
        };
        let i = 0;
        while (wordSolArray[i] !== "") {
            var wordLab = wordSolArray[i].split("\t");
            obj.sentence.push({ word: wordLab[0], label: wordLab[1] });
            i++;
        }
        this.fileSystem.writeFileSync(this.inputFilePath, "");
        return obj;
    }
    ;
    getSolution(modelFilePath) {
        this.buildInputFile(modelFilePath);
        //this.train();
        this.tag();
        return this.buildSolution();
    }
    ;
    train() {
        //scommentare per windows
        this.shell.exec('src\\ts\\presenter\\hunpos\\hunpos-train ' + this.modelFilePath + '< src\\ts\\presenter\\hunpos\\train');
        //scommentare per mac/linux
        //this.shell.exec('./src/ts/presenter/hunpos/hunpos-train ' + this.modelFilePath + '< ./src/ts/presenter/hunpos/train');
    }
    ;
    tag() {
        //scommentare per windows
        this.shell.exec('src\\ts\\presenter\\hunpos\\hunpos-tag ' + this.modelFilePath + '< ' + this.inputFilePath + '>' + this.outputFilePath);
        //scommentare per mac/linux
        //this.shell.exec('./src/ts/presenter/hunpos/hunpos-tag ' + this.modelFilePath + '< ' + this.inputFilePath + '>' + this.outputFilePath);
    }
    ;
}
exports.HunposManager = HunposManager;
//# sourceMappingURL=HunposManager.js.map