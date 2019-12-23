import React from 'react';

import List from "./components/List"
import './App.css';
import { getVideosDownloadUrls } from './services/VideoUrlService';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      value: "https://www.fuyin.tv/content/view/movid/2583/",
    }
  }

  handleClick = async (e) => {
    const value = this.state.value

    getVideosDownloadUrls(value).then(res => {
      const result = res.data;

      if (result && result.msg === "success") {
        console.log(result.result);

        this.setState({
          list: result.result
        })
      }
    })
  }

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({
      value
    })
  }

  render() {
    return (
      <div className="App">
        <input className="input_url" placeholder="请输入视频集的地址" value={this.state.value} onChange={this.handleChange} />
        <button onClick={this.handleClick}>查询下载地址</button>
        <List data={this.state.list} />
      </div>
    )
  }
}


export default App;
