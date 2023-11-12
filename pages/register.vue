<script setup lang="ts">
import { useUserstore } from '~/stores/user';

const userstore = useUserstore();

const loading = ref(false);
let passwordVisible = ref(false);
const rulesUsername = [
    (v: string) => !!v || 'Username is required',
    (v: string) => v.length <= 20 || 'Username must be less than 20 characters',
];

const rulesEmail = [
    (v: string) => !!v || 'Email is required',
    (v: string) => /.+@.+/.test(v) || 'Email must be valid',
];

const rulesPassword = [
    (v: string) => !!v || 'Password is required',
    (v: string) => v.length >= 8 || 'Password must be at least 8 characters',
];

const register = async () => {
    loading.value = true;
    await userstore.register();
    if (userstore.loggedIn) {
        useRouter().push('/');
    }
    loading.value = false;
};
</script>

<template>
    <main>
        <v-sheet width="400" max-width="100%" class="mx-auto mt-20">
            <v-form @submit.prevent="register()">
                <v-card>
                    <v-card-title>Register</v-card-title>
                    <v-card-text>
                        <v-text-field v-model="userstore.username" :rules="rulesUsername" label="Username" required
                            prepend-inner-icon="mdi-account" />
                        <v-text-field v-model="userstore.email" :rules="rulesEmail" placeholder="johndoe@gmail.com"
                            label="Email" type="email" required prepend-inner-icon="mdi-email" />
                        <v-text-field v-model="userstore.password" label="Password" required
                            hint="Enter your password to access this website" prepend-inner-icon="mdi-lock"
                            :rules="rulesPassword" :type="passwordVisible ? 'text' : 'password'"
                            :append-inner-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append-inner="passwordVisible = !passwordVisible" />
                        <v-checkbox v-model="userstore.cookieAllowed" :rules="[v => !!v || 'You must agree to continue!']"
                            label="Do you agree?" required true-icon="mdi-check" false-icon="mdi-close" color="primary"></v-checkbox>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn :loading="loading" :disabled="loading" color="primary" class="w-full" type="submit">
                            Register
                        </v-btn>
                    </v-card-actions>
                    <v-btn class="w-full" color="transparent" @click="$router.push('/login')">
                        already have an account?
                    </v-btn>
                </v-card>
            </v-form>
        </v-sheet>
    </main>
</template>