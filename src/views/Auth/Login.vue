<template>
  <v-container fluid class="fill-height ">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card elevation="6" class="pa-6">

          <div class="text-center mb-6">
            <v-icon size="56" color="primary">mdi-lock</v-icon>
            <h2 class="text-h5 font-weight-bold mt-2">
              Acesso ao Sistema ERP
            </h2>
            <p class="text-body-2 text-medium-emphasis">
              Informe suas credenciais para continuar
            </p>
          </div>

          <v-form @submit.prevent="onSubmit">
            <Input
              name="email"
              label="Email"
              type="email"
              prepend-icon="mdi-email"
              class="mb-4"

            />
            <Input
              name="password"
              label="Senha"
              type="password"
              prepend-icon="mdi-lock"
              class="mb-6"
            />

            <ButtonBase
              icon="mdi-login"
              type="submit"
              color=""
              variant="outlined"
              size="large"
              :loading="loading"
              block
            >
              Entrar
            </ButtonBase>
          </v-form>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import Input from '@/components/Input/Input.vue'
import ButtonBase from '@/components/Button/ButtonBase.vue'
import { useLoadingStore } from '@/stores/loading'

const router = useRouter()
const authStore = useAuthStore()
const loadingStore = useLoadingStore()



const loginSchema = yup.object({
  email:yup
    .string()
    .email('Email inválido')
    .required('Email é obrigatório'),
  password:yup
    .string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .required('Senha é obrigatória'),
})

const { handleSubmit } = useForm({
  validationSchema: loginSchema,
  initialValues: {
    email: 'suporte1@empresa.com',
    password: '@suporte',
  },
})

const onSubmit = handleSubmit (async (values) => {
  try {
    loadingStore.isLoading = true

    const response = await authStore.login(values)
    if(response){
      router.push({ name: 'home' })
    }
  }catch (error) {
    console.error('Erro ao fazer login:', error)
  } finally {

    loadingStore.isLoading = false;
  }
});


</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}


</style>
