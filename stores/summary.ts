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
    stars: number;
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
    comments: string[] | null;
    stars: number;
    // for the frontend
    writer_obj: User | null;
    comments_objs: Comment[] | null;
}
export const useSummaryStore = defineStore("summary", {
    state: () => ({
        summaries: [] as Summary[],
        own_summaries: [] as Summary[],
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
                const records = await useUserstore().pb?.collection("summaries").getFullList({
                    sort: "-created",
                    filter: filterword.length > 0 ? `data ~ '${filterword}'` : '',
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
                    const records = await useUserstore().pb?.collection("summaries").getFullList({
                        sort: "-created",
                        filter: `writer='${useUserstore().userId}'`,
                        expand: 'writer,comments,comments.writer'
                    });
                    console.log("own summaries", records);
                    if (records) {
                        this.own_summaries = records as unknown as Summary[];
                        this.own_summaries.forEach((summary, i) => {
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
                    expand: 'writer,comments.writer'
                });
                console.log(record);
                if (record) {
                    this.curr_summary = {
                        id: record.id,
                        stars: record.stars,
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
                    this.loadComments(id);
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
                    console.log("comments:",this.curr_summary.comments_objs);
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
        async updateSummary(data: string) {
            if (!this.curr_summary) {
                useMessagestore().throwError("No summary selected");
                return;
            }
            try {
                const record = await useUserstore().pb?.collection<Summary>("summaries").update(this.curr_summary.id, {
                    data,
                });
                if (record) {
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