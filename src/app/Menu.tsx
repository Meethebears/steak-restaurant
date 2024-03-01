"use client";
import React, { useEffect, useState } from 'react';
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    HomeOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    ShoppingCartOutlined,
    AreaChartOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem
}

const items: MenuItem[] = [
    getItem('Home', '1', <HomeOutlined />),
    getItem('Addproduct', '2', <ShoppingCartOutlined />),
    getItem('Dashboard', '3', <AreaChartOutlined />),

    // getItem('Navigation One', 'sub1', <MailOutlined />, [
    //     getItem('Option 5', '5'),
    //     getItem('Option 6', '6'),
    //     getItem('Option 7', '7'),
    //     getItem('Option 8', '8'),
    // ]),

    // getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    //     getItem('Option 9', '9'),
    //     getItem('Option 10', '10'),

    //     getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
    // ]),
];

const Navbar = (props : any) => {
    const router = useRouter()
    const pathname = usePathname()
    const [collapsed, setCollapsed] = useState(true)

    const {keys} = props

    // useEffect(() => {
    //     const CheckUrl = () => {
    //         switch (pathname) {
    //             case "/home":
    //                 setPageKey("1")
    //                 break;
    //             case "/addproduct":
    //                 setPageKey("2")
    //                 break;
    //             case "/dashboard":
    //                 setPageKey("3")
    //                 break;
    //         }
    //     }

    //     CheckUrl()

    // }, [pathname]);
    


    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    }

    const handleMenu = (key: string) => {
        let keys = key.key

        switch (keys) {
            case "1":
                router.push('/home')
                break;
            case "2":
                router.push('/addproduct')
                break;
            case "3":
                router.push('/dashboard')
                break;
        }

    }

    return (
        <div style={{ width: 256, position: "fixed", zIndex: "2" }}>
            <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <Menu
                defaultSelectedKeys={keys}
                mode="inline"
                theme="dark"
                inlineCollapsed={collapsed}
                items={items}
                onClick={handleMenu}
            />
        </div>
    );
};

export default Navbar;