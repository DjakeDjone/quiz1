import { defineStore } from "pinia";
import Cookies from "js-cookie";
import PocketBase from 'pocketbase';
import { useMessagestore } from "./msg";

export const useUserstore = defineStore({
    id: "user",
    state: () => ({
        loggedIn: false,
        msg: useMessagestore(),
        username: Cookies.get("username") || "",
        password: Cookies.get("password") || "",
        email: Cookies.get("email") || "",
        token: "",
        REST_API_URL: 'http://127.0.0.1:8090',
        db: new PocketBase('http://127.0.0.1:8090'),
        cookieAllowed: true as boolean | undefined,
        API_Base: useRuntimeConfig().public.API_Base,
    }),
    actions: {
        async connect() {
            try {
                this.db = new PocketBase(this.REST_API_URL);
                console.log("connected to database");
            } catch (e) {
                this.msg.throwError("database could not be reached")
            }
        },
        async register() {
            try {
                // example create data
                const data = {
                    "username": this.username,
                    "email": this.email,
                    emailVisibility: true,
                    password: this.password,
                };
                const record = await this.db.collection('users').create(data);
                console.log(this.username, this.email, this.password);
                // const record = await this.db.collection('users').create(data); this.msg.throwSuccess("User created", 5000);
                this.session();
            } catch (e) {
                this.msg.throwError("User could not be created");
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
                this.db.authStore.clear();
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
