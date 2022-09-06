<template>
    <v-container fluid>
        <v-layout>
            <v-flex>
                <v-layout column class="ma-3">
                    <h1 class="headline">Excluir Usuário</h1>
                    <v-divider class="mb-3" />
                    <div v-if="erros">
                        <Erros :erros="erros" />
                    </div>
                    <v-text-field label="ID"
                        v-model.number="filter.id" />
                    <v-text-field label="E-mail"
                        v-model="filter.email" />

                    <v-btn color="error" class="ml-0 mt-3"
                        @click="excluirUsuario">
                        Excluir Usuário
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
            data: null,
            erros: null
        }
    },
    methods: {
        excluirUsuario() {
            this.$api.mutate({
                mutation: gql`
                    mutation (
                        $id: Int
                        $email: String
                    ) {
                        removeUser(
                            filter: {
                                id: $id
                                email: $email
                            }
                        ) {
                            id name email
                        }
                    }
                `,
                variables: {
                    id: this.filter.id,
                    email: this.filter.email
                }
            }).then(results => {
                this.data = results.data.removeUser
                this.filter = {}
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
