<template>
    <v-container fluid>
        <v-layout>
            <v-flex>
                <v-layout column class="ma-3">
                    <h1 class="headline">Consultar Usuário</h1>
                    <v-divider class="mb-3" />
                        <div v-if="erros">
                            <Erros :erros="erros" />
                        </div>
                        <v-text-field label="ID"
                            v-model.number="filter.id" />
                        <v-text-field label="E-mail"
                            v-model="filter.email" />
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
                        <v-text-field label="E-mail" readonly
                            v-model="data.email" />
                        <v-text-field label="Perfis" readonly
                            :value="perfisRotulos" />
                    </template>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import Erros from '../comum/Erros'
    import gql from 'graphql-tag'

export default {
    components: { Erros },
    data() {
        return {
            filter: {},
            profiles: [],
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
                    query (
                        $id: Int
                        $email: String
                    ) {
                        user (
                            filter: {
                                id: $id
                                email: $email
                            }
                        ) {
                            id name email profiles { label }
                        }
                    }
                `,
                variables: {
                    id: this.filter.id,
                    email: this.filter.email
                },
                fetchPolicy: 'network-only'
            }).then(results => {
                this.data = results.data.user
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
