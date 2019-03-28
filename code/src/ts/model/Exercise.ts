import {POSManager} from './POSManager';
import {HunposManager} from "./HunposManager";
import {Data} from "./Data";

abstract class Exercise implements Data{
    private sentence: string;
    private topics: string [];
    private difficulty: number;
    private solutionTags: string [];
    private key: string;
    private hunpos: POSManager;

    constructor( sentence : string) {
        this.sentence = sentence;
        this.key = "-1";
        this.solutionTags = [];
        this.topics = [];
        this.difficulty = 0;
        this.hunpos = new HunposManager();
    }

    getKey(): string {
        return this.key;
    }

    getSentence(): string {
        return this.sentence;
    }

    getPOSManager(): POSManager {
        return this.hunpos;
    }

    setKey(key: string): void {
        this.key=key;
    }

    setSentence(sentence: string): void {
        this.sentence=sentence;
    }

    setTopics(topics: string []): void {
        this.topics=topics;
    }

    setDifficulty(difficulty : number): void {
        this.difficulty=difficulty;
    }
    setSolutionTags(solutionTags : string []) : void{
        this.solutionTags=solutionTags;
    }
    getTopics(): string [] {
        return this.topics;
    }
    getDifficulty() : number{
        return this.difficulty;
    }
    getSolutionTags() : string []{
        return this.solutionTags;
    }

    abstract autosolve(): any;

    evaluate(correctionID:number, solution:any) : number {return 1;};

    toJSON() : any{
        return 1;
    }
}
export {Exercise};