import { defineStore } from "pinia";
import PocketBase from 'pocketbase';
import { useMessagestore } from "./msg";
import { useUserstore } from "./user";
import { get_random_element, BSP_QUESTIONS, BSP_ANSWERS } from "./random_values";

export interface Question {
    question: string,
    answers: Answer[],
    possible_answers: number,
}

export interface Answer {
    answer: string,
    correct: boolean,
}

export interface Quiz {
    id: string | null,
    title: string,
    description: string,
    creator: string | null,
    updated: number | null,
    questions: Question[],
}

export const useQuizStore = defineStore("quiz", {
    state: () => ({
        own_quizzes: [] as Quiz[],
        public_quizzes: [] as Quiz[],
        group_quizzes: [] as Quiz[],
        current_quiz: {} as Quiz,
        // search
        search: "",
        search_results: [] as Quiz[],
    }),
    actions: {
        // search
        async searchQuizzes() { // TODO: search in all quizzes
            if (useUserstore().pb == null) {
                useMessagestore().throwError("PocketBase not initialized");
                return false;
            }
        },
        async loadOwnQuizzes() {
            if (useUserstore().pb == null) {
                useMessagestore().throwError("PocketBase not initialized");
                return false;
            }
            try {
                const quizzes = await useUserstore().pb?.collection<Quiz>("quizzes").getFullList({
                    filter: "creator='" + useUserstore().userId + "'",
                })
                console.log("Loaded own quizzes", quizzes);
                if (quizzes == null) {
                    useMessagestore().throwError("Quizzes could not be loaded");
                    return false;
                }
                this.own_quizzes = quizzes;
                return true;
            } catch (e) {
                useMessagestore().throwError("Quizzes could not be loaded");
                return false;
            }

        },
        async createQuiz() {
            if (useUserstore().pb == null) {
                useMessagestore().throwError("PocketBase not initialized");
                return false;
            }
            try {
                const quiz = {
                    id: null,
                    title: "New Quiz",
                    description: "A new quiz",
                    creator: useUserstore().userId,
                    updated: null,
                    questions: [],
                } as Quiz;
                for (let i = 0; i < 3; i++) {
                    const question = get_random_element(BSP_QUESTIONS);
                    const answers = get_random_element(BSP_ANSWERS);
                    const correct = Math.floor(Math.random() * answers.length);
                    const q = {
                        question: question,
                        answers: [],
                        possible_answers: answers.length,
                    } as Question;
                    for (let j = 0; j < answers.length; j++) {
                        const a = {
                            answer: answers[j],
                            correct: j == correct,
                        } as Answer;
                        q.answers.push(a);
                    }
                    quiz.questions.push(q);
                }
                const record = await useUserstore().pb?.collection<Quiz>("quizzes").create(quiz);
                if (record == null) {
                    useMessagestore().throwError("Quiz could not be created");
                    return false;
                }
                this.current_quiz = record;
                return true;
            } catch (e) {
                useMessagestore().throwError("Quiz could not be created");
                return false;
            }
        },
        async loadQuiz(id: string) {
            if (useUserstore().pb == null) {
                useMessagestore().throwError("PocketBase not initialized");
                return false;
            }
            try {
                const quiz = await useUserstore().pb?.collection<Quiz>("quizzes").getOne(id);
                if (quiz == null) {
                    useMessagestore().throwError("Quiz could not be loaded");
                    return false;
                }
                this.current_quiz = quiz;
                return quiz;
            } catch (e) {
                useMessagestore().throwError("Quiz could not be loaded");
                return false;
            }
        },
        async updateQuiz(quiz: Quiz) {
            if (useUserstore().pb == null) {
                useMessagestore().throwError("PocketBase not initialized");
                return false;
            }
            if (quiz.id == null) {
                useMessagestore().throwError("Quiz could not be updated");
                return false;
            }
            try {
                await useUserstore().pb?.collection("quizzes").update(quiz.id, quiz);
                this.current_quiz = quiz;
                return true;
            } catch (e) {
                useMessagestore().throwError("Quiz could not be updated");
                return false;
            }
        },
        async deleteQuiz(quiz: Quiz) {
            if (useUserstore().pb == null) {
                useMessagestore().throwError("PocketBase not initialized");
                return false;
            }
            if (quiz.id == null) {
                useMessagestore().throwError("Quiz could not be deleted");
                return false;
            }
            try {
                await useUserstore().pb?.collection("quizzes").delete(quiz.id);
                return true;
            } catch (e) {
                useMessagestore().throwError("Quiz could not be deleted");
                return false;
            }
        },
    }
});