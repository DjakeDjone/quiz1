<script lang="ts" setup>
import { useMessagestore } from './stores/msg';


const messagestore = useMessagestore();

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