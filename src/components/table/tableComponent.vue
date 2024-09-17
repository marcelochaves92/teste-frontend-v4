<template>
  <v-card class="overflow-y-auto ma-2" variant="flat" height="fit-content">
    <v-data-table
      fixed-header
      :items-per-page-options="data.itemPerPageOptions"
      :headers="data.header"
      :items="data.items"
      :items-length="data.itemsLength"
      :loading="data.loading"
      :no-data-text="data.noDataText"
      :items-per-page="data.itemsPerPage"
      class="text-caption"
      :search="search"
      items-per-page-text="Itens por página"
    >
      <template v-slot:top>
        <v-toolbar flat color="surface">
          <v-spacer />
          <v-text-field
            v-model="search"
            label="Buscar"
            class="ma-2"
            max-width="30%"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            hide-details
            density="compact"
          />
        </v-toolbar>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      search: "",
    };
  },
};
</script>
