'use client';

import { Card, Divider, ConfigProvider, CollapseProps, Collapse } from 'antd';
import Menu from '../Menu'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import HorizontalBars from './chart'
import axios from 'axios'
import './style.css'


const Dashboard = () => {

    const [saleProduct, setSaleProduct] = useState("")
    const [TotalSale, setTotalSale] = useState("")
    const [TodaySale, setTodaySale] = useState("")
    const [MonthSale, setMonthSale] = useState("")
    const [MonthlySales, setMonthlySales] = useState([])
    const router = useRouter()
    const pathname = usePathname()

    const data = [
        { id: 0, value: 10, label: 'series A' },
        { id: 1, value: 15, label: 'series B' },
        { id: 2, value: 20, label: 'series C' },
    ]

    const TotalMonth: any = []

    useEffect(() => {
        axios.get('http://localhost:5000/api/sale_items')
            .then(response => {
                setSaleProduct(response.data)
            })
        axios.get('http://localhost:5000/api/sale_item/total-sales')
            .then(response => {
                setTotalSale(response.data)
            })
        axios.get('http://localhost:5000/api/sale_item/today-sales')
            .then(response => {
                setTodaySale(response.data)
            })
        axios.get('http://localhost:5000/api/sale_item/month-sales')
            .then(response => {
                setMonthSale(response.data)
            })
    }, [])

    const Payment = (id: string) => {
        router.push(`/home/${id}`)
    }

    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: 'ยอดขายทั้งหมด',
            children: TotalSale,
        },
    ]

    var totalmonth = []
    const Months = Array.isArray(saleProduct) ? saleProduct.map((item) => new Date(item.updated_at).toLocaleString('en-us', { month: 'short' })) : null
    const prices = Array.isArray(saleProduct) ? saleProduct.map((item) => item.totalprice) : null
    if (Months && prices) {
        for (let i = 0; i < Months.length; i++) {
            TotalMonth.push({ month: Months[i], total: prices[i] })
        }
    }
    if (TotalMonth) {
        const Jan = TotalMonth.filter((item: any) => item.month == "Jan")
        const Feb = TotalMonth.filter((item: any) => item.month == "Feb")
        const Mar = TotalMonth.filter((item: any) => item.month == "Mar")
        const Apr = TotalMonth.filter((item: any) => item.month == "Apr")
        
        if (Jan) {
            for (let i = 0; i < Jan.length; i++) {
                const total: any = []
                Jan.map((item: any) => total.push(item.total))
                let sum_total_month = total.reduce((prev: number, curr: number) => prev + curr, 0)
                totalmonth.push({ month: "Jan", total: sum_total_month })

            }
        }
        if (Feb) {
            for (let i = 0; i < Feb.length; i++) {
                const total: any = []
                Feb.map((item: any) => total.push(item.total))
                const sum_total_month = total.reduce((prev: number, curr: number) => prev + curr, 0)
                totalmonth.push({ month: "Feb", total: sum_total_month })
            }
        }
        if (Mar) {
            for (let i = 0; i < Mar.length; i++) {
                const total: any = []
                Mar.map((item: any) => total.push(item.total))
                let sum_total_month = total.reduce((prev: number, curr: number) => prev + curr, 0)
                totalmonth.push({ month: "Mar", total: sum_total_month })

            }
        }if (Apr) {
            for (let i = 0; i < Apr.length; i++) {
                const total: any = []
                Apr.map((item: any) => total.push(item.total))
                let sum_total_month = total.reduce((prev: number, curr: number) => prev + curr, 0)
                totalmonth.push({ month: "Apr", total: sum_total_month })

            }
        }
        
    }

    return (
        <>
            {pathname == "/dashboard" ? <Menu keys={"3"} /> : null}
            <main style={{ display: "flex", flexDirection: "column", padding: '3rem', minHeight: '100vh', marginLeft: "35px" }}>
                <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 30 }}>
                    <ConfigProvider
                        theme={{
                            token: {
                                fontSize: 18
                            },
                        }}
                    >
                        <Collapse items={[
                            {
                                key: '1',
                                label: 'ยอดขายวันนี้',
                                children: TodaySale,
                            },
                        ]}
                            bordered={true}
                            size="large"
                            style={{ fontFamily: "'Acme', sans-serif", fontWeight: 600, fontStyle: "normal" }}
                            defaultActiveKey={['1']}
                        />
                    </ConfigProvider>
                    <ConfigProvider
                        theme={{
                            token: {
                                fontSize: 18
                            },
                        }}
                    >
                        <Collapse items={[
                            {
                                key: '1',
                                label: 'ยอดขายเดือนนี้',
                                children: MonthSale,
                            },
                        ]}
                            bordered={true}
                            size="large"
                            style={{ fontFamily: "'Acme', sans-serif", fontWeight: 600, fontStyle: "normal" }}
                            defaultActiveKey={['1']}
                        />
                    </ConfigProvider>

                    <ConfigProvider
                        theme={{
                            token: {
                                fontSize: 18
                            },
                            components: {
                                Collapse: {
                                    headerBg: "rgba(219, 224, 224, 1)"
                                },
                            },
                        }}
                    >
                        <Collapse defaultActiveKey={['1']} bordered={true} items={items} size="large" style={{ fontFamily: "'Acme', sans-serif", fontWeight: 600, fontStyle: "normal" }} />
                    </ConfigProvider>
                </div>
                <h2>Table status</h2>
                <Divider />
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    {Array.isArray(saleProduct) ? saleProduct.map((item) => {
                        return (item.payment === "not paid" ? <Card style={{ width: 185, fontFamily: 'Mitr, sans-serif', cursor: "pointer" }} onClick={() => Payment(item._id)}>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <div style={{ fontSize: 20, fontWeight: 1000 }}>{item.tablenumber}</div>
                                <Divider />
                                <div style={{ fontSize: 16, fontWeight: 600 }}>รายการอาหาร</div>
                                <div>{(item.order).map((element: any) => {
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
                        </Card> : null)
                    })
                        : null
                    }
                </div>
                <Divider />
                <section style={{ display: 'flex', justifyContent: 'space-around' }}>
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
                    <Card style={{ width: 400 }}>
                        <HorizontalBars totalmonth={totalmonth}/>
                    </Card>
                </section>
            </main>
        </>
    )
}

export default Dashboard;