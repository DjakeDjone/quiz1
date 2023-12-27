import { defineStore } from "pinia";
import PocketBase from 'pocketbase';
import { useMessagestore } from "./msg";
import { useUserstore } from "./user";
import { get_random_element, BSP_QUESTIONS, BSP_ANSWERS } from "./random_values";

export interface Question {
    qz_type: 'single' | 'multiple' | 'text' | 'number',
    question: string,
    answers: Answer[],
    possible_answers: number,
    time_limit?: number, // in seconds
}
export type QuestionDoing = {
    qz_type: 'single' | 'multiple' | 'text' | 'number',
    question: string,
    answers: Answer[],
    time_limit?: number,
    // 
    possible: number,
    chosen: number[],
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

export const calcPoints = (questions: QuestionDoing[]) => {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        if (q.qz_type == 'single') {
            if (q.chosen.length == 1) {
                if (q.answers[q.chosen[0]].correct) {
                    score++;
                }
            }
        } else if (q.qz_type == 'multiple') {
            if (q.chosen.length == q.possible) {
                let correct = true;
                for (let j = 0; j < q.chosen.length; j++) {
                    if (!q.answers[q.chosen[j]].correct) {
                        correct = false;
                    }
                }
                if (correct) {
                    score++;
                }
            }
        }
    }
    return score;
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
        // 
        quiz_doing: [] as QuestionDoing[],
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
                    const correct = 1;
                    const q = {
                        question: question,
                        answers: [],
                        possible_answers: 1,
                        qz_type: 'single',
                    } as Question;
                    for (let j = 0; j < 5; j++) {
                        const a = {
                            answer: get_random_element(BSP_ANSWERS),
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
                for (let i = 0; i < quiz.questions.length; i++) {
                    const q = quiz.questions[i];
                    if (!q.qz_type) {
                        q.qz_type = 'single';
                    }
                }
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
        // Do Quiz
        submitQuiz(questions: QuestionDoing[]) {
            // calculate score
            this.quiz_doing = questions;
            let score = 0;
            for (let i = 0; i < questions.length; i++) {
                const q = questions[i];
                if (q.qz_type == 'single') {
                    if (q.chosen.length == 1) {
                        if (q.answers[q.chosen[0]].correct) {
                            score++;
                        }
                    }
                } else if (q.qz_type == 'multiple') {
                    if (q.chosen.length == q.possible) {
                        let correct = true;
                        for (let j = 0; j < q.chosen.length; j++) {
                            if (!q.answers[q.chosen[j]].correct) {
                                correct = false;
                            }
                        }
                        if (correct) {
                            score++;
                        }
                    }
                }
            }
            return score;
        }
    }
});