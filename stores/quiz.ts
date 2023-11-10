import { defineStore } from "pinia";
import PocketBase from 'pocketbase';
import { useMessagestore } from "./msg";
import { useUserstore } from "./user";
import { get_random_element, BSP_QUESTIONS, BSP_ANSWERS } from "./random_values";

export type answer = {
    id: string;
    text: string;
    question: string;
    correct: boolean;
    // only for backend
    pushed: boolean;
};
export type question = {
    id: string;
    question: string;
    quizId: string;
    chosenAnswer: number;
    // only for frontend
    answers: answer[];
    // only for backend
    pushed: boolean;
};
export type Quiz = {
    id: string;
    name: string;
    created: string;
    creator: string;
    description: string;
    questions: question[]; // only at the frontend
    public: boolean;
    // only for backend
    pushed: boolean;
};
export const useQuizStore = defineStore("quiz", {
    state: () => ({
        own_quizzes: [] as Quiz[],
        public_quizzes: [] as Quiz[],
        group_quizzes: [] as Quiz[],
        pb: useUserstore().pb,
        current_quiz: {
            id: "",
            name: "Beispielquiz",
            created: "",
            creator: "",
            description: "Das ist ein Beispielquiz",
            questions: [] as question[],
            public: false,
        } as Quiz,
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
                    answers[i].question = record.id;
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
                    "creator": useUserstore().userId
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
        async loadQuiz(quizId: string) {
            if (useUserstore().pb == null) {
                useMessagestore().throwError("PocketBase not initialized");
                return false;
            }
            try {
                const record_quiz = await useUserstore().pb!.collection('quizzes').getOne<Quiz>(quizId, {
                    expand: 'questions.answers'
                });

                console.log("QUIZ:", record_quiz);
                record_quiz.pushed = true;
                this.current_quiz = record_quiz;
                // load questions
                const record_questions = await this.loadQuestions(quizId);
                if (record_questions) {
                    this.current_quiz.questions = record_questions;
                }
                // load answers
                for (let i = 0; i < this.current_quiz.questions.length; i++) {
                    const record_answers = await this.loadAnswers(this.current_quiz.questions[i].id);
                    if (record_answers) {
                        this.current_quiz.questions[i].answers = record_answers;
                    }
                }
                return this.current_quiz;
            } catch (e) {
                console.error(e);
                useMessagestore().throwError("Quiz could not be loaded");
                return false;
            }
        },
        async loadQuestions(quizId: string) {
            if (useUserstore().pb == null) {
                useMessagestore().throwError("PocketBase not initialized");
                return false;
            }
            try {
                const record_questions = await useUserstore().pb!.collection('questions').getFullList<question>({
                    filter: 'quiz="' + quizId + '"',
                });
                console.log("QUESTIONS:", record_questions);
                record_questions.forEach((question) => {
                    question.pushed = true;
                });
                return record_questions;
            } catch (e) {
                console.error(e);
                useMessagestore().throwError("Questions could not be loaded");
                return false;
            }
        },
        async loadAnswers(questionId: string) {
            if (useUserstore().pb == null) {
                useMessagestore().throwError("PocketBase not initialized");
                return false;
            }
            try {
                const record_answers = await useUserstore().pb!.collection('answers').getFullList<answer>({
                    filter: 'question="' + questionId + '"',
                });
                console.log("ANSWERS:", record_answers);
                record_answers.forEach((answer) => {
                    answer.pushed = true;
                });
                return record_answers;
            } catch (e) {
                console.error(e);
                useMessagestore().throwError("Answers could not be loaded");
                return false;
            }
        },
        addQuestion(quiz: Quiz) {
            this.current_quiz!.questions.push({
                id: "",
                question: get_random_element(BSP_QUESTIONS),
                    quizId: quiz.id,
                    chosenAnswer: -1,
                    answers: [],
                    pushed: false,
            });
        },
        addAnswer(question: question) {
            let correct = true;
            if (question.answers.length > 0) {
                correct = false;
            }
            question.answers.push({
                id: "",
                text: get_random_element(BSP_ANSWERS),
                question: question.id,
                correct: correct,
                pushed: false,
            });
        },
        async removeQuestion(quiz: Quiz, questionIdx: number) {
            // check if question is already pushed
            if (quiz.questions[questionIdx].pushed) {
                // delete question from backend
                if (useUserstore().pb == null) {
                    useMessagestore().throwError("PocketBase not initialized");
                }
                try {
                    await useUserstore().pb!.collection('questions').delete(quiz.questions[questionIdx].id);
                } catch (e) {
                    console.error(e);
                    useMessagestore().throwError("Question could not be deleted");
                    return false;
                }
            }
            quiz.questions.splice(questionIdx, 1);
            return true;
        },
        async removeAnswer(question: question, answerIdx: number) {
            // check if answer is already pushed
            if (question.answers[answerIdx].pushed) {
                // delete answer from backend
                if (useUserstore().pb == null) {
                    useMessagestore().throwError("PocketBase not initialized");
                }
                try {
                    await useUserstore().pb!.collection('answers').delete(question.answers[answerIdx].id);
                } catch (e) {
                    console.error(e);
                    useMessagestore().throwError("Answer could not be deleted");
                    return false;
                }
            }
            question.answers.splice(answerIdx, 1);
            return true;
        },
        async removeQuiz(quiz: Quiz) {
            // check if quiz is already pushed
            if (quiz.id != "" && quiz.id != null) {
                // delete quiz from backend
                if (useUserstore().pb == null) {
                    useMessagestore().throwError("PocketBase not initialized");
                }
                try {
                    await useUserstore().pb!.collection('quizzes').delete(quiz.id);
                    this.current_quiz = {
                        id: "",
                        name: "Beispielquiz",
                        created: "",
                        creator: "",
                        description: "Das ist ein Beispielquiz",
                        questions: [] as question[],
                        public: false,
                    } as Quiz;
                } catch (e) {
                    console.error(e);
                    useMessagestore().throwError("Quiz could not be deleted");
                    return false;
                }
            }
            return true;
        },
        async updateQuiz(quiz: Quiz) {
            if (useUserstore().pb == null) {
                useMessagestore().throwError("PocketBase not initialized");
                return;
            }
            try {
                // quiz meta data
                if (!quiz.pushed) {
                    // create quiz
                    if (quiz.id == "") {
                        const data = {
                            "name": quiz.name,
                            "description": quiz.description,
                            "public": quiz.public,
                            "creator": useUserstore().userId
                        };
                        const record = await useUserstore().pb!.collection('quizzes').create(data);
                        console.log(record);
                        quiz.id = record.id;
                        quiz.pushed = true;
                    } else {
                        // update quiz
                        const data = {
                            "name": quiz.name,
                            "description": quiz.description,
                            "public": quiz.public,
                            "creator": useUserstore().userId
                        };
                        const record = await useUserstore().pb!.collection('quizzes').update(quiz.id, data);
                        console.log(record);
                        quiz.id = record.id;
                        quiz.pushed = true;
                    }
                }
                // questions
                for (let i = 0; i < quiz.questions.length; i++) {
                    await this.updateQuestion(quiz.questions[i]);
                }
                console.log("QUIZ:", quiz);
                return true;
            } catch (e) {
                console.error(e);
                useMessagestore().throwError("Quiz could not be saved");
                return false;
            }
        },
        async updateQuestion(question: question) {
            if (useUserstore().pb == null) {
                console.error("PocketBase not initialized");
                useMessagestore().throwError("PocketBase not initialized");
                return;
            }
            try {
                // question meta data
                if (!question.pushed) {
                    if (question.id == "") {
                        // create question
                        const data = {
                            "question": question.question,
                            "quiz": question.quizId,
                        };
                        const record = await useUserstore().pb!.collection('questions').create(data);
                        console.log(record);
                        question.id = record.id;
                        question.pushed = true;
                    } else {
                        // update question
                        const data = {
                            "question": question.question,
                            "quiz": question.quizId,
                        };
                        const record = await useUserstore().pb!.collection('questions').update(question.id, data);
                        console.log(record);
                        question.id = record.id;
                        question.pushed = true;
                    }
                }
                // answers
                for (let i = 0; i < question.answers.length; i++) {
                    await this.updateAnswer(question.answers[i]);
                }
            } catch (e) {
                console.error(e);
                useMessagestore().throwError("Question could not be saved");
                return false;
            }
        },
        async updateAnswer(answer: answer) {
            if (useUserstore().pb == null) {
                useMessagestore().throwError("PocketBase not initialized");
                return;
            }
            try {
                if (!answer.pushed) {
                    if (answer.id == "") {
                        // create answer
                        const data = {
                            "text": answer.text,
                            "correct": answer.correct,
                            "question": answer.question,
                        };
                        const record = await useUserstore().pb!.collection('answers').create(data);
                        console.log(record);
                        answer.id = record.id;
                        answer.pushed = true;
                    } else {
                        // update answer
                        const data = {
                            "text": answer.text,
                            "correct": answer.correct,
                            "question": answer.question,
                        };
                        const record = await useUserstore().pb!.collection('answers').update(answer.id, data);
                        console.log(record);
                        answer.id = record.id;
                        answer.pushed = true;
                    }
                }
            } catch (e) {
                console.error(e);
                useMessagestore().throwError("Answer could not be saved");
                return false;
            }
        },
    },
});