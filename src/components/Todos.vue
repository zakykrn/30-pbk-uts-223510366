<!-- Todos.vue -->
<template>
    <div>
      <h1>{{ title }}</h1>
      <div class="input-container">
        <input v-model="newTodo" placeholder="Tambahkan Tugas">
      </div>
      <div class="input-button">
        <button @click="addTodo">Tambah</button>
      </div>
      <div class="filter-container" v-if="addButtonClicked">
        <input type="checkbox" id="showOnlyIncomplete" v-model="showOnlyIncomplete">
        <label for="showOnlyIncomplete">Tampilkan yang belum selesai</label>
      </div>
  
      <h4 v-if="todos.length  > 0">Ceklis Tugas yang sudah selesai</h4> 
      <ul class="todo-list">
        <li v-for="(todo, index) in filteredTodos" :key="index" :class="{ completed: todo.completed, bordered: todo.completed }">
          <input type="checkbox" v-model="todo.completed" class="checkbox"> 
          <span>{{ todo.text }}</span>
          <div class="actions">
            <button @click="cancelTodo(index)">Hapus Tugas</button>
          </div>
        </li>
      </ul>
      <slot :totalTodos="todos.length">
        <p>Total Kegiatan: {{ todos.length }}</p>
      </slot>
    </div>
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
        showOnlyIncomplete: false,
        addButtonClicked: false,
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
          this.addButtonClicked = true; 
        }
      },
      cancelTodo(index) {
        this.todos.splice(index, 1);
      },
    },
  }
  </script>
  
  