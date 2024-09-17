<template>
    <v-container fill-height>
        <v-row align="center" justify="center">
            <v-col cols="auto">
                <v-img src="/img/aiko.png" width="97px" height="48px" />
                <v-card style="height: 600px; width: 800px">
                    <l-map
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
                        >
                            <l-popup>
                                <div>
                                    <h3>{{ equipment.name }}</h3>
                                    <p>
                                        <strong>Estado Atual:</strong>
                                        {{ equipment.currentState }}
                                    </p>
                                    <button @click="viewHistory(equipment.id)">
                                        Ver Histórico
                                    </button>
                                </div>
                            </l-popup>
                        </l-marker>
                    </l-map>
                    <equipmentDialog
                        :equipmentId="selectedEquipmentId"
                        v-if="showHistoryDialog"
                        @close="showHistoryDialog = false"
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
import equipmentDialog from "./equipmentPopup.vue";

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
            equipmentPositions: [],
            showHistoryDialog: false,
            selectedEquipmentId: null,
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
                return {
                    id: equipment.equipmentId,
                    lat: latestPosition.lat,
                    lon: latestPosition.lon,
                    name: equipmentInfo ? equipmentInfo.name : "Desconhecido",
                    currentState: this.getCurrentState(equipment.equipmentId),
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
            const history = equipmentState.find(
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
        viewHistory(equipmentId) {
            this.selectedEquipmentId = equipmentId;
            this.showHistoryDialog = true;
        },
    },
};
</script>
