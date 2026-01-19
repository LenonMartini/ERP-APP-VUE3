<template>

    <!-- Hero -->
    <section class="hero">
      <h1>O ERP simples para controlar sua empresa</h1>
      <p>
        Financeiro, estoque, vendas e relatórios em um só lugar.
        Tudo online e fácil de usar.
      </p>

      <button class="cta" @click="goLogin">
        Acessar sistema
      </button>
    </section>

    <!-- Benefícios -->
    <section class="features">
      <div class="feature">
        <h3>💰 Financeiro</h3>
        <p>Controle total de entradas, saídas e fluxo de caixa.</p>
      </div>

      <div class="feature">
        <h3>📦 Estoque</h3>
        <p>Gerencie produtos, lotes e movimentações.</p>
      </div>

      <div class="feature">
        <h3>📊 Relatórios</h3>
        <p>Decisões rápidas com dados em tempo real.</p>
      </div>
    </section>

    <!-- CTA Final -->
    <section class="final-cta">
      <h2>Pronto para organizar sua gestão?</h2>
      <button class="cta" @click="goLogin">
        Entrar no ERP
      </button>
    </section>

</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
/* Hero */
.hero {
  padding: 100px 24px;
  text-align: center;
  max-width: 800px;
  margin: auto;
}

.hero h1 {
  font-size: 3rem;
}

.hero p {
  font-size: 1.2rem;
  margin: 24px 0;
  color: #4b5563;
}

.cta {
  background: #2563eb;
  color: #fff;
  border: none;
  padding: 14px 32px;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
}

/* Features */
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 32px;
  padding: 80px 48px;
  background: #f9fafb;
}

.feature {
  text-align: center;
}

.feature h3 {
  margin-bottom: 12px;
}

/* CTA final */
.final-cta {
  padding: 80px 24px;
  text-align: center;
}
</style>
