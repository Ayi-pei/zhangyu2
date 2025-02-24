<template>
  <div id="后台系统">
    <header>
      <nav>
        <ul>
          <li><router-link to="/admin">Dashboard</router-link></li>
          <li><router-link to="/admin/results">Results</router-link></li>
          <li><router-link to="/admin/users">Users</router-link></li>
          <li><router-link to="/admin/best">best</router-link></li>
        </ul>
      </nav>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <p>&copy; 2023 @Ayi-pei提供技术交流,</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
</script>
<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background-color: #c2ae00;
  color: rgb(131, 108, 66);
  padding: 1rem;
}

nav ul {
  list-style: none;
  display: flex;
  gap: 1rem;
}

nav a {
  color: white;
  text-decoration: none;
}

main {
  flex: 1;
  padding: 1rem;
}

footer {
  background-color: #dba800;
  color: rgb(139, 116, 81);
  text-align: center;
  padding: 1rem;
}
</style>