'use client';

import { Card, Divider, Space } from 'antd';
import Menu from '../Menu'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import axios from 'axios'
import ModalCheckBill from '../Modal/CheckBill';

const Dashboard = () => {

    const [saleProduct, setSaleProduct] = useState("")

    const router = useRouter()
    const pathname = usePathname()

    const data = [
        { id: 0, value: 10, label: 'series A' },
        { id: 1, value: 15, label: 'series B' },
        { id: 2, value: 20, label: 'series C' },
    ];

    useEffect(() => {
        axios.get('http://localhost:5000/api/sale_items')
            .then(response => {
                setSaleProduct(response.data)
            })
    }, [])

    const Payment = (id: string) => {
        router.push(`/home/${id}`)
    }
    

    return (
        <>
            {pathname == "/dashboard" ? <Menu keys={"3"} /> : null}
            <main style={{ display: "flex", flexDirection: "column", padding: '3rem', minHeight: '100vh', marginLeft: "35px" }}>
                <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 30 }}>
                    <Card>
                        <h2>ยอดขายวันนี้</h2>
                    </Card>
                    <Card>
                        <h2>ยอดขายเดือนนี้</h2>
                    </Card>
                    <Card>
                        <h2>ยอดขายทั้งหมด</h2>
                    </Card>
                </div>
                <h2>Table status</h2>
                <Divider />
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    {Array.isArray(saleProduct) ? saleProduct.map((item) => {
                        return (
                            <Card style={{ width: 185, fontFamily: 'Mitr, sans-serif', cursor: "pointer" }} onClick={() => Payment(item._id)}>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <div style={{ fontSize: 20, fontWeight: 1000 }}>{item.tablenumber}</div>
                                    <Divider />
                                    <div style={{ fontSize: 16, fontWeight: 600 }}>รายการอาหาร</div>
                                    <div>{(item.order).map((element: string) => {
                                        return (
                                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                <div style={{ display: "flex" }}>{element.productname}
                                                    <div style={{ color: "#C6C6D1" }}> x{element.quantity}</div>
                                                </div>
                                                <div>{element.price}</div>
                                            </div>
                                        )
                                    })}
                                        <Divider />
                                    </div>
                                    <div>ยอดสุทธิ {item.totalprice}</div>

                                </div>
                            </Card>
                        )
                    })
                        : null
                    }
                </div>
                <Divider />
                <Card style={{ width: 400 }}
                    title={'Top selling'}>
                    <PieChart
                        series={[
                            {
                                data,
                                highlightScope: { faded: 'global', highlighted: 'item' },
                                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                            },
                        ]}
                        height={200}
                    />
                </Card>
            </main>
        </>
    )
}

export default Dashboard;