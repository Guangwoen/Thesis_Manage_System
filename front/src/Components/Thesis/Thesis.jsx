import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Space, Table, Input, Button, PageHeader, Descriptions, Tabs } from 'antd';
import "rsuite/dist/rsuite.min.css";
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import './Thesis.css';

const latestInfo = [{
  id: 1,
  title: '论文题目_1',
  date: '3月8号',
  writer: 'Cui',
  publisher: 'Root',
  likes: 45,
  category: '理论证明型',
  researchDirection: 'FE',
  meeting: 'Meeting_1',

}, {
  id: 2,
  title: '论文题目_2',
  date: '2月17号',
  writer: 'Liu',
  publisher: 'Root',
  likes: 343,
  category: '综述型',
  researchDirection: 'IOS',
  meeting: 'Meeting_2',
}, {
  id: 3,
  title: '论文题目_3',
  date: '5月4号',
  writer: 'Ma',
  publisher: 'Root',
  likes: 33,
  category: '实验型',
  researchDirection: 'ML',
  meeting: 'Meeting_3',
}];

export class Latest extends React.Component {
  state = {
    searchText: '',
    searchedColumn: '',
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={`查询 ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
                type="primary"
                onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
            >
              查询
            </Button>
            <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              重置
            </Button>
            <Button
                type="link"
                size="small"
                onClick={() => {
                  confirm({ closeDropdown: false });
                  this.setState({
                    searchText: selectedKeys[0],
                    searchedColumn: dataIndex,
                  });
                }}
            >
              过滤
            </Button>
          </Space>
        </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
        record[dataIndex]
            ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
            : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
        this.state.searchedColumn === dataIndex ? (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text ? text.toString() : ''}
            />
        ) : (
            text
        ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: '10%',
        ...this.getColumnSearchProps('id'),
      },
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        width: '10%',
        ...this.getColumnSearchProps('title'),
      },
      {
        title: '作者',
        dataIndex: 'writer',
        key: 'writer',
        width: '10%',
        ...this.getColumnSearchProps('writer'),
      },
      {
        title: '发布日期',
        dataIndex: 'date',
        key: 'date',
        width: '10%',
        ...this.getColumnSearchProps('date'),
        sorter: (a, b) => a.date.localeCompare(b.date),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: '发布人',
        dataIndex: 'publisher',
        key: 'publisher',
        width: '10%',
        ...this.getColumnSearchProps('publisher'),
      },
      {
        title: '论文类型',
        dataIndex: 'category',
        key: 'category',
        width: '10%',
        ...this.getColumnSearchProps('category'),
      },
      {
        title: '研究方向',
        dataIndex: 'researchDirection',
        key: 'researchDirection',
        width: '10%',
        ...this.getColumnSearchProps('researchDirection'),
      },
      {
        title: '发布会议',
        dataIndex: 'meeting',
        key: 'meeting',
        width: '10%',
        ...this.getColumnSearchProps('meeting'),
      },
      {
        title: '点赞数',
        dataIndex: 'likes',
        key: 'likes',
        width: '10%',
        ...this.getColumnSearchProps('likes'),
        sorter: (a, b) => a.likes.valueOf() - b.likes.valueOf(),
        sortDirections: ['descend', 'ascend'],
      },
    ];
    const routes = [
      {
        breadcrumbName: '/首页',
      },
    ];

    function CurentTime() {
      var now = new Date();

      var year = now.getFullYear();       //年
      var month = now.getMonth() + 1;     //月
      var day = now.getDate();            //日

      var hh = now.getHours();            //时
      var mm = now.getMinutes();          //分
      var ss = now.getSeconds();          //秒

      var clock = year + "-";

      if(month < 10)
        clock += "0";

      clock += month + "-";

      if(day < 10)
        clock += "0";

      clock += day + " ";

      if(hh < 10)
        clock += "0";

      clock += hh + ":";
      if (mm < 10) clock += '0';
      clock += mm + ":";

      if(ss < 10) clock += '0';

      clock += ss;
      return(clock);
    }

    return <>
        <PageHeader style={{background: '#fff'}} title="最新文章" breadcrumb={{ routes }}>
          <Descriptions>
            <Descriptions.Item label="更新时间">{ CurentTime() }</Descriptions.Item>
          </Descriptions>
        </PageHeader>
        <Table className="site-layout-content" columns={columns} dataSource={latestInfo} />
      </>
  }
}

const note = [{
  id: 2,
  title: '摘要',
  thesis: '论文_1',
  date: '5月7日',
  content: 'We provide the building blocks to enable the creation of a broad variety of rich text composition' +
      ' experiences, from basic text styles to embedded media.Draft.js fits seamlessly into React applications, ' +
      'abstracting away the details of rendering, selection, and input behavior with a familiar declarative API.' +
      'The Draft.js model is built with immutable-js, offering an API with functional state updates and aggressively' +
      ' leveraging data persistence for scalable memory usage.'
}, {
  id: 3,
  title: '摘要_2',
  thesis: '论文_2',
  date: '5月8日',
  content: 'This is a test for thesis 2.'
}];

export class MyColumn extends React.Component {
  render() {
    const { TabPane } = Tabs;

    function callback(key) {
      console.log(key);
    }

    const Tab = () => (
        <Tabs defaultActiveKey="1" onChange={callback} centered>
          <TabPane tab="已发布" key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="审核中" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="未发布" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
    );
    const routes = [
      {
        breadcrumbName: '内容管理',
      },
      {
        breadcrumbName: '笔记管理',
      }
    ];
    return <>
      <PageHeader style={{background: '#fff'}} title="我的笔记" breadcrumb={{ routes }}>
        <Descriptions>
          <Descriptions.Item label="统计笔记数">{ note.length }</Descriptions.Item>
        </Descriptions>
      </PageHeader>
      <div className="site-layout-content">
        <Tab/>
      </div>
    </>
  }
}

const myWord = [
  {
    id: 2,
    title: '论文题目_2',
    date: '2月17号',
    writer: 'Liu',
    publisher: 'Root',
    likes: 343,
    category: '综述型',
    researchDirection: 'IOS',
    meeting: 'Meeting_2',
  }, {
    id: 3,
    title: '论文题目_3',
    date: '5月4号',
    writer: 'Ma',
    publisher: 'Root',
    likes: 33,
    category: '实验型',
    researchDirection: 'ML',
    meeting: 'Meeting_3',
  },
]

export class MyThesis extends React.Component {
  render () {
    const { TabPane } = Tabs;

    function callback(key) {
      console.log(key);
    }

    const Tab = () => (
        <Tabs defaultActiveKey="1" onChange={callback} centered>
          <TabPane tab="已发布" key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="审核中" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="未发布" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
    );
    const routes = [
      {
        breadcrumbName: '内容管理',
      },
      {
        breadcrumbName: '文章管理',
      }
    ];
  return <>
    <PageHeader style={{background: '#fff'}} title="我的文章" breadcrumb={{ routes }}>
      <Descriptions>
        <Descriptions.Item label="统计文章数">{ myWord.length }</Descriptions.Item>
      </Descriptions>
    </PageHeader>
    <div className="site-layout-content">
      <Tab/>
    </div>
    </>
  }
}