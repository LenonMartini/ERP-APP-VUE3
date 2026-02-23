<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <PageHeader
          title="Status"
          :breadcrumbs="[
            { label: 'Home', to: '/painel' },
            { label: 'Dashboard' }
          ]"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card >
          <v-card-title>
            <v-row align="center" no-gutters>
              <!-- Botão Novo -->
              <v-col cols="auto">
                <ButtonLink
                  :to="{ name: 'tenant.create' }"
                  icon="mdi-plus"
                  variant="outlined"
                >
                  Novo
                </ButtonLink>
              </v-col>

              <v-spacer />

              <!-- Search -->
              <v-col cols="auto">
                <SearchBar v-model="search" />
              </v-col>
            </v-row>
          </v-card-title>

          <v-card-text>
            <DataTable
              :items="data"
              :columns="headers"
              :loading="loadingStore.isLoading"
            >
              <!-- Status -->
              <template #item.status="{ value }">
                <v-chip
                  size="small"
                  :color="statusMap[value]?.color ?? 'grey'"
                >
                  {{ statusMap[value]?.label ?? value }}
                </v-chip>
              </template>

              <!-- Ações -->
              <template #item.actions="{ item }">
                <div class="d-flex align-center ga-2">
                    <ButtonLinkIcon
                      icon="mdi-pencil"
                      color="primary"
                      :to="{ name: 'tenant.update', params: {id: item.id } }"
                      variant="outlined"
                    />

                    <ButtonLinkIcon
                      icon="mdi-delete"
                      color="error"
                      variant="outlined"
                      @click="confirmDelete(item)"
                    />

                </div>
              </template>
            </DataTable>


          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <ModalConfirm
      v-model="showDeleteModal"
      title="Excluir Tenant"
      message="Essa ação não pode ser desfeita. Deseja continuar?"
      confirm-text="Excluir"
      :loading="loadingStore.isLoading"
      @confirm="handleDelete"
    />
  </v-container>

</template>

<script setup>
import ButtonBase from '@/components/Button/ButtonBase.vue'
import { useLoadingStore } from '@/stores/loading'
import { TenantService } from '@/services/TenantService'
import { onMounted, ref } from 'vue'
import ButtonLinkIcon from '@/components/Button/ButtonLinkIcon.vue'

const loadingStore = useLoadingStore()

const data = ref([])
const search = ref('')
const showDeleteModal = ref(false)
const selectedTenant = ref(null)



const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Nome', key: 'name' },
  { title: 'Domínio', key: 'domain' },
  { title: 'Status', key: 'status' },
  { title: 'Criado em', key: 'created_at' },
  { title: 'Atualizado em', key: 'updated_at' },
  { title: 'Ações', key: 'actions', sortable: false, value: () => null },
]

// Mapa de status (ERP style)
const statusMap = {
  active: { label: 'Ativo', color: 'success' },
  inactive: { label: 'Inativo', color: 'error' },
  pending: { label: 'Pendente', color: 'warning' },
}

onMounted(() => {
  getTenants()
})

const getTenants = async () => {
  try {
    loadingStore.setLoading(true)
    const response = await TenantService.getAllTenants()
    data.value = response.data ?? response
  } catch (error) {
    console.error(error)
  } finally {
    loadingStore.setLoading(false)
  }
}

const confirmDelete = (tenant) => {
  selectedTenant.value = tenant
  showDeleteModal.value = true
}
const handleDelete = async () => {
  if (!selectedTenant.value) return

  try {
    loadingStore.setLoading(true)

    await TenantService.delete(selectedTenant.value)

    showDeleteModal.value = false
    selectedTenant.value = null

    await getTenants()
  } catch (error) {
    console.error(error)
  } finally {
     loadingStore.setLoading(false)
  }
}


</script>
