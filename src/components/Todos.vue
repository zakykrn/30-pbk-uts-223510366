<!-- src/components/Todos.vue -->
<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ title }}</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-input v-model="newTodo" placeholder="Tambahkan Tugas" outlined>
          <template v-slot:append>
            <q-btn @click="addTodo" label="Tambah" color="primary" />
          </template>
        </q-input>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-checkbox v-model="showOnlyIncomplete" label="Tampilkan yang belum selesai" />
      </q-card-section>
      <q-separator />
      <q-card-section v-if="todos.length > 0">
        <div class="text-subtitle2">Ceklis Tugas yang sudah selesai</div>
      </q-card-section>
      <q-card-section>
        <q-list bordered>
          <q-item v-for="(todo, index) in filteredTodos" :key="index" clickable>
            <q-item-section>
              <q-checkbox v-model="todo.completed" />
            </q-item-section>
            <q-item-section>
              <q-item-label :class="{ 'text-grey': todo.completed }">{{ todo.text }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn flat round icon="delete" @click="cancelTodo(index)" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <slot :totalTodos="todos.length">
          <div>Total Kegiatan: {{ todos.length }}</div>
        </slot>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'List Tugas'
    }
  },
  data() {
    return {
      todos: [],
      newTodo: '',
      showOnlyIncomplete: false
    }
  },
  computed: {
    filteredTodos() {
      if (this.showOnlyIncomplete) {
        return this.todos.filter(todo => !todo.completed);
      } else {
        return this.todos;
      }
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim() !== '') {
        this.todos.push({ text: this.newTodo, completed: false });
        this.newTodo = '';
      }
    },
    cancelTodo(index) {
      this.todos.splice(index, 1);
    }
  }
}
</script>

<style>
.text-grey {
  color: grey;
}
</style>
