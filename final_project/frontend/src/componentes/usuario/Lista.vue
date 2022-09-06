<template>
    <v-container fluid>
        <v-layout column>
            <v-flex>
                <v-btn color="primary" class="ml-0 mb-4"
                    @click="obterUsuarios">
                    Obter Usuários
                </v-btn>
            </v-flex>
            <v-flex>
                <div v-if="erros" class="mb-4">
                    <Erros :erros="erros" />
                </div>
            </v-flex>
            <v-flex>
                <v-data-table :headers="headers" :items="users" 
                    hide-actions class="elevation-1">
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.id }}</td>
                        <td>{{ props.item.name }}</td>
                        <td>{{ props.item.email }}</td>
                        <td>{{ props.item.profiles
                                .map(p => p.label)
                                .join(', ') }}</td>
                    </template>
                </v-data-table>
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
            erros: null,
            users: [],
            headers: [
                { text: 'ID', value: 'id' },
                { text: 'Nome', value: 'name' },
                { text: 'E-mail', value: 'email' },
                { text: 'Perfis', value: 'profiles' },
            ],
        }
    },
    methods: {
        obterUsuarios() {
            this.$api.query({
                query: gql`
                    query {
                        users {
                            id name email profiles { label }
                        }
                    }
                `,
                fetchPolicy: 'network-only'
            }).then(results => {
                this.users = results.data.users
                this.erros = null
            }).catch(e => {
                this.users = []
                this.erros = e
            })
        }
    }
}
</script>

<style>

</style>
