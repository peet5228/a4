<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-form v-if="user.status_eva === 2 || user.status_eva === 3">
                    <h1 class="text-h5 font-weight-bold">คะแนนประเมินตนเอง</h1>
                    <v-card class="pa-2">
                        <p>ชื่อ {{ user.first_name }} {{ user.last_name }}</p>
                        <p>รอบประเมินที่ {{ user.round_sys }} ปี {{ user.year_sys }}</p>
                    </v-card>
                    <v-row class="mt-2" v-for="(topic,index1) in topics" :key="topic.id_topic">
                        <v-col cols="12">
                            <h1 class="font-weight-bold text-h6">{{ index1+1 }}.{{ topic.name_topic }}</h1>
                            <v-table class="auto-table w-full">
                                <thead>
                                    <tr>
                                        <th class="border w-1/10 text-center">ตัวชี้วัด</th>
                                        <th class="border w-1/10 text-center">รายละเอียด</th>
                                        <th class="border w-1/10 text-center">น้ำหนักคะแนน</th>
                                        <th class="border w-1/10 text-center">คะแนนเต็ม</th>
                                        <th class="border w-1/10 text-center">คะแนนที่ได้</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in topic.indicates" :key="item.id_indicate">
                                        <td class="border w-1/10 text-center">{{ item.name_indicate }}</td>
                                        <td class="border w-1/10 text-center">{{ item.detail_indicate }}</td>
                                        <td class="border w-1/10 text-center">{{ item.point_indicate }}</td>
                                        <td class="border w-1/10 text-center">{{ item.point_indicate*4 }}</td>
                                        <td class="border w-1/10 text-center">{{ item.score_member*item.point_indicate }}</td>
                                    </tr>
                                </tbody>
                            </v-table>
                        </v-col>
                    </v-row>
                    <v-alert type="success" class="text-end pa-2 font-weight-bold mt-3">คะแนนรวมสุทธิ : {{ totalScore }} คะแนน</v-alert>
                </v-form>
                <v-alert v-else-if="user.status_eva === 1" type="info" >คุณยังไม่มีแบบประเมิน</v-alert>
                <v-alert v-else type="warning">คุณยังไม่มีแบบประเมิน</v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
const totalScore = ref(0)
const user = ref({})
const topics = ref([])
const token = localStorage.getItem('token')
const fetchUser = async () =>{
    try{
        const res = await axios.get(`http://localhost:3001/api/Eva/check_eva`,{
            headers:{Authorization:`Bearer ${token}`}
        })
        user.value = res.data
    }catch(err){
        console.error('โหลดข้อมูลผู้ใช้ไม่สำเร็จ',err)
    }
}
const fetcTopic = async () =>{
    try{
        const res = await axios.get(`http://localhost:3001/api/Eva/check_eva/indicate`,{
            headers:{Authorization:`Bearer ${token}`}
        })
        topics.value = res.data
        res.data.forEach(score => {
            score.indicates.forEach((i) =>{
                totalScore.value += (i.score_member)*(i.point_indicate)
            })
        });
    }catch(err){
        console.error('โหลดข้อมูลผู้ใช้ไม่สำเร็จ',err)
    }
}
onMounted(async () =>{
    await Promise.all([fetchUser(),fetcTopic()]) 
})

</script>

<style scoped>

</style>