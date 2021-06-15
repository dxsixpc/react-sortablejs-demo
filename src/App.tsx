import * as React from 'react'
import { useState } from 'react'
import { Layout } from 'antd'
import 'antd/dist/antd.css'
const { Header, Footer, Sider, Content } = Layout

import { CrypterAES } from './Crypter/CrypterAES'
import { data, key } from './Crypter/config'

import ComponentList from './ComponentList/ComponentList'
import Canvas from './Canvas/Canvas'
import Dustbin from './Dustbin/Dustbin'

const App = () => {
  // const [data, setData] = useState([]); //数据树
  // const LcdpData = {
  //   id: "page1",
  //   type: "LcdpForm",
  //   props: {
  //     mode: "inline",
  //   },
  //   children: data,
  // };

  // const changeData = (dataList: any) => {
  //   setData([...dataList]);
  //   // console.log('总数据', LcdpData);
  // };

  console.log(99090)

  const encryptdata = data
  const nonceStr = key

  const dbCrypter = new CrypterAES()
  // 设置秘钥
  // * 截取nonceStr的前十六位
  var padEnd = Array(16).fill(' ').join('')
  let keyStr = ('' + nonceStr + padEnd).slice(0, 16)

  console.log(keyStr)
  dbCrypter.updateKey(keyStr)
  // 加密
  // const dataEncrypted = dbCrypter.encrypt('12345678890');
  // console.log(dataEncrypted)
  // 解密
  const value = dbCrypter.decrypt(encryptdata,'dataType')

  console.log(value)

  return (
    <>
      {/* <Layout>
        <Header>Header</Header>
        <Layout>
          <Sider>
            <ComponentList />
          </Sider>
          <Content>
            <Canvas data={data} changeData={changeData} />
          </Content>
          <Sider>
            <Dustbin data={data} changeData={changeData} />
          </Sider>
        </Layout>
        <Footer>Footer</Footer>
      </Layout> */}
    </>
  )
}

export default App
