<script lang="ts">
import { useUserstore } from '~/stores/user';
export default defineComponent({
    name: 'Login',
    setup() {
        const userstore = useUserstore();
        return {
            userstore,
        };
    },
    data() {
        return {
            showPassw: false,
        };
    },
    methods: {
        login() {
            this.userstore.session();
        },
        showPassword() {
            this.showPassw = !this.showPassw;
            if (this.showPassw) {
                (document.getElementById('password') as HTMLInputElement).type = 'text';
            } else {
                (document.getElementById('password') as HTMLInputElement).type = 'password';
            }
        },
    },
});
</script>

<template>
    <main>
        <form @submit.prevent="login()" v-if="!userstore.loggedIn && userstore.cookieAllowed">
            <h1>Login</h1>
            <div class="form-group">
                <label for="username">Username</label>
                <input v-model="userstore.username" type="text" class="form-control" id="username" placeholder="Username">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <div class="form-control">
                    <input v-model="userstore.password" type="password" id="password" placeholder="Password">
                    <NuxtIcon v-if="showPassw" name="eye" @click="showPassword()"/>
                        <NuxtIcon v-else name="eyeClosed" @click="showPassword()"/>
                </div>
            </div>
            <button type="submit" class="submit"><span>Submit</span></button>
            <RouterLink to="/register">New at fri3dl.com?</RouterLink>
        </form>
        <div v-else-if="userstore.loggedIn">
            <h1>Welcome {{ userstore.username }}</h1>
            <button id="logoutBtn" @click="userstore.logout()">Logout</button>
            <NuxtLink to="/">Go to home page</NuxtLink>
        </div>
    </main>
</template>

<style scoped>
main {
    display: flex;
    align-items: center;
    height: 100vh;
}
form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 20rem;
    padding: 1.2rem;
    border-radius: 2rem 0 2rem 0;
    background: #33333354;
}
form * {
    width: 100%;
    border: none;
}
.form-control {
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: 0.5rem 0;
    margin-top: 0;
    background-color: #0000009c;
    padding: 0.5rem;
    border: none;
}
.form-control span {
    width: 1rem;
}
input {
    background-color: transparent;
    color: #fff;
    text-align: left;
}
.form-control > * {
    width: 100%;
    border: none;
    background-color: transparent;
}
.form-control:hover {
    background-color: #00000043;
}

.form-control:focus,
.form-control:active {
    outline: none;
    border-bottom: 1px solid #fff;
    border-radius: 0 1rem 0 0;
}
input:active,
input:focus {
    outline: none;
}

.form-group {
    text-align: left;
}
.submit {
    margin-top: 0.5rem;
    padding: 0.5rem;
    background-color: #0000009c;
    color: #fff;
    border: none;
    border-radius: 1rem 0 1rem 0;
    cursor: pointer;
    margin-bottom: 1rem;
}
.submit:hover {
    background-color: #00000043;
    scale: 1.1;
}
.submit:active {
    outline: none;
    transform: rotateX(180deg);
    scale: .8;
}
.submit:active span {
    transform: rotateX(-180deg);
}
.nuxt-icon {
    width: 1rem;
    height: 1rem;
    cursor: pointer;
}
#logoutBtn {
    font-size: 1.2rem;
    margin-top: 1rem;
    padding: 1rem;
    background-color: #0000009c;
    color: #fff;
    border: none;
    border-radius: 1rem;
    cursor: pointer;
    margin-bottom: 1rem;
}
#logoutBtn:hover {
    background-color: #00000043;
    scale: 1.1;
}
#logoutBtn:active {
    outline: none;
    transform: rotateX(180deg);
    scale: .8;
}
a {
    display: block;
    color: #fff;
    margin-top: 1rem;
}
</style>