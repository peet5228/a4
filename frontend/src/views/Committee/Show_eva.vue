<template>
    <v-container fluid class="py-10">
                <v-table class="table">
                    <thead>
                        <tr class="bg-gray-400">
                            <th class="border text-center">ลำดับ</th>
                            <th class="border text-center">ชื่อ</th>
                            <th class="border text-center">นามสกุล</th>
                            <th class="border text-center">รอบประเมิน</th>
                            <th class="border text-center">ปีประเมิน</th>
                            <th class="border text-center">สถานะการประเมิน</th>
                            <th class="border text-center">คะแนนประเมิน</th>
                            <th class="border text-center">ประเมิน</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(items,index) in result" :key="items.id_eva">
                            <td class="border text-center">{{ index+1 }}</td>
                            <td class="border text-center">{{ items.first_name }}</td>
                            <td class="border text-center">{{ items.last_name }}</td>
                            <td class="border text-center">{{ items.round_sys }}</td>
                            <td class="border text-center">{{ items.year_sys }}</td>
                            <td class="border text-center">{{ items.status_eva === 1 ? 'ผู้รับประเมินกำลังประเมินตนเอง' : items.status_eva === 2 ? 'รอกรรมกาประเมิน' : 'ประเมินเสร็จสิ้น' }}</td>
                            <td class="border text-center">{{ items.total_eva }} คะแนน</td>
                            <td class="border text-center">
                                <v-btn class="text-white" size="small" color="blue" @click="add(items.id_eva)">ประเมิน</v-btn>
                            </td>
                        </tr>
                        <tr v-if="result.length === 0">
                            <td colspan="7" class="text-center border text-gray-500">ไม่พบข้อมูล</td>
                        </tr>
                    </tbody>
                </v-table>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref,onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const api = import.meta.env?.vite_BASE_API || 'http://localhost:3001/api/Commit'
const token = localStorage.getItem('token')
const result = ref([])
const fetch = async () => {
    try{
        const res = await axios.get(`${api}/show_eva`,{
            headers:{Authorization:`Bearer ${token}`}
        })
        result.value = res.data
    }catch(err){
        console.error('Error Fetching',err)
    }
}
const add = (id_eva:number) => {
    router.push({path : `Show_score/${id_eva}`})
}

onMounted(fetch)
</script>

<style scoped>
.btn-maroon{
    background-color: #7c0d14;
}
.text-maroon{
    color: #7c0d14;
}
</style>