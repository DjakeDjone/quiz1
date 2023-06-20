<script lang="ts">
import { useUserstore } from '~/stores/user';


export default defineComponent({
    name: 'Register',
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
        async register() {
            const worked = this.userstore.register();
            if (await worked) {
                this.$router.push('/user');
            }
            console.log(this.userstore.username);
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
        <form @submit.prevent="register()">
            <h1>Register</h1>
            <div class="form-group">
                <label for="user">Email</label>
                <input v-model="userstore.email" type="email" class="form-control" id="email" aria-describedby="emailHelp"
                    placeholder="Enter email">
            </div>
            <div class="form-group">
                <label for="username">Username</label>
                <input v-model="userstore.username" type="text" id="uname" class="form-control" placeholder="Username" />
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <div class="form-control">
                    <input v-model="userstore.password" type="password" id="password" placeholder="Password" />
                    <NuxtIcon v-if="showPassw" name="eye" @click="showPassword()"/>
                    <NuxtIcon v-else name="eyeClosed" @click="showPassword()"/>
                </div>
            </div>
            <button class="submit">register</button>
            <RouterLink to="login">Already have an account?</RouterLink>
        </form>
    </main>
</template>

<style scoped>
main {
    display: flex;
    /* align-items: center; */
    justify-content: center;
    height: 100vh;
}

a {
    margin-top: 1rem;
}

form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 25rem;
    margin-top: 1rem;
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
    font-size: 1rem;
    font-weight: 100;
    cursor: pointer;
    margin-top: 0.5rem;
    padding: 0.5rem;
    background-color: #0000009c;
    color: #ffffffa5;
    border-radius: 1rem 0 1rem 0;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
}

.submit:hover {
    text-decoration: underline;
    background-color: #0000009c;
    color: #fff;
    scale: 1.1;
    border-radius: 0 1rem 0 1rem;
}


.submit:active {
    outline: none;
    scale: 0.9;
}
.nuxt-icon {
    width: 1rem;
    height: 1rem;
    cursor: pointer;
}
</style>