import { Table, Layout, Space, Row, Col} from "antd";
import "./App.less";
import React, { useState, useEffect } from "react";

const { Header, Footer, Sider, Content } = Layout;

const columns = [
  {
    title: "Name",
    dataIndex: "playerName",
    sorter: (a, b) => a.playerName.localeCompare(b.playerName),
  },
  {
    title: 'Pos.',
    dataIndex: 'playerPosition',
    filters: [
      {
        text: 'C',
        value: 'C',
      },
      {
        text: 'F',
        value: 'F',
      },
      {
        text: 'G',
        value: 'G',
      },
    ],
    onFilter: (value, record) => record.position.indexOf(value) > -1,
    sorter: (a, b) => a.playerPosition.localeCompare(b.playerPosition),
  },
  {
    title: 'Pts.',
    dataIndex: 'playerPTS',
    sorter: (a, b) => a.playerPTS - b.playerPTS
  },
];

function App() {
  const [data, setData] = useState();

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params->", pagination, filters, sorter, extra);
    console.log("onclick data ->", data);
  };

  const fetchPlayer = () => {
    // fetch("http://localhost:8080/api/player/all")
    // http://221.165.6.252:8080/api/player/crawling
    fetch("http://221.165.6.252:8080/api/player/all")    
      .then(function (result) {
        return result.json();
      })
      .then(function (json) {
        setData(json);
        console.log("json->", json);
        // data=json.data;
      });
  };

  useEffect(() => {
    fetchPlayer();
  }, []);
  
  return (
    <div className="App">     
    <Layout style={{background: 'white'}}>
      <Space>
      <Sider width="200" style={{background: 'white'}}>
      Sider
        <Layout>          
          <Row style={{background: 'red'}}>카운터자리(Row>Circle)</Row>
          <Row style={{background: 'blue', color: 'white'}}>구단명자리(Row>Table)<br></br><br></br><br></br><br></br><br></br></Row>
        </Layout>
      </Sider>
      <Layout>
        <Space direction="vertical">
        <Header style={{background: 'green'}}>현재선택선수정보자리(Header)</Header>
        <Content style={{width: '1200px', background: 'black', color: 'white'}}>
          <p>선수명단자리(Content>Table)</p>
          <Table columns={columns} dataSource={data} onChange={onChange} />
        </Content>        
        </Space>
      </Layout>
      <Sider width="100" style={{background: 'white'}}>
      Sider
      <Row style={{background: 'red'}}>선택된선수자리(Table)<br></br><br></br><br></br><br></br><br></br></Row>
      </Sider>
      </Space>
    </Layout>  
    </div>
  );
}
export default App;