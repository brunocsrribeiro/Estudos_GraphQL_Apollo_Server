<template>
    <v-container fluid>
        <v-layout>
            <v-flex>
                <v-layout column class="ma-3">
                    <h1 class="headline">Filtrar Perfil</h1>
                    <v-divider class="mb-3" />
                    <div v-if="erros">
                        <Erros :erros="erros" />
                    </div>
                    <v-text-field label="ID"
                        v-model.number="filter.id" />
                    <v-text-field label="Nome"
                        v-model="filter.name" />

                    <h1 class="mt-4 headline">Alterar Perfil</h1>
                    <v-divider class="mb-3" />
                    <v-text-field label="Nome"
                        v-model="profile.name" />
                    <v-text-field label="Rótulo"
                        v-model="profile.label" />

                    <v-btn color="primary" class="ml-0 mt-3"
                        @click="alterarPerfil">
                        Alterar Perfil
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
import gql from 'graphql-tag';
import Erros from '../comum/Erros'

export default {
    components: { Erros },
    data() {
        return {
            filter: {},
            profile: {},
            data: null,
            erros: null
        }
    },
    methods: {
        alterarPerfil() {
            this.$api.mutate({
                mutation: gql`
                    mutation (
                        $filterId: Int
                        $filterName: String
                        $name: String
                        $label: String
                    ) {
                        changeProfile(
                            filter: {
                                id: $filterId
                                name: $filterName
                            }
                            data: {
                                name: $name
                                label: $label
                            }
                        ) {
                            id name label
                        }
                    }
                `,
                variables: {
                    filterId: this.filter.id,
                    filterName: this.filter.name,
                    name: this.profile.name,
                    label: this.profile.label
                }
            }).then(results => {
                this.data = results.data.changeProfile
                this.filter = {}
                this.profile = {}
                this.erros = null
            }).catch(e => {
                this.erros = e
            })
        }
    }
}
</script>

<style>

</style>
