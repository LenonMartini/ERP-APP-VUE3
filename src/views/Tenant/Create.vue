<template>

  <v-container fluid>
    <SnackBar
      :color="store.color"
      :message="store.message"
      :show="store.show"
    />
    <v-row>
      <v-col>
        <PageHeader
          title="Novo Tenant"
          :breadcrumbs="[
            { label: 'Tenants', to: '/painel/tenants' },
            { label: 'Home' }
          ]"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
          <v-card>
            <v-card-text>
              <v-form @submit.prevent="onSubmit">
                <Input
                  name="name"
                  label="Tenant"
                  type="text"
                  prepend-icon="mdi-home"
                  class="mb-4"

                />
                <Input
                  name="domain"
                  label="Dominio"
                  type="text"
                  prepend-icon="mdi-domain"
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
                  Cadastrar
                </ButtonBase>
              </v-form>
            </v-card-text>
          </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import Input from '@/components/Input/Input.vue'
import ButtonBase from '@/components/Button/ButtonBase.vue'
import { useLoadingStore } from '@/stores/loading'
import SnackBar from '@/components/Message/SnackBar.vue'
import { useNotificationStore } from '@/stores/notification'
import { TenantService } from '@/services/TenantService'

const loadingStore = useLoadingStore()
const store = useNotificationStore()

const loginSchema = yup.object({
  name: yup
    .string()
    .required('Campo é obrigatório')
    .min(3, 'Campo deve ter no mínimo 2 caracteres'),
  domain: yup
    .string()
    .min(3, 'Campo deve ter no mínimo 2 caracteres')
    .required('Campo é obrigatória'),
})

const { handleSubmit, resetForm: resetTenantForm } = useForm({
  validationSchema: loginSchema,
})

const onSubmit = handleSubmit(async (values) => {
  try {
    loadingStore.isLoading = true
    await TenantService.create(values)

    store.message = 'Tenant cadastrado com sucesso'
    store.color = 'success'
    store.show = true

    // ✅ limpa os campos
    resetTenantForm()

  } catch (e) {
    store.message = e.message
    store.color = 'error'
    store.show = true
  } finally {
    loadingStore.isLoading = false
  }
})
</script>

