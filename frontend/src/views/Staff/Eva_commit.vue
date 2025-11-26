<template>
    <v-container fluid class="py-10">
                <v-form @submit.prevent="saveMember">
                    <v-card class="pa-4">
                        <h1 class=" font-weight-bold text-h5 text-center text-maroon">ตั้งค่ากรรมการ</h1>&nbsp;
                        <v-row class="mt-4">
                          
                            <v-col cols="12" md="6" class="text-center"><v-btn type="submit" color="blue" class="text-white w-full">{{ form.id_eva ? 'อัปเดต' : 'บันทึก' }}</v-btn></v-col>
                            <v-col cols="12" md="6" class="text-center"><v-btn type="reset" color="error" class="text-white w-full">ยกเลิก</v-btn></v-col>
                        </v-row>
                    </v-card>
                </v-form>

                <br>

                <v-table class="table">
                    <thead>
                        <tr class="bg-gray-400">
                            <th class="border text-center">ลำดับ</th>
                            <th class="border text-center">ผู้รับการประเมิน</th>
                            <th class="border text-center">รอบการประเมิน</th>
                            <th class="border text-center">วันที่ออกแบบประเมิน</th>
                            <th class="border text-center">สถานะการประเมิน</th>
                            <th class="border text-center">จัดการ</th>
                            <th class="border text-center">เพิ่มกรรมการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(items,index) in result" :key="items.id_eva">
                            <td class="border text-center">{{ index+1 }}</td>
                            <td class="border text-center">{{ items.first_name }} {{ items.last_name }}</td>
                            <td class="border text-center">รอบที่ {{ items.round_sys }} ปี {{ items.year_sys }}</td>
                            <td class="border text-center">{{ items.day_eva }}</td>
                            <td class="border text-center">{{ items.status_eva === 1 ? 'ประเมินตนเอง' : items.status_eva === 2 ? 'กรรมกาประเมิน' : 'ประเมินเสร็จสิ้น' }}</td>
                            <td class="border text-center">
                                <v-btn class="text-white" size="small" color="warning" @click="edit(items)">แก้ไข</v-btn>&nbsp;
                                <v-btn class="text-white" size="small" color="error" @click="del(items.id_eva)">ลบ</v-btn>
                            </td>
                            <td class="border text-center">
                                <!-- <v-btn class="text-white" size="small" color="warning" @click="edit(items)">แก้ไข</v-btn>&nbsp; -->
                                <v-btn class="text-white" size="small" color="success" @click="add(items.id_eva)">เพิ่มกรรมการ</v-btn>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref,onMounted,computed } from 'vue';
import { useRoute } from 'vue-router';

const id_eva = useRoute().params.id_eva
const api = import.meta.env?.vite_BASE_API || 'http://localhost:3001/api/Staff'

const people = ref([])
const header = ref([])
const role = ['ประธาน','กรรมการ','เลขา']
const List = ref([
    {id_commit:null,id_member:'',role:''},
    {id_commit:null,id_member:'',role:''},
    {id_commit:null,id_member:'',role:''},
])

const MEMBER = (idx:number) => {
    const picked = List.value.map( (c,i) => (i !== idx ? c.id_member : null) )
    return people.value.filter((p) => !picked.includes(p.id_member))
}

const ROLE = (idx:number) => {
    const picked = List.value.map( (c,i) => (i !== idx ? c.id_member : null) )
    return role.filter((p) => !picked.includes(p))
}

const nameMap = computed( () => Object.fromEntries(people.value.map( p => [p.id_member , p.fullname_commit])) )
const nameOf = (id:number) => nameMap.value[id]

const fetch = async () => {
    try{
        const r = await axios.get(`${api}/member/eva`)
        member.value = r.data
        const e = await axios.get(`${api}/eva/round`)
        round.value = e.data
        const res = await axios.get(`${api}/eva`)
        result.value = res.data
    }catch(err){
        console.error('Error Fetching',err)
    }
}

const saveMember = async () =>{
    try{
        if(form.value.id_eva){
            await axios.put(`${api}/eva/${form.value.id_eva}`,form.value)
        }else{
            await axios.post(`${api}/eva`,form.value)
        }
        alert('ทำรายการสำเร็จ')
        await fetch()
        await reset()
    }catch(err){
        console.error('Error',err)
    }
}

const edit = (items:any) => {
    form.value = {...items}
}

const del = async (id_eva:number) => {
    try{
        if(!confirm('ท่านต้องการลบใช่หรือไม่')) return
        await axios.delete(`${api}/eva/${id_eva}`)
        await fetch()
        await reset()
    }catch(err){
        console.error("Error Delete",err)
    }
}

const add = (id_eva:number) => {
    router.push({path : `Eva_commit/${id_eva}`})
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