import { defineStore } from "pinia";
import PocketBase from 'pocketbase';
import { useMessagestore } from "./msg";
import { useUserstore, type User } from "./user";
import { get_random_element, BSP_QUESTIONS, BSP_ANSWERS } from "./random_values";
import type { Quiz } from "./quiz";

export type Summary = {
    id: string;
    created: string;
    updated: string;
    data: string;
    writer: string;
    comments: string[] | null;
    quiz: string | null;
    // for the frontend
    quiz_obj: Quiz | null;
    writer_obj: User | null;
    comments_objs: Comment[] | null;
}

export type Comment = {
    id: string;
    created: string;
    updated: string;
    content: string;
    writer: string;
    summary: string;
    // for the frontend
    writer_obj: User | null;
}
export const useSummaryStore = defineStore("summary", {
    state: () => ({
        summaries: [] as Summary[],
        loading: false,
        curr_summary: null as Summary | null,
    }),
    actions: {
        async createSummary(data: string) {
            if (!useUserstore().loggedIn) {
                useMessagestore().throwError("You must be logged in to create a summary");
                return;
            }
            try {
                const record = await useUserstore().pb?.collection("summaries").create<Summary>({
                    data,
                    writer: useUserstore().userId,
                    quiz: this.curr_summary?.quiz || null,
                });
                if (record) {
                    this.summaries.push(record);
                }
            } catch (e) {
                useMessagestore().throwError(e as string);
            }
        },
        async loadSummaries(filterword: string = "") {
            if (this.loading) {
                return;
            }
            this.loading = true;
            try {
                const records = await useUserstore().pb?.collection("summaries").getFullList({
                    sort: "-created",
                    filter: filterword.length>0 ? `data ~ '${filterword}'` : '',
                    expand: 'writer,comments,comments.writer'
                });
                if (records) {
                    this.summaries = records as unknown as Summary[];
                    this.summaries.forEach((summary, i) => {
                        summary.quiz_obj = records[i].expand?.quiz as Quiz;
                        summary.comments_objs = records[i].expand?.comments as Comment[] | null;
                        if (summary.comments_objs) {
                            summary.comments_objs.forEach((comment, j) => {
                                comment.writer_obj = records[i].expand?.comments[j].expand?.writer as User;
                            });
                        }
                        summary.writer_obj = records[i].expand?.writer as User;
                    });
                }
            } catch (e) {
                useMessagestore().throwError(e as string);
            }
            this.loading = false;
        },
        async loadSummary(id: string) {
            try {
                const record = await useUserstore().pb?.collection("summaries").getOne(id, {
                    expand: 'comments,writer'
                });
                console.log(record);
                if (record) {
                    this.curr_summary = {
                        id: record.id,
                        created: record.created,
                        updated: record.updated,
                        data: record.data,
                        writer: record.writer,
                        comments: record.comments,
                        quiz: record.quiz,
                        quiz_obj: record.expand?.quiz as Quiz | null,
                        writer_obj: record.expand?.writer as User | null,
                        comments_objs: record.expand?.comments as Comment[] | null,
                    };
                    if (this.curr_summary.comments_objs) {
                        this.curr_summary.comments_objs.forEach((comment, j) => {
                            comment.writer_obj = record.expand?.comments[j].expand?.writer as User;
                        });
                    }
                    return this.curr_summary;
                }

            } catch (e) {
                useMessagestore().throwError(e as string);
            }
        }
    }
});