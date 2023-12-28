import { defineStore } from "pinia";
import PocketBase from 'pocketbase';
import { useMessagestore } from "./msg";
import { useUserstore, type User } from "./user";
import { get_random_element, BSP_QUESTIONS, BSP_ANSWERS } from "./random_values";
import { useQuizStore, type Quiz } from "./quiz";

export type Summary = {
    id: string;
    created: string;
    updated: string;
    title: string,
    description: string,
    data: string;
    writer: string;
    comments: string[] | null;
    quizzes: string[] | null;
    stars: number;
    // for the frontend
    quiz_objs: Quiz[] | null;
    writer_obj: User | null;
    comments_objs: Comment[] | null;
}

export type SummaryPreview = {
    id: string;
    created: string;
    updated: string;
    title: string,
    description: string,
    writer: string;
    stars: number;
    // comments_count: number;
    // for the frontend
    writer_obj: User | null;
}

export type Comment = {
    id: string;
    created: string;
    updated: string;
    content: string;
    writer: string;
    summary: string;
    comments: string[] | null;
    stars: number;
    // for the frontend
    writer_obj: User | null;
    comments_objs: Comment[] | null;
}
export const useSummaryStore = defineStore("summary", {
    state: () => ({
        summaries: [] as SummaryPreview[],
        own_summaries: [] as SummaryPreview[],
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
                    title: "New Summary",
                    description: "Description",
                    data,
                    writer: useUserstore().userId,
                    quizzes: this.curr_summary?.quizzes,
                });
                if (record) {
                    // this.summaries.push(record);
                    this.curr_summary = record;
                }
            } catch (e) {
                useMessagestore().throwError(e as string);
            }
        },
        async loadSummaries(filterword: string = "") {
            if (this.loading) {
                while (this.loading) {
                    await new Promise(r => setTimeout(r, 100));
                }
            }
            this.loading = true;
            try {
                const records = await useUserstore().pb?.collection("summary_prev").getFullList({
                    sort: "-created",
                    filter: filterword.length > 0 ? `description ~ '${filterword}' || title ~ '${filterword}'` : '',
                    expand: 'writer,comments,comments.writer'
                });
                if (records) {
                    this.summaries = records as unknown as Summary[];
                    this.summaries.forEach((summary, i) => {
                        // summary.quiz_objs = records[i].expand?.quizzes as Quiz[] | null;
                        // summary.comments_objs = records[i].expand?.comments as Comment[] | null;
                        // if (summary.comments_objs) {
                        //     summary.comments_objs.forEach((comment, j) => {
                        //         comment.writer_obj = records[i].expand?.comments[j].expand?.writer as User;
                        //     });
                        // }
                        summary.writer_obj = records[i].expand?.writer as User;
                    });
                }
            } catch (e) {
                useMessagestore().throwError(e as string);
            }
            this.loading = false;
        },
        async loadOwnSummaries() {
            if (!useUserstore().loggedIn) {
                useMessagestore().throwError("You must be logged in to see your summaries");
                return;
            }
            if (this.loading) {
                while (this.loading) {
                    await new Promise(r => setTimeout(r, 100));
                }
            }
            this.loading = true;
            try {
                const records = await useUserstore().pb?.collection("summary_prev").getFullList({
                    sort: "-created",
                    filter: `writer='${useUserstore().userId}'`,
                    expand: 'writer'
                });
                console.log("own summaries", records);
                if (records) {
                    this.own_summaries = records as unknown as Summary[];
                    this.own_summaries.forEach((summary, i) => {
                        // summary.quiz_objs = records[i].expand?.quiz as Quiz[] | null;
                        // summary.comments_objs = records[i].expand?.comments as Comment[] | null;
                        // if (summary.comments_objs) {
                        //     summary.comments_objs.forEach((comment, j) => {
                        //         comment.writer_obj = records[i].expand?.comments[j].expand?.writer as User;
                        //     });
                        // }
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
                    expand: 'writer,comments.writer,quizzes'
                });
                console.log(record);
                if (record) {
                    this.curr_summary = {
                        id: record.id,
                        title: record.title,
                        description: record.description,
                        stars: record.stars,
                        created: record.created,
                        updated: record.updated,
                        data: record.data,
                        writer: record.writer,
                        comments: record.comments,
                        quizzes: record.quizzes,
                        quiz_objs: record.expand?.quizzes as Quiz[] | null,
                        writer_obj: record.expand?.writer as User | null,
                        comments_objs: record.expand?.comments as Comment[] | null,
                    };
                    if (this.curr_summary.comments_objs) {
                        this.curr_summary.comments_objs.forEach((comment, j) => {
                            comment.writer_obj = record.expand?.comments[j].expand?.writer as User;
                        });
                    }
                    await this.loadComments(id);
                    let stars = 0;
                    if (this.curr_summary.comments_objs) {
                        this.curr_summary.comments_objs.forEach((comment, j) => {
                            stars += comment.stars;
                        });
                    }
                    this.curr_summary.stars = stars / (this.curr_summary.comments_objs?.length || 1);
                    console.log("summary:", this.curr_summary);
                    console.log("stars:", this.curr_summary.stars);
                    
                    return this.curr_summary;
                }

            } catch (e) {
                useMessagestore().throwError(e as string);
            }
        },
        async loadComments(id: string) {
            if (!this.curr_summary) {
                return;
            }
            try {
                const record = await useUserstore().pb?.collection("comments").getFullList({
                    filter: `summary='${id}'`,
                    expand: 'writer,comments.writer',
                    sort: '+created'
                });
                if (record) {
                    this.curr_summary.comments_objs = record as unknown as Comment[];
                    this.curr_summary.comments_objs.forEach((comment, j) => {

                        comment.writer_obj = record[j].expand?.writer as User;
                        comment.comments_objs = record[j].expand?.comments as Comment[] | null;
                        // comment.stars = record[j].stars;
                        if (comment.comments_objs) {
                            comment.comments_objs.forEach((comment2, k) => {
                                comment2.writer_obj = record[j].expand?.comments[k].expand?.writer as User;
                            });
                        }
                    });
                    console.log("comments:", this.curr_summary.comments_objs);
                }
            } catch (e) {
                useMessagestore().throwError(e as string);
            }
        },
        async createComment(content: string, stars: number) {
            console.log("create comment", content, stars);
            if (!useUserstore().loggedIn) {
                useMessagestore().throwError("You must be logged in to create a comment");
                return;
            }
            if (!this.curr_summary) {
                useMessagestore().throwError("No summary selected");
                return;
            }
            try {
                const record = await useUserstore().pb?.collection("comments").create<Comment>({
                    content,
                    writer: useUserstore().userId,
                    summary: this.curr_summary.id,
                    stars,
                });
                if (record) {
                    if (!this.curr_summary.comments_objs) {
                        this.curr_summary.comments_objs = [];
                    }
                    this.curr_summary.comments_objs.push(record);
                }
            } catch (e) {
                useMessagestore().throwError(e as string);
            }
        },
        async updateSummary(title: string, description: string, data: string, linked_quizzes: string[]) {
            if (!this.curr_summary) {
                useMessagestore().throwError("No summary selected");
                return;
            }
            try {
                const record = await useUserstore().pb?.collection<Summary>("summaries").update(this.curr_summary.id, {
                    title: title,
                    description: description,
                    data,
                    quizzes: useQuizStore().own_quizzes.filter(q => linked_quizzes.includes(q.title)).map(q => q.id),
                });
                if (record) {
                    this.curr_summary.title = record.title;
                    this.curr_summary.description = record.description;
                    this.curr_summary.data = record.data;
                }
            } catch (e) {
                useMessagestore().throwError(e as string);
            }
        },
        async deleteSummary() {
            if (!this.curr_summary) {
                useMessagestore().throwError("No summary selected");
                return;
            }
            try {
                await useUserstore().pb?.collection("summaries").delete(this.curr_summary.id);
                this.curr_summary = null;
                useRouter().push("/summaries");
            } catch (e) {
                useMessagestore().throwError(e as string);
            }
        },
    }
});