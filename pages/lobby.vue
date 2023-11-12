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
</script>

<template>
    <main class="p-4 max-w-3xl mx-auto">
        <nav class="p-4">
            <div class="flex items-center">
                <h2 class="text-2xl">Welcome</h2>
                <!-- <gradibtn class="ml-auto w w-fit relative">Points: {{ user.points }}</gradibtn> -->
                <v-btn class="ml-auto w w-fit relative" color="primary" @click="router.push('/')">
                    <v-icon>mdi-home</v-icon>
                    <v-tooltip location="bottom" activator="parent">
                        <span>Home</span>
                    </v-tooltip>
                </v-btn>
            </div>
            <h1 class="ml-8 text-4xl">{{ user.username }}</h1>
        </nav>
        <v-card class="m-4" variant="tonal">
            <v-card-title>
                Group:
            </v-card-title>
            <v-card-item>
                <v-list v-if="user.groups.length > 0">
                    <v-list-item v-for="group in user.groups" class="flex items-center text-lg">
                        <v-icon class="m-3">mdi-account-group</v-icon>
                        <span>{{ group.name }}</span>
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
        <div>
            <v-card>
                <v-card-title>
                    <v-text-field label="Search" variant="outlined"></v-text-field>
                </v-card-title>
                
            </v-card>
        </div>

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