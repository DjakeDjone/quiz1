<script lang="ts" setup>
// define page meta
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Quizz-App` : "Quizz-App";
  },
  htmlAttrs: {
    lang: "en"
  },
  meta: [
    {
      name: "description",
      content: "A quiz app for everyone, create your own summaries with quizzes and share them with your friends!"
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1"
    },
    {
      name: "theme-color",
      content: "#ffffff"
    },
    {
      name: "apple-mobile-web-app-capable",
      content: "yes"
    },
    {
      name: "apple-mobile-web-app-status-bar-style",
      content: "black-translucent"
    },
    {
      name: "apple-mobile-web-app-title",
      content: "Quizz-App"
    },
    {
      name: "msapplication-TileImage",
      content: "/icons/ms-icon-144x144.png"
    },
    {
      name: "msapplication-TileColor",
      content: "#ffffff"
    }
  ]
})

import { useMessagestore } from './stores/msg';
import { useUserstore } from './stores/user';

const messagestore = useMessagestore();
const userstore = useUserstore();

userstore.init();
// try to session

onBeforeMount(async () => {
  await userstore.session();
  const router = useRouter();
  console.log("ROUTER:", router.currentRoute.value.path.indexOf('/summaries'));
  if (!userstore.loggedIn) {
    // router.push('/login');
    // check if the page is not a quiz page or summary page or a subpage of a summary or quiz page
    if (router.currentRoute.value.path.indexOf('/quiz') === -1 && router.currentRoute.value.path.indexOf('/summaries') === -1) {
      router.push('/info');
    } else {
      // router.push('/login');
    }
  }
});

onMounted(() => {
});

</script>

<template>
  <NuxtLoadingIndicator color="rgb(var(--v-theme-primary))" />
  <!-- <NuxtImg src="/bg.svg" alt="background" layout="fill" fit="cover" class="fixed top-0 right-0 h-full object-contain" /> -->
  <main id="mainMain">
    <div class="page min-h-screen">
      <NuxtPage />
    </div>
    <div id="errorFeld">
      <TransitionGroup name="list" tag="ul" class="fixed bottom-0 left-0 z-50">
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
  background-image: url('/bg.svg');
  background-size: contain;
  background-position: right top;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 100vh;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>