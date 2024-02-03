"use client";

import { Modal } from "antd"

const ModalChangeTable = (props: any) => {
    console.log(props)
    return (
        <Modal title="เลือกโต๊ะ" open={props.open} onOk={props.onOk} onCancel={props.onCancel}>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYJYJORZpD8tmgAFpu80vcBWu6CXveQkp9sw&usqp=CAU" alt='icontable' width={120} height={100} style={{ cursor:"pointer" }} onClick={() => {console.log("Table 1")}}/>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYJYJORZpD8tmgAFpu80vcBWu6CXveQkp9sw&usqp=CAU" alt='icontable' width={120} height={100} style={{ cursor:"pointer" }}onClick={() => {console.log("Table 2")}}/>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYJYJORZpD8tmgAFpu80vcBWu6CXveQkp9sw&usqp=CAU" alt='icontable' width={120} height={100} style={{ cursor:"pointer" }}onClick={() => {console.log("Table 3")}}/>
                </div>
            </div>
        </Modal>
    )
}
export default ModalChangeTable;