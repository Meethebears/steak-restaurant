"use client";
import React, { useEffect, useState } from 'react';
import {
    HomeOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LogoutOutlined,
    ShoppingCartOutlined,
    AreaChartOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
import { useRouter, usePathname } from 'next/navigation'
import { signOut } from "next-auth/react"

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
    getItem('Logout', '4', <LogoutOutlined />),
];

const Navbar = (props: any) => {
    const router = useRouter()
    const pathname = usePathname()
    const [collapsed, setCollapsed] = useState(true)

    const { keys } = props

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    }

    const handleMenu = (key: any) => {
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
            case "4":
                signOut({ callbackUrl: '/' });
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