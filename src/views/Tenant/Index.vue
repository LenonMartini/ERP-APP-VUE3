<template>
  <v-card>
    <v-card-title>
      <v-row align="center">
        <v-col>
          <span class="text-h6">Empresas</span>
        </v-col>

        <v-col class="text-right">
          <ButtonBase
            type="button"
            variant="outlined"
            size="small"
            icon="mdi-plus"
          >
            Novo
          </ButtonBase>
        </v-col>
      </v-row>
    </v-card-title>

    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="data"
        :search="search"
        :loading="loadingStore.loading"
        density="compact"
        item-key="id"
      >
        <!-- Status tratado -->
        <template #item.status="{ value }">
          <v-chip
            size="small"
            :color="statusMap[value]?.color ?? 'grey'"
            variant="flat"
          >
            {{ statusMap[value]?.label ?? value }}
          </v-chip>
        </template>

        <template #item.actions="{ item }">
          <v-btn
            icon
            size="small"
            variant="text"
            color="primary"
            @click="editTenant(item)"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>

          <v-btn
            icon
            size="small"
            variant="text"
            color="error"
            @click="deleteTenant(item)"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>


      

        <!-- Estado vazio -->
        <template #no-data>
          Nenhuma empresa cadastrada
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script setup>
import ButtonBase from '@/components/Button/ButtonBase.vue'
import { useLoadingStore } from '@/stores/loading'
import { TenantService } from '@/services/TenantService'
import { onMounted, ref } from 'vue'

const loadingStore = useLoadingStore()

const data = ref([])
const search = ref('')

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Nome', key: 'name' },
  { title: 'Domínio', key: 'domain' },
  { title: 'Status', key: 'status' },
  { title: 'Criado em', key: 'created_at' },
  { title: 'Atualizado em', key: 'updated_at' },
  { title: 'Ações', key: 'actions', sortable: false },
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

// Formatação de data padrão BR
const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('pt-BR')
}
</script>
