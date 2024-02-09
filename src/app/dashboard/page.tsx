'use client';

import { Card, Divider } from 'antd';
import Menu from '../Menu'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react';

const Dashboard = () => {

    const router = useRouter()
    const pathname = usePathname()


    return (
        <>
        {pathname=="/dashboard"?<Menu keys={"3"}/>:null}
            <main style={{ display: "flex", flexDirection: "column", padding: '3rem', minHeight: '100vh', marginLeft: "35px" }}>
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
            </main>
        </>
    )
}

export default Dashboard;