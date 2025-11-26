const express = require('express')
const db = require('../db')
const router = express.Router()

// API สำหรับ GET ข้อมูล
router.get('/staff',async (req,res) => {
    try{
        const [[evaCount]] = await db.query(`select count(*)as total from tb_eva`)
        const [[evaCount]] = await db.query(`select count(*)as total from tb_eva where status_eva=1`)
        res.json(rows)
    }catch(err){
        console.error('Error Get',err)
        res.status(500).json({message:'Error Get'})
    }
})

module.exports = router