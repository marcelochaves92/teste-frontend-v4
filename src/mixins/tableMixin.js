import tableComponent from "@./table/tableComponent.vue";
import equipmentStateHistory from '@/data/equipmentStateHistory.json';
import equipmentState from '@/data/equipmentState.json';

export const tableMixin = {
    components: { tableComponent },
    data() {
        return {
            tabelaHistorico: {
                noDataText: 'Nenhum dado disponível',
                loading: true,
                header: [
                    { title: 'Data', value: 'date', align: 'center', sortable: true },
                    { title: 'Status', value: 'equipmentStateId', align: 'center', sortable: true },
                ],
                items: [],
                itemsLength: null,
                page: 1,
                itemsPerPage: 10,
                actions: [],
                itemPerPageOptions: [
                    { value: 5, title: '5' },
                    { value: 10, title: '10' },
                    { value: 15, title: '15' },
                    { value: 20, title: '20' },
                    { value: -1, title: 'Mostrar todos' }
                ],
            }
        };
    },
    methods: {
        getTabelaHistorico(equipmentId) {
            this.tabelaHistorico.loading = true;
            this.tabelaHistorico.items = [];

            const history = equipmentStateHistory.find(e => e.equipmentId === equipmentId);


            this.tabelaHistorico.items = history.states.map(state => {
                const stateInfo = equipmentState.find(s => s.id === state.equipmentStateId);

                return {
                    date: new Date(state.date).toLocaleDateString('pt-BR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                    }),
                    equipmentStateId: stateInfo ? stateInfo.name : "Desconhecido",
                };
            });

            this.tabelaHistorico.itemsLength = this.tabelaHistorico.items.length;
            this.tabelaHistorico.loading = false;
        }
    }
};
