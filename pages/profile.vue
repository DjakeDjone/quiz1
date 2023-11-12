<script lang="ts" setup>
import { useUserstore, uploadFile } from '~/stores/user';
import { useQuizStore } from '~/stores/quiz';

const user = useUserstore();
const router = useRouter();
if (process.client) {
    user.loadCookies();
}
if (user.loggedIn) {
    console.log('logged in');
} else {
    // switch to login page
    router.push('/login');
}

onMounted(async () => {
    console.log('quizStore', useQuizStore());
    // load quizzes
    // await useQuizStore().searchQuizzes();
});

const show_dialog = ref(false);
let dialog = ref({
    title: '',
    text: '',
    inputs: [] as {
        label: string,
        type: string,
        value: string,
    }[],
    buttons: [
        {
            text: 'Cancel',
            color: 'primary',
            action: () => {
                show_dialog.value = false;
            }
        },
        {
            text: 'Ok',
            color: 'secondary',
            action: () => {
                show_dialog.value = false;
            }
        }
    ]
});

const createGroup = async () => {
    dialog.value.title = 'Create Group';
    dialog.value.text = 'Enter the name of the group';
    dialog.value.inputs = [
        {
            label: 'Name',
            type: 'text',
            value: '',
        }
    ];
    dialog.value.buttons[1].action = async () => {
        const group = await user.createGroup({
            id: '',
            created: '',
            description: '',
            updated: '',
            name: dialog.value.inputs[0].value,
            users: [user.userId],
            files: [],
            quizzes: [],
        });
        show_dialog.value = false;
    }
    show_dialog.value = true;
}

const rulesUsername = [
    (v: string) => !!v || 'Username is required',
    (v: string) => v.length <= 20 || 'Username must be less than 20 characters',
];
const rulesPassword = [
    (v: string) => !!v || 'Password is required',
    (v: string) => v.length >= 8 || 'Password must be at least 8 characters',
];
const passwordVisible = ref(false);

const logout = async () => {
    await user.logout();
    router.push('/login');
}

</script>

<template>
    <main class="p-4 max-w-3xl mx-auto">
        <nav class="p-4">
            <div class="flex items-center justify-between">
                <h2 class="text-2xl">Profile</h2>
                <div class="inline">
                    <!-- <v-btn class="ml-auto w w-fit relative" color="primary" @click="router.push('/profile')">
                        <v-icon>mdi-account</v-icon>
                        <v-tooltip location="bottom" activator="parent">
                            <span>Profile</span>
                        </v-tooltip>
                    </v-btn> -->
                    <v-btn class="ml-4 w w-fit relative" color="primary" @click="router.push('/')">
                        <v-icon>mdi-home</v-icon>
                        <v-tooltip location="bottom" activator="parent">
                            <span>Home</span>
                        </v-tooltip>
                    </v-btn>
                </div>
            </div>
            <h1 class="ml-8 text-4xl">{{ user.username }}</h1>
        </nav>
        <v-card class="my-2" variant="tonal">
            <v-card-title>
                Settings:
            </v-card-title>
            <v-card-item>
                <v-form>
                    <v-text-field v-model="user.username" :rules="rulesUsername" label="Username" required
                        prepend-inner-icon="mdi-account" />
                    <v-text-field v-model="user.password" label="Password" required
                        hint="Enter your password to access this website" prepend-inner-icon="mdi-lock"
                        :rules="rulesPassword" :type="passwordVisible ? 'text' : 'password'" 
                        :append-inner-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append-inner="passwordVisible = !passwordVisible" />
                    <v-checkbox v-model="user.cookieAllowed" :rules="[v => !!v || 'You must agree to continue!']"
                        label="Do you agree our terms of service and privacy policy?" required true-icon="mdi-check"
                        false-icon="mdi-close" color="primary"></v-checkbox>
                    <div class="w-full flex">
                        <v-btn class="w-1/2" color="primary" @click="user.saveUser()">
                            Submit
                        </v-btn>
                        <v-btn class="w-1/2" color="secondary" @click="logout()">
                            Logout
                        </v-btn>
                    </div>
                </v-form>
            </v-card-item>
        </v-card>
        <v-card class="my-2" variant="tonal">
            <v-card-title>
                Groups:
            </v-card-title>
            <v-card-item>
                <v-list v-if="user.groups.length > 0">
                    <v-list-item v-for="group in user.groups"
                        class="transition-all flex items-center text-lg hover:bg-[#ffffff09]">
                        <v-list-item-title class="cursor-pointer text-lg flex items-center"
                            @click="router.push('/group/' + group.id)">
                            <span>
                                <v-icon v-if="group.users.length > 1" class="m-3">mdi-account-multiple</v-icon>
                                <v-icon v-else class="m-3">mdi-account</v-icon>
                            </span>
                            {{ group.name }}
                            <p class="text-sm ml-4 text-gray-400">
                                <span v-html="group.description" />
                            </p>
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
                <v-list v-else>
                    <v-list-item>
                        <span>You are not in any group</span>
                    </v-list-item>
                </v-list>
                <v-btn class="w-full m-2 sm:w-fit" color="primary" @click="createGroup()">
                    Create Group
                </v-btn>
            </v-card-item>
        </v-card>
        <!-- dialog -->
        <v-dialog v-model="show_dialog">
            <v-card>
                <v-card-title>{{ dialog.title }}</v-card-title>
                <v-card-text>{{ dialog.text }}</v-card-text>
                <v-card-text v-for="input in dialog.inputs" :key="input.label">
                    <v-text-field :label="input.label" :type="input.type" v-model="input.value"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-btn v-for="button in dialog.buttons" :key="button.text" @click="button.action" color="primary">
                        {{ button.text }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </main>
</template>