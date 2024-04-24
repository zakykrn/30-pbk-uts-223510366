<template>
  <div class="app">
    <h1>List Tugas App</h1>
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
      <li v-for="(todo, index) in filteredTodos" :key="index" :class="{ completed: todo.completed }">
        <input type="checkbox" v-model="todo.completed" class="checkbox"> 
        <span>{{ todo.text }}</span>
        <div class="actions">
          <button @click="cancelTodo(index)">Hapus Tugas</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todos: [],
      newTodo: '',
      showOnlyIncomplete: false,
      addButtonClicked: false 
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
  }
}
</script>

<style>
.app {
  border :2px solid aqua;
  background-color: rgba(225, 225, 225. 0.4);
  box-shadow: 10px 10px 20px blue;
  margin:auto;
  width: 500px;
  padding: 25px;
  border-radius: 10px;
  border-color:blue;
}

body {
  font-family: Arial, sans-serif;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 0;
  background-image: url('./assets/bg.jpg');


}

.container {
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  color: #fffefe;
  text-align: center;
}

h4 {
  color: #fffefe;
  text-align: left;
}

.input-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.input-container input {
  flex: 1;
  padding: 8px;
  font-size: 20px;
}

.input-container button {
  padding: 15px 20px;
  font-size: 16px;
  background-color:aqua;
  color:aqua;
  border: none;
  cursor: pointer;
}

.input-button {
  text-align: right;
  margin-bottom: 20px;
}

.filter-container {
  margin-bottom: 10px;
  color:#fffefe;
  
}

.todo-list li input.checkbox {
  margin-right: 10px;
}

.todo-list {
  list-style: none;
  padding: 0;

}

.todo-list li {
  display: flex;
  align-items: center;
  padding: 10px;
  color:#fffefe;
  border-bottom: 2px solid blue;
}

.todo-list li.completed {
  text-decoration: line-through;
}

.todo-list li .actions {
  margin-left: auto;
}

.todo-list li button {
  padding: 6px 10px;
  font-size: 14px;
  cursor: pointer;
}

.todo-list li button + button {
  margin-left: 5px;
}

</style>
