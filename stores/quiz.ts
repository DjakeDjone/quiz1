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
    chosenAnswer: number;
};
export type Quiz = {
    id: number;
    name: string;
    created: string;
    creator: string;
    description: string;
    questions: question[];
    signalWords: string[];
    public: boolean;
};
export const useQuizStore = defineStore({
    id: 'quiz',
    state: () => ({
        user: useUserstore(),
        msg: useMessagestore(),
        currentQuiz: {} as Quiz,
        idx: 0,
        quizzes: [] as Quiz[], // TODO: change to quiz type
        filterWords: [] as string[],
        ownQuiz: {
            name: 'My Quiz',
            questions: [
                {
                    id: 1,
                    question: 'What is the capital of Germany?',
                    answers: [
                        {
                            id: 1,
                            text: 'Berlin',
                            correct: true,
                        },
                        {
                            id: 2,
                            text: 'Hamburg',
                            correct: false,
                        },
                        {
                            id: 3,
                            text: 'Munich',
                            correct: false,
                        },
                        {
                            id: 4,
                            text: 'Cologne',
                            correct: false,
                        },
                    ],
                },
            ] as question[],
            description: 'This is my quiz',
            signalWords: ['test'],
            public: true,
        } as Quiz,
    }),
    actions: {
        async createQuiz() {
            if (!this.user.loggedIn) {
                console.log("quiz: ", this.ownQuiz);
                
                this.msg.throwError("You need to be logged in to create a quiz", 3000);
                return;
            }
            const data = {
                name: this.ownQuiz.name,
                creator: this.user.userId,
                description: this.ownQuiz.description,
                signalWords: this.ownQuiz.signalWords,
                questions: this.ownQuiz.questions,
                public: this.ownQuiz.public,
            };            
            console.log("myQuiz:", this.ownQuiz);
            try {
                const record = await this.user.db.collection('quizes').create(data)
                console.log("RECORD:", record);
                this.msg.throwSuccess("Quiz created", 5000);
                this.ownQuiz = {
                    name: 'My Quiz',
                    questions: [
                        {
                            id: 1,
                            question: 'What is the capital of Germany?',
                            answers: [
                                {
                                    id: 1,
                                    text: 'Berlin',
                                    correct: true,
                                },
                                {
                                    id: 2,
                                    text: 'Hamburg',
                                    correct: false,
                                },
                            ],
                            chosenAnswer: 0,
                        },
                    ] as question[],
                    description: 'This is my quiz',
                    signalWords: ['test'],
                } as Quiz;
                this.saveOwnQuiz();
            } catch (e) {
                this.msg.throwError("Creating Quiz failed", 3000)
            }
        },
        saveOwnQuiz() {
            localStorage.setItem('ownQuiz', JSON.stringify(this.ownQuiz));
        },
        async loadRelevantQuizzes() {
            try {
                // this.filterWords = ['test'];
                if (this.filterWords.length == 0) this.filterWords = [''];
                let filter = '';
                for (let i = 0; i < this.filterWords.length; i++) {
                    filter += 'signalWords ~ "' + this.filterWords[i] + '"';
                    if (i < this.filterWords.length - 1) filter += ' OR ';
                }
                console.log("FILTER:", filter);
                const resultList = await this.user.db.collection('quizes').getList(1, 50, {
                    sort: '-created',
                    filter: filter,
                    expand: 'relField1,relField2.subRelField',
                });
                console.log("RESULT:", resultList.items);
                const len = resultList.totalItems
                this.quizzes = [];
                for (let i = 0; i < len; i++) {
                    this.quizzes.push(resultList.items[i] as unknown as Quiz);
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
                this.currentQuiz = record as unknown as Quiz;
                const questions1 = JSON.parse(record.questions);
                console.log("QUESTIONS1:", questions1.questions);
                console.log("QUIZ:", this.currentQuiz.questions);
            } catch (e) {
                this.msg.throwError('cant load data because db is null')
            }
        },
        addQuestion() {
            this.ownQuiz.questions.push({
                id: this.ownQuiz.questions.length + 1,
                question: '',
                answers: [
                    {
                        id: 1,
                        text: '',
                        correct: false,
                    },
                ],
                chosenAnswer: 0,
            });
        },
        addAnswer(questionIndex: number) {
            console.log(this.ownQuiz.questions[questionIndex - 1]);
            this.ownQuiz.questions[questionIndex-1].answers.push({
                id: this.ownQuiz.questions[questionIndex-1].answers.length + 1,
                text: '',
                correct: false,
            });
        },
        removeQuestion(questionIndex: number) {
            this.ownQuiz.questions.splice(questionIndex, 1);
        },
        removeAnswer(questionIndex: number, answerIndex: number) {
            this.ownQuiz.questions[questionIndex].answers.splice(answerIndex, 1);
        },
    }
});