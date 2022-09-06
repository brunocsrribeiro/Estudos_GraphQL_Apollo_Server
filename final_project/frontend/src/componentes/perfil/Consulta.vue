<template>
    <v-container fluid>
        <v-layout>
            <v-flex>
                <v-layout column class="ma-3">
                    <h1 class="headline">Consultar Perfis</h1>
                    <v-divider class="mb-3" />
                        <div v-if="erros">
                            <Erros :erros="erros" />
                        </div>
                        <v-text-field label="ID"
                            v-model.number="filter.id" />
                        <v-text-field label="Nome"
                            v-model="filter.name" />
                        <v-btn color="primary" class="ml-0 mt-3"
                            @click="consultar">
                            Consultar
                        </v-btn>
                </v-layout>
            </v-flex>
            <v-flex>
                <v-layout column class="ma-3">
                    <h1 class="headline">Resultado</h1>
                    <v-divider />
                    <template v-if="data">
                        <v-text-field label="ID" readonly
                            v-model="data.id" />
                        <v-text-field label="Nome" readonly
                            v-model="data.name" />
                        <v-text-field label="Rótulo" readonly
                            v-model="data.label" />
                    </template>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import gql from 'graphql-tag'
import Erros from '../comum/Erros'

export default {
    components: { Erros },
    data() {
        return {
            filter: {},
            data: null,
            erros: null
        }
    },
    computed: {
        perfisRotulos() {
            return this.data && this.data.profiles &&
                this.data.profiles.map(p => p.label).join(', ')
        }
    },
    methods: {
        consultar() {
            this.$api.query({
                query: gql`
                    query(
                        $id: Int
                        $name: String
                    ) {
                        profile (
                            filter: {
                                id: $id
                                name: $name
                            }
                        ) {
                            id name label
                        }
                    }
                `,
                variables: {
                    id: this.filter.id,
                    name: this.filter.name
                },
                fetchPolicy: 'network-only'
            }).then(results => {
                this.data = results.data.profile
                this.filter = {}
                this.erros = null
            }).catch(e => {
                this.data = null
                this.erros = e
            })
        }
    }
}
</script>

<style>

</style>
