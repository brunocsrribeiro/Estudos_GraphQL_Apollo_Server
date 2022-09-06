<template>
    <v-container fluid>
        <v-layout>
            <v-flex>
                <v-layout column class="ma-3">
                    <h1 class="headline">Filtrar Usuário</h1>
                    <v-divider class="mb-3" />
                    <div v-if="erros">
                        <Erros :erros="erros" />
                    </div>
                    <v-text-field label="ID"
                        v-model.number="filter.id" />
                    <v-text-field label="E-mail"
                        v-model="filter.email" />

                    <h1 class="mt-4 headline">Alterar Usuário</h1>
                    <v-divider class="mb-3" />
                    <v-text-field label="Nome"
                        v-model="user.name" />
                    <v-text-field label="E-mail"
                        v-model="user.email" />
                    <v-text-field label="Senha"
                        v-model="user.password" type="password" />
                    <v-select label="Perfis"
                        v-model="user.profiles"
                        :items="profiles"
                        item-value="id"
                        item-text="label"
                        attach multiple
                        chips deletable-chips />
                    <v-btn class="ml-0 mt-3"
                        @click="obterPerfis">
                        Obter Perfis
                    </v-btn>
                    <v-btn color="primary" class="ml-0 mt-3"
                        @click="alterarUsuario">
                        Alterar Usuário
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
            user: {},
            profiles: [],
            data: null,
            erros: null
        }
    },
    computed: {
        perfisRotulos() {
            return this.data && this.data.profiles &&
                this.data.profiles.map(p => p.label).join(', ')
        },
        perfisSelecionados() {
            if(this.user.profiles) {
                return this.user.profiles.map(id => ({ id }))
            } else {
                return null
            }
        }
    },
    methods: {
        alterarUsuario() {
            this.$api.mutate({
                mutation: gql`
                    mutation (
                        $filterId: Int
                        $filterEmail: String
                        $name: String
                        $email: String
                        $password: String
                        $profiles: [FilterProfile]
                    ) {
                        changeUser(
                            filter: {
                                id: $filterId
                                email: $filterEmail
                            }
                            data: {
                                name: $name
                                email: $email
                                password: $password
                                profiles: $profiles
                            }
                        ) {
                            id name email profiles { label }
                        }
                    }
                `,
                variables: {
                    filterId: this.filter.id,
                    filterEmail: this.filter.email,
                    name: this.user.name,
                    email: this.user.email,
                    password: this.user.password,
                    profiles: this.perfisSelecionados
                }
            }).then(results => {
                this.data = results.data.changeUser
                this.filter = {}
                this.user = {}
                this.erros = null
            }).catcth(e => {
                this.erros = e
            })
        },
        obterPerfis() {
            this.$api.query({
                query: gql`{ profiles { id label } }`
            }).then(results => {
                this.profiles = results.data.profiles
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
