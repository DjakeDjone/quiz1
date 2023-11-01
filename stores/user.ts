import { defineStore } from "pinia";
import Cookies from "js-cookie";
import PocketBase from 'pocketbase';
import { useMessagestore } from "./msg";
import type { Quiz } from "./quiz";

export const useUserstore = defineStore({
    id: "user",
    state: () => ({
        loggedIn: false,
        msg: useMessagestore(),
        username: Cookies.get("username") || "",
        password: Cookies.get("password") || "",
        email: Cookies.get("email") || "",
        token: "",
        userId: "",
        quizzes: [] as Quiz[],
        db: new PocketBase(useRuntimeConfig().public.apiBase),
        cookieAllowed: true as boolean | undefined,
    }),
    actions: {
        async register() {
            try {
                console.log(this.username, this.email, this.password);

                const data = {
                    "username": this.username,
                    "email": this.email,
                    "emailVisibility": true,
                    "password": this.password,
                    "passwordConfirm": this.password,
                };
                const record = await this.db.collection('users').create(data);
                console.log(record);
                this.session();
                return true;
            } catch (e) {
                this.msg.throwError("User could not be created");
                return false;
            }
        },
        async session() {
            try {
                const authData = await this.db.collection('users').authWithPassword(
                    this.username,
                    this.password
                );
                this.loggedIn = true;
                this.token = this.db.authStore.token;
                this.userId = authData.record.id;
                let quizzes = await this.db.collection('quizes').getList(1, 40, {
                    filter: 'creator = "' + this.userId + '"',
                });
                this.quizzes = quizzes.items as unknown as Quiz[];
                console.log("userId:", this.userId);
            } catch (e) {
                this.msg.throwError("User could not be logged in");
            }
        },
        logout() {
            this.loggedIn = false;
            this.username = "";
            this.password = "";
            this.email = "";
            this.token = "";
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove("email");
            this.db.authStore.clear();
        },
        checkCookie() {
            if (Cookies.get("username") != undefined) {
                this.cookieAllowed = true;
            } else {
                this.cookieAllowed = false;
            }
        },
        async loadCookies() {
            this.username = Cookies.get("username") || "";
            this.password = Cookies.get("password") || "";
            this.email = Cookies.get("email") || "";
        },
    },
});
