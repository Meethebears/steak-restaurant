"use client"

import { Modal } from "antd"
import axios from 'axios'
import { useEffect, useState } from "react"

const ModalCheckBill = (props:any) => {

    const [saleById, setSaleById] = useState("")

    const fetchByID = () => {
        axios.get(`http://localhost:5000/api/sale_items/${props.id}`)
        .then(response => {
            setSaleById(() => response.data)
        })
    }

    console.log("Data",saleById);
    
    
    return (
        <Modal title="ชำระเงิน" open={props.open} onOk={props.onOk} onCancel={props.onCancel}>
            <div>{props.id}</div>
        </Modal>
    )
}

export default ModalCheckBill;