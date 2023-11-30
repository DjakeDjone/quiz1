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
    <div class="page min-h-screen">
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

<style>
body {
  background-image: url('/bg.png');
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 100vh;
}
</style>