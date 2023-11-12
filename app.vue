<script lang="ts" setup>
import { useMessagestore } from './stores/msg';
import { useUserstore } from './stores/user';

const messagestore = useMessagestore();
const userstore = useUserstore();

userstore.init();
// try to session

onBeforeMount(async () => {
  await userstore.session();
  const router = useRouter();
  if (!userstore.loggedIn) {
    router.push('/login');
  }
});

</script>

<template>
  <main id="mainMain">
    <div class="page">
      <NuxtPage />
    </div>
    <div id="errorFeld">
      <TransitionGroup name="list" tag="ul">
        <li v-for="msg in messagestore.messages" :key="msg.id">
          <Message>
            {{ msg.content }}
          </Message>
        </li>
      </TransitionGroup>
    </div>
  </main>
</template>