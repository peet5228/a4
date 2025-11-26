<template>
    <v-container fluid class="fill-height">
        <v-row justify="center" align="center">
            <v-col cols="12" md="8" lg="6">
                <v-form>
                    <v-card class="pa-4">
                        <h1 class="text-center font-weight-bold text-h5">สมัครสมาชิก</h1>
                        <p class="text-sm text-center mt-2">ระบบประเมินบุคลากรวิทยาลัยเทคนิคน่าน</p>
                        <v-row class="mt-4">
                            <v-col cols="12" md="6">
                                <v-text-field v-model="form.first_name" :error-messages="form.first_name" label="ชื่อ"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const form = ref({
    first_name:'',
    last_name:'',
    email:'',
    username:'',
    password:'',
    role:'',
})
const confirmPassword = ref('')
const error = ref<Record<string,string>>({})

</script>

<style scoped>

</style>