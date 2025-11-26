<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-alert v-if="user.status_commit === 'y'" type="success">คุณประเมินผู้รับการประเมินแล้ว</v-alert>
                <v-form v-else-if="user.status_eva === 2 || user.status_eva === 3" @submit.prevent="saveScore">
                    <h1 class="text-h5 font-weight-bold">แบบประเมินผู้รับการประเมินผล</h1>
                    <v-card class="pa-2">
                        <p>ชื่อ {{ user.first_name }} {{ user.last_name }}</p>
                        <p>รอบประเมินที่ {{ user.round_sys }} ปี {{ user.year_sys }}</p>
                    </v-card>
                    <v-row class="mt-2" v-for="(topic,index1) in topics" :key="topic.id_topic">
                        <v-col cols="12">
                            <h1 class="font-weight-bold text-h6">{{ index1+1 }}.{{ topic.name_topic }}</h1>
                            <v-card class="pa-2">
                                <v-row v-for="(indicate,index2) in topic.indicates" :key="indicate.id_indicate">
                                    <v-col cols="12">
                                        <p>
                                            {{ index1+1 }}.{{ index2+1 }} {{ indicate.name_indicate }} น้ำหนักคะแนน : {{ indicate.point_indicate }} คะแนนเต็ม : {{ indicate.point_indicate*4 }} รายละเอียดตัวชี้วัด : {{ indicate.detail_indicate }}
                                        </p>
                                        <p class="mt-2">คำอธิบายเพิ่มเติม : {{ indicate.detail_eva || 'ไม่มี' }}</p>
                                        <p v-if="indicate.file_eva" class="mt-2">ไฟล์ที่แนบ : <v-btn color="blue" size="small" @click="viweFile(indicate.file_eva)">ดูไฟล์</v-btn></p>
                                        <p v-else class="mt-2 text-red">ไฟล์ที่แนบ : ไม่มีไฟล์</p>
                                        <v-select :items="[1,2,3,4]" v-model="indicate.score" class="mt-2" label="ใส่คะแนนประเมิน"></v-select>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                    </v-row>
                    <div class="mt-4">
                        <label for="" class="font-weight-bold">ข้อเสนอแนะ(ถ้ามี)</label>
                        <v-textarea rows="2" v-model="detail_commit"></v-textarea>
                    </div>
                    <div class="mt-2 text-center">
                        <v-btn type="submit" color="blue">บันทึกคะแนน</v-btn>
                    </div>
                </v-form>
                <v-alert v-else-if="user.status_eva === 1" type="info" >ผู้รับการประเมินยังไม่ได้ประเมินตนเอง</v-alert>
                <v-alert v-else type="warning">ยังไม่มีแบบประเมิน</v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute,useRouter } from 'vue-router';
const router = useRouter()
const detail_commit = ref('')
const id_eva = useRoute().params.id_eva
const user = ref({})
const topics = ref([])
const token = localStorage.getItem('token')
const viweFile = (filename:string) =>{
    const url = `http://localhost:3001/uploads/evadetail/${filename}`
    window.open(url,'_Blank')
}
const fetchUser = async () =>{
    try{
        const res = await axios.get(`http://localhost:3001/api/Commit/save_score/${id_eva}`,{
            headers:{Authorization:`Bearer ${token}`}
        })
        user.value = res.data
    }catch(err){
        console.error('โหลดข้อมูลผู้ใช้ไม่สำเร็จ',err)
    }
}
const fetcTopic = async () =>{
    try{
        const res = await axios.get(`http://localhost:3001/api/Commit/save_score/indicate/${id_eva}`,{
            headers:{Authorization:`Bearer ${token}`}
        })
        topics.value = res.data
    }catch(err){
        console.error('โหลดข้อมูลผู้ใช้ไม่สำเร็จ',err)
    }
}
onMounted(async () =>{
    await Promise.all([fetchUser(),fetcTopic()]) 
})
const saveScore = async () =>{
    const formData = new FormData()
    const allScore = topics.value.flatMap(topic =>
        topic.indicates.map((i:any) =>{
            return{
                id_topic:topic.id_topic,
                id_indicate:i.id_indicate,
                score:i.score,
                detail_eva:i.detail_eva ?? null,
            }
        })
    )
    if(allScore.some((s) => !s.score && s.score !== 0)){
        alert('กรุณากรอกคะแนนให้ครบ')
        return
    }
    formData.append('scores',JSON.stringify(allScore))
    formData.append('detail_commit',detail_commit.value)
    try{
        await axios.post(`http://localhost:3001/api/Commit/save_score/${id_eva}`,formData,{
            headers:{Authorization:`Bearer ${token}`}
        })
        alert('บันทึกสำเร็จ')
        router.push({path:'/Show_eva'})
        await Promise.all([fetchUser(),fetcTopic()])
    }catch(err){
        console.error('บันทึกไม่สำเร็จ',err)
    }
}
</script>

<style scoped>

</style>