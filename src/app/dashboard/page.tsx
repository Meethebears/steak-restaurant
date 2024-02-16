'use client';

import { Card, Divider } from 'antd';
import Menu from '../Menu'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const Dashboard = () => {

    const router = useRouter()
    const pathname = usePathname()

    const data = [
        { id: 0, value: 10, label: 'series A' },
        { id: 1, value: 15, label: 'series B' },
        { id: 2, value: 20, label: 'series C' },
    ];


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
                    <Card>
                        <div>โต๊ะที่ 1</div>
                        <Divider />
                        <div>รายการอาหาร</div>
                    </Card>
                    <Card>
                        <div>โต๊ะที่ 2</div>
                        <Divider />
                        <div>รายการอาหาร</div>
                    </Card>
                    <Card>
                        <div>โต๊ะที่ 3</div>
                        <Divider />
                        <div>รายการอาหาร</div>
                    </Card>
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