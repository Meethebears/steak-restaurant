"use client";
import React, { useState } from 'react';
import {
    HomeOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ShoppingCartOutlined,
    AreaChartOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
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
]

const Navbar = (props: any) => {
    const router = useRouter()
    const [collapsed, setCollapsed] = useState(true)

    const { keys } = props



    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    }

    const handleMenu = (key: any) => {

        const keyPage = key.key

        switch (keyPage) {
            case "1":
                router.replace('/home', { scroll: false })
                break;
            case "2":
                router.replace('/addproduct', { scroll: false })
                break;
            case "3":
                router.replace('/dashboard', { scroll: false })
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
                onClick={(e) => handleMenu(e)}
            />
        </div>
    );
};

export default Navbar;