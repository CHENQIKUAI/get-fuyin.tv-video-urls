import React from "react"
import "../App.css"

class List extends React.Component {

    handleClick = () => {
        const data = this.props.data;
        let str = "";
        data.forEach(item => {
            str += `${item}\n`;
        });

        const ele = document.createElement("textarea");
        ele.value = str;
        document.body.appendChild(ele);
        ele.select();
        document.execCommand('copy');
        alert("复制成功")
    }

    render() {
        const datasource = this.props.data;

        return (
            <div className="list">
                {
                    datasource.length !== 0 && <button onClick={this.handleClick}>一键复制下载地址</button>
                }

                {
                    datasource.map(url => {
                        return (
                            <p key={url}>{url}</p>
                        )
                    })
                }
            </div>
        )
    }
}

export default List;