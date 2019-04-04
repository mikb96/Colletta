"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseExerciseManager_1 = require("./DatabaseExerciseManager");
const Exercise_1 = require("./Exercise");
class ExerciseClient {
    constructor() {
        this.dbExerciseManager = new DatabaseExerciseManager_1.DatabaseExerciseManager();
    }
    autosolve(sentence, authorId) {
        return __awaiter(this, void 0, void 0, function* () {
            let exercise = new Exercise_1.Exercise(sentence, authorId);
            return exercise.autosolve();
        });
    }
    insertExercise(sentence, authorId, solution = [], topics = []) {
        return __awaiter(this, void 0, void 0, function* () {
            let ex = new Exercise_1.Exercise(sentence, authorId);
            ex.setSolution(authorId, solution, topics, -1);
            yield this.dbExerciseManager.insert(ex);
        });
    }
    getSplittedSentence(sentence) {
        return sentence.split(" ");
    }
    setSolution(sentence, authorId, solverId, finalTags, topics, difficulty) {
        let exercise = new Exercise_1.Exercise(sentence, authorId);
        exercise.setSolution(solverId, finalTags, topics, difficulty);
        this.dbExerciseManager.insert(exercise);
    }
    addValutation(sentence, authorId, userId, mark) {
        let exercise = new Exercise_1.Exercise(sentence, authorId);
        exercise.addValutation(userId, mark);
    }
}
exports.ExerciseClient = ExerciseClient;
//# sourceMappingURL=ExerciseClient.js.map