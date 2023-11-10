"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Button, Card, Divider } from "antd"
import styles from './page.module.css'

const Home = () => {

  const [product, setProduct] = useState("")
  const [imgQR, setImgQR] = useState("")
  const [totalprice, setTotalPrice] = useState(0)
  const [PurchaseList, setPurchaseList] = useState([
    {
      productname: "",
      price: '',
      quantity: 0
    }
  ])

  const CategoriesList = [
    {
      id: "1",
      title: "All Menu",
      icon: "https://cdn-icons-png.flaticon.com/512/5110/5110770.png",
    },
    {
      id: "2",
      title: "Steak",
      icon: "https://cdn-icons-png.flaticon.com/512/2177/2177533.png"
    },
    {
      id: "3",
      title: "Food",
      icon: "https://i.pinimg.com/564x/fd/80/ec/fd80ecec48eba2a9adb76e4133905879.jpg",
    },
    {
      id: "4",
      title: "Fried Food",
      icon: "https://cdn-icons-png.flaticon.com/512/5793/5793742.png"
    },
    {
      id: "5",
      title: "Spaghetti",
      icon: "https://cdn-icons-png.flaticon.com/512/590/590897.png"
    }
  ]


  useEffect(() => {
    axios.get('https://node-api-steak-restaurant.vercel.app/api/product')
      .then(response => {
        setProduct(response.data)
      })
  }, [])

  const generateQRcode = (amount: Number) => {
    const value = {
      amount: amount
    }
    return (
      axios.post('http://localhost:5000/api/generateQRcode', value)
        .then((respones) => {
          setImgQR(respones?.data?.Result);
        })
        .catch((err) => {
          console.log("Error ", err);

        })
    )
  }

  const handlecheckbill = (price: number, name: string) => {
    setTotalPrice(prev => prev + price)
    const objIndex = PurchaseList.findIndex((item) => item.productname === name)
    if (objIndex === -1) {
      PurchaseList.push({
        productname: name,
        price: price.toString(),
        quantity: 1
      })
      setPurchaseList(PurchaseList)
    } else {
      const quantited = PurchaseList[objIndex].quantity
      PurchaseList[objIndex].quantity = quantited + 1
    }
  }
  console.log("===", PurchaseList);


  return (
    <>
      <main style={{ display: "flex", flexDirection: "column", padding: '3rem', minHeight: '100vh', width: "" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ width: 1082, maxWidth: "100%", backgroundColor: "rgb(203 203 203)", borderRadius: 15, padding: 25 }}>
            <div style={{ marginBottom: 15 }}>
              <h3>Categories</h3>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {Array.isArray(CategoriesList)
                ? CategoriesList.map((element) => {
                  return (
                    <div key={element.id}>
                      <Card key={element.id} style={{ width: 132, height: 130, textAlign: "center" }}>
                        <img src={element.icon} alt={element.title} width={50} height={50} />
                        <h3>{element.title}</h3>
                      </Card>
                    </div>
                  )
                })
                : null}
            </div>
            <Divider />
            <div style={{ display: "flex" }}>
              <h4>Menu</h4>
              <div style={{ borderTop: '1px solid #8c8b8b' }}></div>
            </div>
            <div style={{ display: "flex", alignContent: "center", justifyContent: "center", flexWrap: "wrap" }}>
              {Array.isArray(product)
                ? product.map((element) => {
                  return (
                    <div key={element._id} style={{ margin: '1rem' }} onClick={() => handlecheckbill(element.price, element.name)}>
                      <Card style={{ width: 150, height: 150, maxWidth: "100%", maxHeight: "100%" }}>
                        <img src={element.img} alt="steak" width={100} height={100} />
                        <h4 style={{ textAlign: "center" }}>{element.name}</h4>
                        {/* <h1>{element.price}</h1> */}
                      </Card>
                    </div>
                  )
                })
                : null}
            </div>
          </div>
          <div style={{ textAlign: "center", width: 302, maxWidth: "100%", borderRadius: 15, padding: 25, backgroundColor: "#FFFFFF", marginLeft: 10 }}>
            <h1 className={styles.sidebar}>คิดเงิน</h1>
            {PurchaseList.map((item, index) => {
              return (
                <div key={index} style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>{item.productname}</span>
                  <span>{item.price}</span>
                </div>
              )
            })}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>ยอดสุทธิ</span>
              <span>{totalprice}</span>
            </div>
            {imgQR
              ? <div>
                <img src={imgQR} alt='QRcode' style={{ width: 200, objectFit: "contain" }} />
              </div>
              : null}
            <div>
              <Button type="primary" onClick={() => generateQRcode(totalprice)}>
                สแกนจ่าย
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Home;
