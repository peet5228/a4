<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-form v-if="user.status_eva === 2 || user.status_eva === 3">
                    <h1 class="text-h5 font-weight-bold">แบบประเมินตนเอง</h1>
                    <v-card class="pa-4 mt-4">
                        <p>ชื่อ : {{ user.first_name }} {{ user.last_name }}</p>
                        <p>รอบประเมินที่ : {{ user.round_sys }} ปี {{ user.year_sys }}</p>
                    </v-card>

                    <v-row v-for="(topic,index1) in topics" :key="topic.id_topic" class="mt-4">
                        <v-col cols="12">
                            <h1 class="font-weight-bold text-h6">{{ index1+1 }}.{{ topic.name_topic }}</h1>
                            <v-table class="table-auto w-full">
                                <thead class="bg-grey text-black">
                                    <tr>
                                        <th class="border w-1/10 text-center">ตัวชี้วัด</th>
                                        <th class="border w-1/10 text-center">รายละเอียด</th>
                                        <th class="border w-1/10 text-center">น้ำหนักคะแนน</th>
                                        <th class="border w-1/10 text-center">คะแนนเต็ม</th>
                                        <th class="border w-1/10 text-center">คะแนนประเมินประธาน</th>
                                        <th class="border w-1/10 text-center">คะแนนประเมินกรรมการ</th>
                                        <th class="border w-1/10 text-center">คะแนนประเมินเลขา</th>
                                        <th class="border w-1/10 text-center">คะแนนที่ได้</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in topic.indicates" :key="item.id_indicate">
                                        <td class="border text-center">{{ item.name_indicate }}</td>
                                        <td class="border text-center">{{ item.detail_indicate }}</td>
                                        <td class="border text-center">{{ item.point_indicate }}</td>
                                        <td class="border text-center">{{ item.point_indicate*4 }}</td>
                                        <td class="border text-center">{{ scores[item.id_indicate]?.a ?? 'รอประธานประเมิน' }}</td>
                                        <td class="border text-center">{{ scores[item.id_indicate]?.b ?? 'รอกรรมการประเมิน' }}</td>
                                        <td class="border text-center">{{ scores[item.id_indicate]?.c ?? 'รอเลขาประเมิน' }}</td>
                                        <td class="border text-center">
                                            {{ ((scores[item.id_indicate]?.a ?? 0) +(scores[item.id_indicate]?.b ?? 0) +(scores[item.id_indicate]?.c ?? 0)) }}
                                        </td>
                                    </tr>
                                </tbody>
                            </v-table>
                        </v-col>
                    </v-row>
                    <v-alert type="success" class="mt-4 text-end"><b>คะแนนรวมสุทธิ : {{ totalScore.toFixed(2) }} คะแนน</b></v-alert>
                    <div class="mt-4">
                        <label for=""><b>ข้อเสนอแนะ</b></label>
                        <v-card class="pa-4">
                            <v-row v-for="commit in commits" :key="commit.id_commit">
                                <v-col cols="1" class="text-center"><b>{{ commit.level_commit }}</b></v-col><v-col cols="11" class="text-start">: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ commit.detail_commit ? commit.detail_commit : '***รอทำการประเมิน***'}}</v-col>
                            </v-row>
                        </v-card>
                    </div>
                </v-form>
                <v-alert type="info" v-else-if="user.status_eva === 1">คุณยังไม่ได้กรอกแบบประเมิน</v-alert>
                <v-alert type="warning" v-else>คุณยังไม่มีแบบประเมิน</v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';

const user = ref({})
const commits = ref({})
const topics = ref([])
const token = localStorage.getItem('token')
const totalScore = ref(0)
const fetchCommit = async () =>{
    try{
        const res = await axios.get(`http://localhost:3001/api/Eva/check_commit/commit`,{
            headers:{Authorization:`Bearer ${token}`}
        })
        commits.value = res.data
    }catch(err){
        console.error('โหลดข้อมูลผู้ประเมินไม่สำเร็จ',err)
    }
}
const fetchUser = async () =>{
    try{
        const res = await axios.get(`http://localhost:3001/api/Eva/check_commit`,{
            headers:{Authorization:`Bearer ${token}`}
        })
        user.value = res.data
    }catch(err){
        console.error('โหลดข้อมูลผู้ประเมินไม่สำเร็จ',err)
    }
}
const fetchTopic = async () =>{
    try{
        const res = await axios.get(`http://localhost:3001/api/Eva/check_commit/detail`)
        topics.value = res.data
    }catch(err){
        console.error('โหลดข้อมูลตัวชี้วัดไม่สำเร็จ',err)
    }
}

const scores = ref({});

const fetchScore = async () => {
    try {
        const res = await axios.get(`http://localhost:3001/api/Eva/check_commit/score`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        scores.value = res.data.scores
        totalScore.value = res.data.totalScore
    } catch (err) {
        console.error('โหลดคะแนนกรรมการไม่สำเร็จ', err);
    }
};


onMounted(async () =>{
    await Promise.all([fetchTopic(),fetchUser(),fetchScore(),fetchCommit()])
})

</script>

<style scoped>

</style>