<template>
    <v-dialog v-model="dialog" persistent max-width="50%">
        <v-card>
            <v-card-title class="d-flex justify-space-between">
                <span class="headline">
                    Histórico de Status do equipamento {{ equipmentName }}
                </span>
                <v-icon @click="closeDialog">mdi-close</v-icon>
            </v-card-title>
            <v-card-text>
                <tableComponent :data="tabelaHistorico" />
                <div v-if="!tabelaHistorico.items.length">
                    <p>Sem histórico disponível para este equipamento.</p>
                </div>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { tableMixin } from "@/mixins/tableMixin.js";

export default {
    props: ["equipmentId", "equipmentName"],
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
