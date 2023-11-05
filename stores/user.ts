import { defineStore } from "pinia";
import Cookies from "js-cookie";
import PocketBase from 'pocketbase';
import type { RecordModel } from 'pocketbase';
import { useMessagestore } from "./msg";
import type { Quiz } from "./quiz";

export const useUserstore = defineStore("user", {
    state: () => ({
        loggedIn: false,
        username: Cookies.get("username") || "",
        password: Cookies.get("password") || "",
        email: Cookies.get("email") || "",
        groups: [] as string[],
        files: [] as string[],
        points: 0,
        token: "",
        userId: "",
        quizzes: [] as Quiz[],
        pb: null as PocketBase | null,
        cookieAllowed: true as boolean,
    }),
    actions: {
        async init() {
            if (!process.client) {
                return;
            }
            if (!this.pb) {
                this.pb = new PocketBase(useRuntimeConfig().public.apiBase);
            }
        },
        async register() {
            if (this.pb == null) {
                useMessagestore().throwError("PocketBase not initialized");
            }
            try {
                console.log(this.username, this.email, this.password);

                const data = {
                    "username": this.username,
                    "email": this.email,
                    "emailVisibility": true,
                    "password": this.password,
                    "passwordConfirm": this.password,
                    "points": 0,
                };
                const record = await this.pb!.collection('users').create(data);
                console.log(record);
                this.session();
                return true;
            } catch (e) {
                useMessagestore().throwError("User could not be registered");
                return false;
            }
        },
        async session() {
            if (this.pb == null) {
                useMessagestore().throwError("PocketBase not initialized");
            }
            try {
                if (this.username == "" || this.password == "") {
                    this.loadCookies();
                }
                console.log("Try session with:", this.username, this.password);
                const authData = await this.pb!.collection('users').authWithPassword(
                    this.username,
                    this.password
                );
                this.loggedIn = true;
                this.token = this.pb!.authStore.token;
                this.userId = authData.record.id;
                this.points = authData.record.points;
                console.log("user", authData.record);
                for (let i = 0; i < authData.record.files.length; i++) {
                    const file = useRuntimeConfig().public.apiBase + 'api/files/_pb_users_auth_/' + this.userId + '/' + authData.record.files[i];
                    this.files[i] = file;
                }
                this.setCookies();
            } catch (e) {
                useMessagestore().throwError("User could not be logged in");
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
            this.pb!.authStore.clear();
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
        setCookies() {
            if (this.cookieAllowed == false) {
                return;
            }
            Cookies.set("username", this.username);
            Cookies.set("password", this.password);
            Cookies.set("email", this.email);
        },
        getFile(file: string) {
            for (let i = 0; i < this.files.length; i++) {
                if (this.files[i].includes(file)) {
                    return this.files[i];
                }
            } return "";
        },
        uploadFile(file: FormData) {
            if (this.pb == null) {
                useMessagestore().throwError("PocketBase not initialized");
            }
            this.pb!.collection('users').create(file);
        },
    },
});
