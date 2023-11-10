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

  const generateQRcode = (amount: string) => {
    const value = {
      amount: amount
    }
    return (
      axios.post('https://node-api-steak-restaurant.vercel.app/api/generateQRcode', value)
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
  console.log("===", totalprice);


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
                    <div key={element.id} className={styles.wrapcategorieslist}>
                      <Card key={element.id} className={styles.cardcategorieslist}>
                        <img src={element.icon} alt='icon' className={styles.imgicon}/>
                        <div className={styles.texttitle}>{element.title}</div>
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
            <div style={{ display: "flex", alignContent: "center", flexWrap: "wrap" }}>
              {Array.isArray(product)
                ? product.map((element) => {
                  return (
                    <div key={element._id} className={styles.wrapmenu} onClick={() => handlecheckbill(element.price, element.name)}>
                      <div className={styles.cardmenu}>
                        <img src={element.img} alt="steak" className={styles.imgmenu}/>
                        <div className={styles.listmenu}>{element.name}</div>
                      </div>
                    </div>
                  )
                })
                : null}
            </div>
          </div>
          <div style={{ textAlign: "center", width: 350, maxWidth: "100%", borderRadius: 15, padding: 25, backgroundColor: "#FFFFFF", marginLeft: 10 }}>
            <h2 className={styles.sidebar}>คิดเงิน</h2>
            {PurchaseList.map((item, index) => {
              if(item.quantity >= 1){
                return( <div key={index} className={styles.purchaselist}>
                  <div style={{ display:"flex", alignItems:"center"}}>
                    <div style={{ margin: 1 }}>
                    {item.productname}
                    </div>
                    <div className={styles.contentpurchaselist}>x</div>
                    <div className={styles.contentpurchaselist}>
                      {item.quantity}
                    </div>
                  </div>
                  <span>{item.price}</span>
                </div>
                )
              }else{
                return null
              }
            })}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <div className={styles.textcontentsideber}>ยอดสุทธิ</div>
              <div className={styles.textcontentsideber}>{totalprice}</div>
            </div>
            {imgQR
              ? <div>
                <img src={imgQR} alt='QRcode' style={{ width: 100, objectFit: "contain" }} />
              </div>
              : null}
            <div>
              <Button type="primary" onClick={() => generateQRcode(totalprice.toString())}>
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
