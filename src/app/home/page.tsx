"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Button, Card, Divider, notification, Modal, Spin } from "antd"
import styles from './page.module.css'
import ModalChangeTable from './modal/ChangeTable'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import Menu from "../Menu"


const Home = () => {

  const [product, setProduct] = useState("")
  const [imgQR, setImgQR] = useState("")
  const [totalprice, setTotalPrice] = useState(0)
  const [tableNumber, setTableNumber] = useState("")
  const [PurchaseList, setPurchaseList] = useState<{ productname: string; price: string; quantity: number }[]>(
    [],
  );
  const [modalTable, setModalTable] = useState(false)
  const [loading, setLoading] = useState(false)
  const [api, contextHolder] = notification.useNotification();

  type NotificationType = 'success' | 'info' | 'warning' | 'error';

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
      title: "Appetizers",
      icon: "https://cdn-icons-png.flaticon.com/512/5793/5793742.png"
    },
    {
      id: "5",
      title: "Spaghetti",
      icon: "https://cdn-icons-png.flaticon.com/512/590/590897.png"
    }
  ]

  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    axios.get('http://localhost:5000/api/product')
      .then(response => {
        setProduct(response.data)
      })
  }, [])

  const generateQRcode = (amount: string) => {
    const value = {
      amount: amount
    }
    return (
      axios.post('http://localhost:5000/api/generateQRcode', value)
        .then((respones) => {
          setImgQR(respones.data.Result);
        })
        .catch((err) => {
          console.log("Error ", err);

        })
    )
  }

  const OpenNotificationWithIcon = (type: NotificationType, message: string) => {
    if (type == "success") {
      api[type]({
        message: 'Success',
        description:
          'AddProduct Data has been recorded successfully.',
      });
    } else {
      api[type]({
        message: message,
        description:
          'AddProduct Data has been recorded is fail.',
      });
    }
  };

  const onFinish = async () => {

    const values = {
      order: PurchaseList,
      tablenumber: tableNumber
    }

    let data;
    data = await axios.post('http://localhost:5000/api/sale_items', values)
      .then((response) => {
        if (response.statusText == "OK") {
          OpenNotificationWithIcon('success', '')
          console.log(response.data);
          setPurchaseList([]),
            setTotalPrice(0),
            setImgQR("")
          setTableNumber("")
        }
      })
      .catch((err) => {
        OpenNotificationWithIcon('error', err)
        console.log("Error", err);
      }
      )
  };


  const handlecheckbill = (price: number, name: string) => {
    if (imgQR !== null) {
      setImgQR("")
    }
    setTotalPrice(prev => prev + price)
    const objIndex = PurchaseList.findIndex((item) => item.productname === name)
    if (objIndex === -1) {
      setPurchaseList(prev => [...prev, {
        productname: name,
        price: price.toString(),
        quantity: 1
      }])
    } else {
      const quantited = PurchaseList[objIndex].quantity
      PurchaseList[objIndex].quantity = quantited + 1
    }
  }

  const handleSelectProductType = (type: string) => {
    if (type === "All Menu") {
      return (
        axios.get('http://localhost:5000/api/product')
          .then((response) => {
            setProduct(response.data)
          })
      )
    } else {
      return (
        axios.get(`http://localhost:5000/api/product/search/${type.toLowerCase()}`)
          .then((respones) => {
            setProduct(respones.data)
          })
          .catch((err) => {
            console.log("Error ", err);

          })
      )
    }
  }

  const handledelete = (index: number, price: number, quantity: number) => {
    let indexlist = PurchaseList.splice(index, 1)
    console.log(indexlist);
    let newtotalprice = totalprice - (price * quantity)
    setTotalPrice(newtotalprice)
  }

  const reset = () => {
    return (
      setPurchaseList([]),
      setTotalPrice(0),
      setImgQR("")
    )
  }

  const showmodal = () => {
    setModalTable(true)
  };

  const handleOk = async () => {
    const values = {
      order: PurchaseList,
      tablenumber: tableNumber
    }
    let data
    data = await axios.post('http://localhost:5000/api/sale_items', values)
      .then((response) => {
        if (response.statusText == "OK") {
          OpenNotificationWithIcon('success', '')
          console.log(response.data);
          setPurchaseList([]),
          setTotalPrice(0),
          setImgQR("")
          setTableNumber("")
          setLoading(true)
          setTimeout(() => {
            setLoading(false)
          }, 5000)
          setTimeout(() => {
            router.push("/dashboard")
          }, 3000)
        }
      })
      .catch((err) => {
        OpenNotificationWithIcon('error', err)
        console.log("Error", err);
      }
      )

    setModalTable(false);
  };

  const handleCancel = () => {
    setModalTable(false);
  };

  return (
    <>
    {pathname == "/home" ? <Menu keys={"1"} /> : null}
    <Spin spinning={loading}>
      <main style={{ display: "flex", flexDirection: "column", padding: '3rem', minHeight: '100vh', marginLeft: "30px" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ width: 1013, maxWidth: "100%", backgroundColor: "rgb(203 203 203)", borderRadius: 15, padding: 25, marginLeft: "auto" }}>
            <div style={{ marginBottom: 15 }}>
              <h3>Categories</h3>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", cursor: "pointer" }}>
              {Array.isArray(CategoriesList)
                ? CategoriesList.map((element) => {
                  return (
                    <div key={element.id} className={styles.wrapcategorieslist} onClick={() => (handleSelectProductType(element.title))}>
                      <Card key={element.id} className={styles.cardcategorieslist}>
                        <img src={element.icon} alt='icon' className={styles.imgicon} />
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
            <div style={{ display: "flex", alignContent: "center", flexWrap: "wrap", cursor: "pointer" }}>
              {Array.isArray(product)
                ? product.map((element) => {
                  return (
                    <div key={element._id} className={styles.wrapmenu} onClick={() => handlecheckbill(element.price, element.name)}>
                      <div className={styles.cardmenu}>
                        <img src={element.img} alt="steak" className={styles.imgmenu} />
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
            <Divider />
            {PurchaseList.map((item, index) => (
              <div key={index} className={styles.purchaselist}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ margin: 1 }}>
                    {item.productname}
                  </div>
                  <div className={styles.contentpurchaselist}>x</div>
                  <div className={styles.contentpurchaselist}>
                    {item.quantity}
                  </div>
                </div>
                <span>{item.price}</span>
                <div>
                  <Button type="text" danger size='small' onClick={() => handledelete(index, Number(item.price), Number(item.quantity))}>
                    X
                  </Button>
                </div>
              </div>
            ))}

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <div className={styles.textcontentsideber}>ยอดสุทธิ</div>
              <div className={styles.textcontentsideber}>{totalprice}</div>
            </div>
            {totalprice
              ? <Button style={{ color: "white", backgroundColor: "green", textAlign: "center" }} onClick={showmodal}>
                เลือกโต๊ะ
              </Button>
              : null}
            {imgQR
              ? <div>
                <img src={imgQR} alt='QRcode' style={{ width: 100, objectFit: "contain" }} />
              </div>
              : null}
            {totalprice !== 0 ? <div style={{ marginTop: 5 }}>
              <Button type="primary" onClick={() => generateQRcode(totalprice.toString())} style={{ marginRight: 15, marginLeft: 30 }}>
                สแกนจ่าย
              </Button>
              <Button type='primary' disabled={tableNumber ? false : true} style={tableNumber ? { color: "white", backgroundColor: "green", textAlign: "center" } : {}} onClick={() => onFinish()}>
                จ่ายเงิน
              </Button>
            </div>
              : null}
          </div>
        </div>
      </main>
      <ModalChangeTable open={modalTable} onOk={handleOk} onCancel={handleCancel} setTableNumber={setTableNumber} />
      </Spin>
    </>
  )
}

export default Home;
