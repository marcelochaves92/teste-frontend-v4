<template>
  <v-dialog v-model="dialog" max-width="50%">
    <v-card>
      <v-card-title class="text-center">
        <span class="headline">Histórico de Estados</span>
      </v-card-title>
      <v-card-text>
        <tableComponent :data="tabelaHistorico" />
        <div v-if="!tabelaHistorico.items.length">
          <p>Sem histórico disponível para este equipamento.</p>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="closeDialog">Fechar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { tableMixin } from "@/mixins/tableMixin.js";

export default {
  props: ["equipmentId"],
  mixins: [tableMixin],
  data() {
    return {
      dialog: true,
    };
  },
  watch: {
    equipmentId: {
      immediate: true,
      handler() {
        this.getTabelaHistorico(this.equipmentId);
      },
    },
  },
  methods: {
    closeDialog() {
      this.$emit("close");
      this.dialog = false;
    },
  },
};
</script>
