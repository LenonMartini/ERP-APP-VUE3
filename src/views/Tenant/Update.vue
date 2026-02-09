<template>
  <v-container fluid>
    <!-- Notificação -->
    <SnackBar
      :color="store.color"
      :message="store.message"
      :show="store.show"
    />

    <!-- Header -->
    <v-row>
      <v-col>
        <PageHeader
          title="Atualizar Tenant"
          :breadcrumbs="[
            { label: 'Tenants', to: '/tenant' },
            { label: 'Home' }
          ]"
        />
      </v-col>
    </v-row>

    <!-- Form -->
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            <v-form @submit.prevent="onSubmit">
              <!-- ID -->
              <Input
                name="id"
                label="Código"
                type="text"
                prepend-icon="mdi-identifier"
                class="mb-4"
                disabled
              />

              <!-- Nome -->
              <Input
                name="name"
                label="Tenant"
                type="text"
                prepend-icon="mdi-home"
                class="mb-4"
              />

              <!-- Domínio -->
              <Input
                name="domain"
                label="Domínio"
                type="text"
                prepend-icon="mdi-domain"
                class="mb-6"
              />

              <!--Status-->
              <v-switch
                v-model="status"
                :label="status ? 'Ativo' : 'Inativo'"
                :color="status ? 'success' : 'error'"
                inset
              />



              <!-- Botão -->
              <ButtonBase
                icon="mdi-content-save"
                type="submit"
                variant="outlined"
                size="large"
                :loading="loadingStore.isLoading"
                block
              >
                Atualizar
              </ButtonBase>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import * as yup from 'yup'



import { useLoadingStore } from '@/stores/loading'
import { useNotificationStore } from '@/stores/notification'
import { TenantService } from '@/services/TenantService'

/**
 * Stores e Router
 */
const route = useRoute()
const router = useRouter()
const loadingStore = useLoadingStore()
const store = useNotificationStore()

const tenantId = route.params.id

/**
 * Validação
 */
const schema = yup.object({
  id: yup.string().required(),
  name: yup
    .string()
    .required('Campo é obrigatório')
    .min(3, 'Campo deve ter no mínimo 3 caracteres'),
  domain: yup
    .string()
    .required('Campo é obrigatório')
    .min(3, 'Campo deve ter no mínimo 3 caracteres'),
  status: yup.boolean().required(),
})

/**
 * Form
 */
const { handleSubmit, setValues, defineField } = useForm({
  validationSchema: schema,
})

const [status] = defineField('status')

/**
 * Carregar Tenant
 */
onMounted(async () => {
  try {
    loadingStore.isLoading = true

    const response = await TenantService.get(tenantId)
    console.log(response)

    setValues({
      id: response.data.id,
      name: response.data.name,
      domain: response.data.domain,
      status: response.data.status?.toUpperCase() === 'ACTIVE',

    })

  } catch (e) {
    store.message = 'Erro ao carregar tenant'
    store.color = 'error'
    store.show = true
  } finally {
    loadingStore.isLoading = false
  }
})

/**
 * Submit UPDATE
 */
const onSubmit = handleSubmit(async (values) => {
  try {
    loadingStore.isLoading = true
    const payload = {
      name: values.name,
      domain: values.domain,
      status: values.status ? 'ACTIVE' : 'INACTIVE',
    }
    console.log(payload);
    //await TenantService.update(tenantId, payload)

    store.message = 'Tenant atualizado com sucesso'
    store.color = 'success'
    store.show = true

    // opcional: voltar para lista
    // router.push('/tenant')

  } catch (e) {
    store.message = e.message || 'Erro ao atualizar tenant'
    store.color = 'error'
    store.show = true
  } finally {
    loadingStore.isLoading = false
  }
})
</script>
