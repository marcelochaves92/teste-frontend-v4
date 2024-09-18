<template>
    <v-container fill-height>
        <v-row align="center" justify="center">
            <v-col cols="auto">
                <v-img src="/img/aiko.png" width="97px" height="48px" />
                <v-card style="height: 600px; width: 800px">
                    <l-map
                        ref="map"
                        :useGlobalLeaflet="false"
                        :zoom="zoom"
                        :center="mapCenter"
                        style="height: 100%; width: 100%"
                    >
                        <l-tile-layer :url="tileUrl" />
                        <l-marker
                            v-for="equipment in equipmentPositions"
                            :key="equipment.id"
                            :lat-lng="[equipment.lat, equipment.lon]"
                            :icon="getIcon(equipment.currentState)"
                        >
                            <l-popup>
                                <div>
                                    <h3>{{ equipment.name }}</h3>
                                    <p>
                                        <strong>Status:</strong>
                                        {{ equipment.currentState }}
                                    </p>
                                    <v-btn @click="viewHistory(equipment)">
                                        Ver histórico
                                    </v-btn>
                                </div>
                            </l-popup>
                        </l-marker>
                    </l-map>
                    <equipmentDialog
                        :key="dialogKey"
                        :equipmentId="selectedEquipmentId"
                        :equipmentName="selectedEquipmentName"
                        :equipmentModelId="selectedEquipmentModelId"
                        v-if="showHistoryDialog"
                        @close="handleDialogClose"
                    />
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import equipment from "@/data/equipment.json";
import equipmentState from "@/data/equipmentState.json";
import equipmentPositionHistory from "@/data/equipmentPositionHistory.json";
import equipmentStateHistory from "@/data/equipmentStateHistory.json";
import equipmentDialog from "./equipmentPopup.vue";
import L from "leaflet";

const iconMapping = {
    Operando: "mdi-play-circle-outline",
    Parado: "mdi-pause-circle-outline",
    Manutenção: "mdi-wrench-outline",
};

const colorMapping = {
    Operando: "#2ecc71",
    Parado: "#f1c40f",
    Manutenção: "#e74c3c",
};

export default {
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LPopup,
        equipmentDialog,
    },
    data() {
        return {
            zoom: 2,
            mapCenter: [0, 0],
            tileUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            equipmentData: equipment,
            positionHistory: equipmentPositionHistory,
            stateData: equipmentState,
            equipmentStateHistory: equipmentStateHistory,
            equipmentPositions: [],
            showHistoryDialog: false,
            selectedEquipmentId: null,
            selectedEquipmentModelId: null,
            selectedEquipmentName: "",
            dialogKey: 0,
        };
    },
    async mounted() {
        this.calculateEquipmentPositions();
    },
    methods: {
        calculateEquipmentPositions() {
            this.equipmentPositions = this.positionHistory.map((equipment) => {
                const latestPosition =
                    equipment.positions[equipment.positions.length - 1];
                const equipmentInfo = this.equipmentData.find(
                    (eq) => eq.id === equipment.equipmentId
                );
                const currentState = this.getCurrentState(
                    equipment.equipmentId
                );
                return {
                    id: equipment.equipmentId,
                    lat: latestPosition.lat,
                    lon: latestPosition.lon,
                    name: equipmentInfo ? equipmentInfo.name : "Desconhecido",
                    currentState: currentState,
                };
            });

            if (this.equipmentPositions.length > 0) {
                this.mapCenter = [
                    this.equipmentPositions[0].lat,
                    this.equipmentPositions[0].lon,
                ];
            }
        },
        getCurrentState(equipmentId) {
            const history = this.equipmentStateHistory.find(
                (e) => e.equipmentId === equipmentId
            );
            if (history && history.states.length > 0) {
                const latestState = history.states[history.states.length - 1];
                const stateInfo = this.stateData.find(
                    (state) => state.id === latestState.equipmentStateId
                );
                return stateInfo ? stateInfo.name : "Desconhecido";
            }
            return "Desconhecido";
        },
        viewHistory(equipment) {
            this.selectedEquipmentId = equipment.id;
            this.selectedEquipmentName = equipment.name;
            this.selectedEquipmentModelId = equipment.modelId;
            this.dialogKey += 1;
            this.showHistoryDialog = true;
        },
        handleDialogClose() {
            this.showHistoryDialog = false;
        },
        getIcon(stateName) {
            const mdiIcon = iconMapping[stateName] || "mdi-help-circle-outline";
            const iconColor = colorMapping[stateName] || "#000000"; // Cor padrão se não houver mapeamento
            return L.divIcon({
                className: "custom-icon",
                html: `<i class="mdi ${mdiIcon}" style="font-size: 24px; color: ${iconColor};"></i>`,
                iconSize: [32, 32],
                iconAnchor: [16, 32],
            });
        },
    },
};
</script>
