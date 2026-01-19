<template>
  <div class="landing">
    <!-- Navbar -->
    <header class="navbar">
      <div class="logo">ERP SaaS</div>

      <button class="login-btn" @click="goLogin">
        Login
      </button>
    </header>

    <!-- Conteúdo da página -->
    <main>
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="footer">
      © {{ year }} ERP SaaS — Todos os direitos reservados
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ro } from 'vuetify/locale'

const router = useRouter()
const year = new Date().getFullYear()

const goLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
.landing {
  font-family: Inter, Arial, sans-serif;
}

/* Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 48px;
  border-bottom: 1px solid #e5e7eb;
}

.logo {
  font-weight: bold;
  font-size: 1.2rem;
}

.login-btn {
  background: transparent;
  border: 1px solid #2563eb;
  color: #2563eb;
  padding: 10px 18px;
  border-radius: 6px;
  cursor: pointer;
}

/* Footer */
.footer {
  padding: 24px;
  text-align: center;
  font-size: 0.9rem;
  color: #6b7280;
}
</style>
