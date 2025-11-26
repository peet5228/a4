<template>
    <v-container fuid class="fill-height">
        <v-row justify="center" align="center">
            <v-col cols="12" md="6" lg="4">
                <v-card color="#7d0c14" elevation="10" rounded="lg">
                    <p class="text-white text-h5 font-weight-bold text-center">NTC EVALUATION SYSTEM</p>
                    <p class="text-white  text-center">ระบบประเมินวิทยาลัยเทคนิคน่าน</p>
                    <v-container class="bg-white">
                        <p class=" text-h5 font-weight-bold text-center">เข้าสู่ระบบ</p>
                        <v-alert type="error" v-if="error" variant="tonal">{{ error }}</v-alert>
                        <v-form @submit.prevent="Login">
                            <v-text-field v-modal="username" label="ชื่อผู้ใช้" prepend-inner-icon="mdi-account" />
                            <v-text-field v-modal="password" label="รหัสผ่าน" type="password" prepend-inner-icon="mdi-lock" />
                            <v-text-field v-modal="role" label="ประเภทสมาชิก" :items="Group" prepend-inner-icon="mdi-account-group" />
                            <v-btn class="text-white w-full" color="#7d0c14" type="submit">เข้าสู่ระบบ</v-btn>
                        </v-form>
                        <center><router-link to="/regis" class="text-blue-500 hover:underline">สมัครสมาชิก</router-link></center>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import authApi from '@/api/authApi'

const router = useRouter()

const error = ref('')
const username = ref('')
const password = ref('')
const role = ref('')
const Group = ['ฝ่ายบุคลากร','กรรมการประเมิน','ผู้รับการประเมินผล']

const Login = async () => {
    try{
        const res = await authApi.login({
            username:username.value,
            password:password.value,
            role:role.value,
        })
        console.log("API Response : ",res.data)
        localStorage.setItem('token',res.data.token)
        const useRole = res.data.role
        if(useRole === "ฝ่ายบุคลากร"){
            router.push("/Staff")
        }else if(useRole === "กรรมการประเมิน"){
            router.push("/Committee")
        }else if(useRole === "ผู้รับการประเมินผล"){
            router.push("/Evaluatee")
        }
    }catch(err){
        console.error('Error Login',err)
        error.value = error.response?.data.message || 'เข้าสู่ระบบไม่สำเร็จ'
    }
}

</script>

<style scoped>

</style>