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
                        @ready="onMapReady"
                    >
                        <l-tile-layer :url="tileUrl" />
                        <l-marker
                            v-for="equipment in equipmentPositions"
                            :key="equipment.id"
                            :lat-lng="[equipment.lat, equipment.lon]"
                            :icon="getIcon(equipment)"
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
import equipmentDialog from "./equipmentPopup.vue";
import L from "leaflet";

const iconMap = {
    "a3540227-2f0e-4362-9517-92f41dabbfdf": "mdi-truck",
    "a4b0c114-acd8-4151-9449-7d12ab9bf40f": "mdi-excavator",
    "9c3d009e-0d42-4a6e-9036-193e9bca3199": "mdi-cog",
    "a7c53eb1-4f5e-4eba-9764-ad205d0891f9": "mdi-basketball",
    "1c7e9615-cc1c-4d72-8496-190fe5791c8b": "mdi-apple",
    "2b5796cb-21c1-480e-8886-4498ea593a65": "mdi-steam",
    "1d222cdc-01dd-4caa-8934-5351d3995cfb": "mdi-angular",
    "491b983b-950c-4a88-942d-487e99b92540": "mdi-vuejs",
    "39317fcb-79e7-4e7e-83dc-723a9b63633c": "mdi-react",
    "c79ef1de-92f3-4edd-bd55-553056640449": "mdi-nodejs",
    "b7aaba00-13f7-44a0-8bf1-bc163afcf9d8": "mdi-languagepython",
    "fe2a2e11-bfa6-46b6-990b-fd8175946b7e": "mdi-soccer",
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
            zoom: 3,
            mapCenter: [0, 0],
            tileUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            equipmentData: equipment,
            positionHistory: equipmentPositionHistory,
            stateData: equipmentState,
            equipmentPositions: [],
            showHistoryDialog: false,
            selectedEquipmentId: null,
            selectedEquipmentModelId: null,
            selectedEquipmentName: "",
            dialogKey: 0,
        };
    },
    async mounted() {
        await this.calculateEquipmentPositions();
    },
    methods: {
        onMapReady() {
            this.mapReady = true;
            if (this.equipmentPositions.length > 0) {
                this.mapCenter = [
                    this.equipmentPositions[0].lat,
                    this.equipmentPositions[0].lon,
                ];
            }
        },
        async calculateEquipmentPositions() {
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
                    modelId: equipmentInfo
                        ? equipmentInfo.equipmentModelId
                        : null,
                };
            });

            if (this.mapReady && this.equipmentPositions.length > 0) {
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
        getIcon(equipment) {
            const modelId = equipment.id;
            const iconClass = iconMap[modelId] || "mdi-help-circle";

            return L.divIcon({
                className: "custom-icon",
                html: `<i class="mdi ${iconClass}" style="font-size: 24px;"></i>`,
                iconSize: [32, 32],
                iconAnchor: [16, 32],
            });
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
    },
};
</script>
