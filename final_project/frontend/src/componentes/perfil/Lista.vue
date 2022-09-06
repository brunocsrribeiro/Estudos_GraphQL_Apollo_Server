<template>
    <v-container fluid>
        <v-layout column>
            <v-flex>
                <v-btn color="primary" class="ml-0 mb-4"
                    @click="obterPerfis">
                    Obter Perfis
                </v-btn>
            </v-flex>
            <v-flex>
                <div v-if="erros" class="mb-4">
                    <Erros :erros="erros" />
                </div>
            </v-flex>
            <v-flex>
                <v-data-table :headers="headers" :items="profiles" 
                    hide-actions class="elevation-1">
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.id }}</td>
                        <td>{{ props.item.name }}</td>
                        <td>{{ props.item.label }}</td>
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import gql from 'graphql-tag';
import Erros from '../comum/Erros'

export default {
    components: { Erros },
    data() {
        return {
            erros: null,
            profiles: [],
            headers: [
                { text: 'ID', value: 'id' },
                { text: 'Nome', value: 'name' },
                { text: 'Rótulo', value: 'label' },
            ],
        }
    },
    methods: {
        obterPerfis() {
            this.$api.query({
                query: gql`
                    query {
                        profiles {
                            id name label
                        }
                    }
                `,
                fetchPolicy: 'network-only'
            }).then(results => {
                this.profiles = results.data.profiles
                this.erros =null
            }).catch(e => {
                this.profiles = []
                this.erros = e
            })
        }
    }
}
</script>

<style>

</style>
