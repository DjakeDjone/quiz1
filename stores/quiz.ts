import { defineStore } from "pinia";
import PocketBase from 'pocketbase';
import { useMessagestore } from "./msg";
import { useUserstore } from "./user";

export type answer = {
    id: number;
    text: string;
    correct: boolean;
};
export type question = {
    id: number;
    question: string;
    answers: answer[];
};
export type quiz = {
    id: number;
    name: string;
    created: string;
    creator: string;
    description: string;
    questions: question[];
    signalWords: string[];
};
export const useQuizStore = defineStore({
    id: 'quiz',
    state: () => ({
        user: useUserstore(),
        msg: useMessagestore(),
        currentQuiz: {} as quiz,
        idx: 0,
        quizzes: [] as quiz[], // TODO: change to quiz type
        filterWords: [] as string[],
        ownQuiz: {
            id: 0,
            name: '',
            questions: [
                {
                    id: 1,
                    question: 'Was ist die beste Seite, um Quizze zu erstellen?',
                    answers: [
                        { id: 1, text: 'fri3dl.com', correct: true },
                        { id: 2, text: 'die erstbeste Seite im Darknet', correct: false },
                        { id: 3, text: 'motherfuckingwebsite.com', correct: false },
                    ],
                },
            ],
        },
    }),
    actions: {
        async createQuiz() {
            const data = {
                name: "test",
                // creator:
            }
            try {
                const record = await this.user.db.collection('quizes').create(data)
            } catch (e) {
                this.msg.throwError("Creating Quiz failed", 3000)
            }
        },
        saveOwnQuiz() {
            localStorage.setItem('ownQuiz', JSON.stringify(this.ownQuiz));
        },
        async loadRelevantQuizzes() {
            console.log(this.user.REST_API_URL);
            try {
                const resultList = await this.user.db.collection('quizes').getList(1, 50, {
                    sort: '-created',
                });
                console.log("RESULT:", resultList.items);
                const len = resultList.totalItems
                for (let i = 0; i < len; i++) {
                    this.quizzes.push(resultList.items[i] as unknown as quiz);
                }
                console.log("QUIZZES:", this.quizzes);
            } catch (e) {
                this.msg.throwError('cant load data because db is null')
            }
        },
        loadOwnQuiz() {
            const ownQuiz = localStorage.getItem('ownQuiz');
            if (ownQuiz) {
                this.ownQuiz = JSON.parse(ownQuiz);
            }
        },
        async loadQuiz(id: number) {
            try {
                const record = await this.user.db.collection('quizes').getOne(id.toString(), {
                    expand: 'relField1,relField2.subRelField',
                });  
                this.currentQuiz = record as unknown as quiz;
                console.log("RECORD:", record);
            } catch (e) {
                this.msg.throwError('cant load data because db is null')
            }
        },
        addQuestion() {
            this.ownQuiz.questions.push({
                id: this.ownQuiz.questions.length + 1,
                question: '',
                answers: [],
            });
        },
        addAnswer(questionIndex: number) {
            this.ownQuiz.questions[questionIndex].answers.push({
                id: this.ownQuiz.questions[questionIndex].answers.length + 1,
                text: '',
                correct: false,
            });
        }
    }
});