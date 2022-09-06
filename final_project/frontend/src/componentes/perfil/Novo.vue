<template>
    <v-container fluid>
        <v-layout>
            <v-flex>
                <v-layout column class="ma-3">
                    <h1 class="headline">Novo Perfil</h1>
                    <v-divider class="mb-3" />
                        <div v-if="erros">
                            <Erros :erros="erros" />
                        </div>
                        <v-text-field label="Nome"
                            v-model="profile.name" />
                        <v-text-field label="Rótulo"
                            v-model="profile.label" />
                        <v-btn color="primary" class="ml-0 mt-3"
                            @click="novoPerfil">
                            Novo Perfil
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
            profile: {},
            data: null,
            erros: null
        }
    },
    methods: {
        novoPerfil() {
            this.$api.mutate({
                mutation: gql`
                    mutation (
                        $name: String!
                        $label: String!
                    ) {
                        newProfile(
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
                    name: this.profile.name,
                    label: this.profile.label
                }
            }).then(results => {
                this.data = results.data.newProfile
                this.profile = {}
                this.erros = null
            }).catch(e => [
                this.erros = e
            ])
        }
    }
}
</script>

<style>

</style>
