<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <div class="text-h6">UAS ZAKY KURNIAWAN</div>
        </q-toolbar-title>
        <q-btn flat round dense icon="menu" @click="drawer = !drawer"></q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" side="left" bordered>
      <q-list>
        <q-item to="/todos" tag="router-link" clickable v-ripple>
          <q-item-section>
            <q-item-label>Todos</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/posts" tag="router-link" clickable v-ripple>
          <q-item-section>
            <q-item-label>Posts</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/albums" tag="router-link" clickable v-ripple>
          <q-item-section>
            <q-item-label>Albums</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const drawer = ref(false);
    return {
      drawer
    };
  }
}
</script>

<style>
body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  margin: 0;
  padding: 0;
}
</style>
