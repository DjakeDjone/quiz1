import { defineStore } from "pinia";
import Cookies from "js-cookie";
import PocketBase from 'pocketbase';
import type { RecordModel } from 'pocketbase';
import { useMessagestore } from "./msg";
import type { Quiz } from "./quiz";

export type Group = {
    id: string;
    created: string;
    updated: string;
    name: string;
    description: string;
    quizzes: Quiz[];
    users: string[];
    files: string[];
};

export type User = {
    id: string;
    created: string;
    updated: string;
    username: string;
    email: string;
    points: number;
    friends: string[];
    files: string[];
}

export const uploadFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = async () => {
        const file = input.files?.[0];
        if (!file) {
            return;
        }
        useUserstore().uploadFile(file)
    };
    input.click();
};

export const useUserstore = defineStore("user", {
    state: () => ({
        loggedIn: false,
        username: Cookies.get("username") || "",
        password: Cookies.get("password") || "",
        email: Cookies.get("email") || "",
        groups: [] as Group[],
        current_group: {} as Group,
        files: [] as string[],
        friends: [] as string[],
        points: 0,
        token: "",
        userId: "",
        pb: null as PocketBase | null,
        cookieAllowed: false as boolean,
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
                this.email = authData.record.email;
                this.friends = authData.record.friends;
                console.log("user", authData.record);
                for (let i = 0; i < authData.record.files.length; i++) {
                    const file = useRuntimeConfig().public.apiBase + 'api/files/_pb_users_auth_/' + this.userId + '/' + authData.record.files[i];
                    this.files[i] = file;
                }
                this.loadGroups();
                this.setCookies();
            } catch (e) {
                useMessagestore().throwError("User could not be logged in");
            }
        },
        async loadGroups() {
            if (this.pb == null) {
                useMessagestore().throwError("PocketBase not initialized");
            }
            try {
                const record = await this.pb!.collection('groups').getFullList<Group>({
                    filter: 'users.id="' + this.userId + '"',
                    sort: '-created',
                });
                this.groups = record;
                return record;
                console.log(record);
            } catch (e) {
                console.error(e);
                useMessagestore().throwError("Groups could not be loaded");
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
        async uploadFile(file: File) {
            if (this.pb == null) {
                useMessagestore().throwError("PocketBase not initialized");
            }
            try {
                const record = await this.pb!.collection('users').update(this.userId, {
                    files: this.files.push(file.name),
                });
                console.log(record);
                return true;
            } catch (e) {
                console.error(e);
                useMessagestore().throwError("File could not be uploaded");
                return false;
            }
        },
        async createGroup(group: Group) {
            if (this.pb == null) {
                useMessagestore().throwError("PocketBase not initialized");
            }
            try {
                const record = await this.pb!.collection('groups').create<Group>(group);
                console.log(record);
                return true;
            } catch (e) {
                console.error(e);
                useMessagestore().throwError("Group could not be created");
                return false;
            }
        },
        async updateGroup(group: Group) {
            if (this.pb == null) {
                useMessagestore().throwError("PocketBase not initialized");
            }
            try {
                const record = await this.pb!.collection('groups').update<Group>(group.id, group);
                console.log(record);
                return true;
            } catch (e) {
                console.error(e);
                useMessagestore().throwError("Group could not be updated");
                return false;
            }
        },
        async deleteGroup(group: Group) {
            if (this.pb == null) {
                useMessagestore().throwError("PocketBase not initialized");
            }
            try {
                const record = await this.pb!.collection('groups').delete(group.id);
                console.log(record);
                return true;
            } catch (e) {
                console.error(e);
                useMessagestore().throwError("Group could not be deleted");
                return false;
            }
        },
        async getGroup(id: string) {
            if (this.pb == null) {
                useMessagestore().throwError("PocketBase not initialized");
            }
            try {
                const record = await this.pb!.collection('groups').getOne<Group>(id);
                console.log(record);
                return record;
            } catch (e) {
                console.error(e);
                useMessagestore().throwError("Group could not be loaded");
                return false;
            }
        },
        async saveUser() {
            // update user
            if (this.pb == null) {
                useMessagestore().throwError("PocketBase not initialized");
            }
            try {
                const record = await this.pb!.collection('users').update(this.userId, {
                    username: this.username,
                    email: this.email,
                    password: this.password,
                });
                console.log(record);
                return true;
            } catch (e) {
                console.error(e);
                useMessagestore().throwError("User could not be updated");
                return false;
            }
        }
    },
});
