import { defineStore } from "pinia";
import PocketBase from 'pocketbase';
import { useMessagestore } from "./msg";
import { useUserstore } from "./user";

export type answer = {
    id: string;
    text: string;
    question: string;
    correct: boolean;
};
export type question = {
    id: string;
    question: string;
    quizId: string;
    chosenAnswer: number;
    // only for frontend
    answers: answer[];
};
export type Quiz = {
    id: string;
    name: string;
    created: string;
    creator: string;
    description: string;
    questions: question[]; // only at the frontend
    public: boolean;
};
export const useQuizStore = defineStore("quiz", {
    state: () => ({
        own_quizzes: [] as Quiz[],
        public_quizzes: [] as Quiz[],
        group_quizzes: [] as Quiz[],
        pb: useUserstore().pb,
        current_quiz: null as Quiz | null,
    }),
    actions: {
        async createAnswer(question: string, text: string, correct: boolean) {
            if (this.pb == null) {
                useMessagestore().throwError("PocketBase not initialized");
            }
            try {
                const data = {
                    "text": text,
                    "correct": correct,
                    "question": question,
                };
                const record = await this.pb!.collection('answers').create(data);
                console.log(record);
                return true;
            } catch (e) {
                useMessagestore().throwError("Answer could not be created");
                return false;
            }
        },
        async createQuestion(quizId: string, question: string, answers: answer[]) {
            if (this.pb == null) {
                useMessagestore().throwError("PocketBase not initialized");
                return false;
            }
            try {
                const data = {
                    "question": question,
                    "quiz": quizId,
                };
                const record = await this.pb!.collection('questions').create(data);
                console.log(record);
                for (let i = 0; i < answers.length; i++) {
                    answers[i].questionId = record.id;
                    await this.createAnswer(record.id, answers[i].text, answers[i].correct);
                }
                return true;
            } catch (e) {
                useMessagestore().throwError("Question could not be created");
                return false;
            }
        },
        async createQuiz() { 
            this.pb = useUserstore().pb;
            if (this.pb == null) {
                useMessagestore().throwError("PocketBase not initialized");
                return false;
            }
            try {
                const data = {
                    "name": this.current_quiz?.name,
                    "description": this.current_quiz?.description,
                    "public": this.current_quiz?.public,
                    "creator": useUserstore().username,
                };
                const record = await this.pb!.collection('quizzes').create(data);
                console.log(record);
                this.current_quiz!.id = record.id;
                return true;
            } catch (e) {
                useMessagestore().throwError("Quiz could not be created");
                return false;
            }
        },
        async updateQuiz(quiz: Quiz) { // TODO
            if (this.pb == null) {
                useMessagestore().throwError("PocketBase not initialized");
            }
            try {
                const data = {
                    "name": quiz.name,
                    "description": quiz.description,
                    "public": quiz.public,
                };
                const record = await this.pb!.collection('quizzes').update(quiz.id, data);
                console.log(record);
                for (let i = 0; i < quiz.questions.length; i++) {
                    await this.updateQuestion(quiz.questions[i]);
                }
            } catch (e) {
                useMessagestore().throwError("Quiz could not be updated");
                return false;
            }
        },
        async updateQuestion(question: question) { // TODO
            if (this.pb == null) {
                useMessagestore().throwError("PocketBase not initialized");
            }
            try {
                const data = {
                    "question": question.question,
                };
                const record = await this.pb!.collection('questions').update(question.id, data);
                console.log(record);
                for (let i = 0; i < question.answers.length; i++) {
                    await this.updateAnswer(question.answers[i]);
                } 
            } catch (e) {
                useMessagestore().throwError("Question could not be updated");
                return false;
            }
        },
        async updateAnswer(answer: answer) { // TODO
            if (this.pb == null) {
                useMessagestore().throwError("PocketBase not initialized");
            }
            try {
                const data = {
                    "text": answer.text,
                    "correct": answer.correct,
                    "question": answer.question,
                };
                const record = await this.pb!.collection('answers').update(answer.id, data);
                console.log(record);
                return true;
            } catch (e) {
                useMessagestore().throwError("Answer could not be updated");
                return false;
            }
        },
        async loadQuiz(quizId: string) { // TODO
        },
        addQuestion(quiz: Quiz) { // TODO
        },
        addAnswer(question: question) { // TODO
        },
        removeQuestion(quiz: Quiz, questionIdx: number) { // TODO
        }, 
        removeAnswer(question: question, answerIdx: number) { // TODO
        },
    },
});