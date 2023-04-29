<script lang="ts">
import { useUserstore } from './stores/user';
import { useMessagestore } from './stores/msg';
import { useQuizStore } from './stores/quiz';

export default defineComponent({
  name: 'App',
  setup() {
    const user = useUserstore();
    const messagestore = useMessagestore();
    const quiz = useQuizStore();
    return { user, messagestore, quiz };
  },
  mounted() {
    console.log('App mounted')
    this.user.loadCookies();
    this.user.connect();
  },
})
</script>

<template>
  <main>
    <nav>
      <ul>
        <li>
          <NuxtLink to="/">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/create">Create</NuxtLink>
        </li>
      </ul>
    </nav>
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
<style>
* {
  text-align: center;
}
input[type="text"] {
  transition: all 0.3s ease-in-out;
  width: calc(100%-3rem);
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  outline: none;
  font-size: 1.2rem;
  font-family: inherit;
  background-color: var(--bg-color-secondary);
  color: var(--color-primary);
  scale: 1;
  margin: auto;
}
input[type="text"]:focus {
  box-shadow: var(--box-shadow);
  scale: 1.05;
}



/* define variables */
:root {
  --color-primary: #000;
  --color-secondary: #fff;
  --bg-color-primary: #00000060;
  --bg-color-secondary: #0b5b444e;
  --nav-color-primary: #12f8bfa2;
  --box-shadow: #00000095 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
} 

/* darkmode */
@media (prefers-color-scheme: dark) {
  :root {
    --color-primary: #fff;
    --color-secondary: #000;
    --bg-color-primary: #0f745ba2;
    --bg-color-secondary: #b1fce85c;
    --nav-color-primary: #72e8caa2;
    --box-shadow: #ffffff63 0px 10px 20px, rgba(0, 0, 0, 0.108) 0px 6px 6px;
  }
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
}

.page {
  padding: 1rem;
  min-height: 100vh;
  background-color: var(--bg-color-primary);
}
</style>

<style scoped>
nav {
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
  box-shadow: var(--box-shadow);
}

nav ul {
  display: flex;
  list-style: none;
  padding: 1rem;
  align-items: center;
  justify-content: space-around;
  background-color: var(--nav-color-primary);
}
.up-enter-active,
.up-leave-active,
.down-enter-active,
.down-leave-active {
  transition: all 0.3s;
}

.up-enter-from {
  opacity: 0;
  transform: translate(0, 3rem);
}

.up-leave-to {
  opacity: 0;
  transform: translate(0, -3rem);
}

.down-enter-from {
  opacity: 0;
  transform: translate(0, -3rem);
}

.down-leave-to {
  opacity: 0;
  transform: translate(0, 3rem);
}

#errorFeld {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: left;
  align-items: center;
  padding-left: 1rem;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

*::-webkit-scrollbar {
  width: 0.5rem;
}
.list-move,
/* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
@media screen and (max-width: 768px) {
  #errorFeld {
    align-items: flex-end;
  }
}
</style>
