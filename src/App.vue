<template>
   <header class="header">
      <nav class="navbar">
        <ul>
          <li><a href="#" @click="showTodos">Todos</a></li>
          <li><a href="#" @click="showPosts">Post</a></li>
        </ul>
      </nav>
    </header>
  <div class="app">
    <div v-if="showingTodos">
      <h1>List Tugas </h1>
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
    </div>

    <div v-if="showingPosts">
      <h1>List Post </h1>
      <div class="filter-container">
        <select v-model="selectedUser" @change="fetchPosts" class="select-box">
            <option value="">-- Pilih Pengguna --</option>
            <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>

      </div>
      <ul>
        <li v-if="selectedUser" v-for="(post, index) in filteredPosts" :key="index" class="post-item">
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todos: [],
      newTodo: '',
      showOnlyIncomplete: false,
      addButtonClicked: false,
      showingTodos: true,
      showingPosts: false,
      posts: [],
      users: [],
      selectedUser: ''
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
    showTodos() {
      this.showingTodos = true;
      this.showingPosts = false;
    },
    showPosts() {
      this.showingTodos = false;
      this.showingPosts = true;
    },
    async fetchPosts() {
      if (this.selectedUser) {
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUser}`);
          const data = await response.json();
          this.posts = data;
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      } else {
        this.posts = [];
      }
    },
    async fetchUsers() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        this.users = data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
  },
  computed: {
    filteredTodos() {
      if (this.showOnlyIncomplete) {
        return this.todos.filter(todo => !todo.completed);
      } else {
        return this.todos;
      }
    },
    filteredPosts() {
      if (this.selectedUser) {
        return this.posts;
      } else {
        return [];
      }
    }
  },
  mounted() {
    this.fetchUsers();
  }
}
</script>

<style>

body {
  font-family: Arial, sans-serif;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 0;
  background-color: rgb(29, 17, 134);
}

.container {
  max-width: 600px;
  margin: 0 auto;
}

.header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
}

.navbar {
  background-color: rgb(3, 22, 44);
  width: 100%;
  display: inline-block;
}


.navbar ul {
  list-style-type: none;
  padding: 0;
}

.navbar ul li {
  display: inline-block;
  margin-right: 20px;
}

.navbar ul li a {
  text-decoration: none;
  color: #fff;
  font-size: 18px;
}

.navbar ul li a:hover {
  color: aqua;
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
  background-color: #fff;
  color:black;
}

.input-container button {
  padding: 15px 20px;
  font-size: 16px;
  background-color: aqua;
  color: aqua;
  border: none;
  cursor: pointer;
  
}

.input-button {
  text-align: right;
  margin-bottom: 20px;
}

.filter-container {
  margin-bottom: 10px;
  color: #fffefe;
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
  color: #fffefe;
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

.post-item {
  border: 1px solid  rgb(3, 22, 44);
  padding: 10px;
  margin-bottom: 10px;
}

.select-box {
  background-color: #fff;
  color: #000;
  flex: 1;
  padding: 8px;
}

</style>
