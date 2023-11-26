import { defineStore } from "pinia";
import PocketBase from 'pocketbase';
import { useMessagestore } from "./msg";
import { useUserstore } from "./user";
import { get_random_element, BSP_QUESTIONS, BSP_ANSWERS } from "./random_values";

export type Answer = {
    text: string;
    correct: boolean;
};
export type Question = {
    question: string;
    possible_answers: number;
    answers: Answer[];
};
export type Quiz = {
    id: string;
    name: string;
    created: string;
    creator: string;
    description: string;

    questions: Question[]; // only at the frontend
    // public: boolean;
    // only for backend
    pushed: boolean;
    points?: number;
};
export const useQuizStore = defineStore("quiz", {
    state: () => ({
        own_quizzes: [] as Quiz[],
        public_quizzes: [] as Quiz[],
        group_quizzes: [] as Quiz[],
        pb: useUserstore().pb,
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
                const record = await useUserstore().pb!.collection('quizzes').getFullList<Quiz>({
                    filter: 'creator="' + useUserstore().userId + '"',
                });
                console.log("RECORD:", record);
                record.forEach((quiz) => {
                    quiz.pushed = true;
                });
                this.own_quizzes = record;
                return record;
            } catch (e) {
                useMessagestore().throwError("Quizzes could not be loaded");
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
                
            } catch (e) {
                useMessagestore().throwError("Quiz could not be created");
                return false;
            }
        },
    }
});