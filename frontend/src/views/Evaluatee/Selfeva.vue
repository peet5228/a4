<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-form>
                    <h1 class="text-h5 font-weight-bold">แบบประเมินตนเอง</h1>
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
                                            {{ index1+1 }}.{{ index2+1 }} {{ indicate.name_indicate }} น้ำหนักคะแนน {{ indicate.point_indicate }} คะแนนเต็ม {{ indicate.point_indicate*4 }} <br> {{ indicate.detail_indicate }}
                                        </p>
                                        <v-textarea rows="2" v-model="indicate.detail_eva" label="คำอธิบายเพิ่มเติม(ถ้ามี)"></v-textarea>
                                        <v-file-input label="แนบไฟล์" accept="image/*,.pdf" @change="onFileChange($event,topic.id_topic,indicate.id_indicate)"></v-file-input>
                                        <v-select v-if="indicate.check_indicate === 'y'" :items="[1,2,3,4]" v-model="indicate.score" label="ใส่คะแนนประเมิน"></v-select>
                                        <v-text-field v-else v-model="indicate.score" label="ใส่คะแนนประเมิน"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                    </v-row>
                    <div class="mt-2 text-center">
                        <v-btn type="submit" color="blue">บันทึกคะแนน</v-btn>
                    </div>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';

const user = ref({})
const topics = ref([])
const token = localStorage.getItem('token')
const fetchUser = async () =>{
    try{
        const res = await axios.get(`http://localhost:3001/api/Eva/selfeva`,{
            headers:{Authorization:`Bearer ${token}`}
        })
        user.value = res.data
    }catch(err){
        console.error('โหลดข้อมูลผู้ใช้ไม่สำเร็จ',err)
    }
}
const fetcTopic = async () =>{
    try{
        const res = await axios.get(`http://localhost:3001/api/Eva/selfeva/indicate`,{
            headers:{Authorization:`Bearer ${token}`}
        })
        topics.value = res.data
        console.log("Topic:",topics.value)
    }catch(err){
        console.error('โหลดข้อมูลผู้ใช้ไม่สำเร็จ',err)
    }
}
</script>

<style scoped>

</style>