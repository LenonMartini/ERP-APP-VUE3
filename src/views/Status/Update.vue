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
          title="Atualizar Status"
          :breadcrumbs="[
            { label: 'Status', to: '/cadastros/status' },
            { label: 'Home' },
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
                label="Status"
                type="text"
                prepend-icon="mdi-check-circle"
                class="mb-4"
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
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useForm } from "vee-validate";
import * as yup from "yup";

import { useLoadingStore } from "@/stores/loading";
import { useNotificationStore } from "@/stores/notification";
import { StatusService } from "@/services/StatusService";

/**
 * Stores e Router
 */
const route = useRoute();
const router = useRouter();
const loadingStore = useLoadingStore();
const store = useNotificationStore();

const dataId = route.params.id;

/**
 * Validação
 */
const schema = yup.object({
  id: yup.string().required(),
  name: yup
    .string()
    .required("Campo é obrigatório")
    .min(3, "Campo deve ter no mínimo 3 caracteres"),
});

/**
 * Form
 */
const { handleSubmit, setValues, defineField } = useForm({
  validationSchema: schema,
});

/**
 * Carregar Tenant
 */
onMounted(async () => {
  try {
    loadingStore.isLoading = true;

    const response = await StatusService.get(dataId);

    setValues({
      id: response.id,
      name: response.name,
    });
  } catch (e) {
    store.message = "Erro ao carregar registro";
    store.color = "error";
    store.show = true;
  } finally {
    loadingStore.isLoading = false;
  }
});

/**
 * Submit UPDATE
 */
const onSubmit = handleSubmit(async (values) => {
  try {
    loadingStore.isLoading = true;
    const payload = {
      name: values.name,
    };

    await StatusService.update(dataId, payload);

    store.message = "Registro atualizado com sucesso";
    store.color = "success";
    store.show = true;

    // Espera 2 segundos antes de redirecionar
    setTimeout(() => {
      store.clear();
      router.push("/cadastros/status");
    }, 2000);
  } catch (e) {
    store.message = e.message || "Erro ao atualizar registro";
    store.color = "error";
    store.show = true;
  } finally {
    loadingStore.isLoading = false;
  }
});
</script>
