import React from "react";
import classnames from "classnames";
import { connect } from "dva";
import Picker from "./components/Picker";
import PicNav from "./components/PicNav";
import Bigimg from "./components/Bigimg";

import "./styles/less.less";

class App extends React.Component {
    constructor({init}) {
        super();
        //拉取默认数据
        init();
    }

    render() {
        const {color , album , idx } = this.props.position;
        const images = this.props.images;
        
        return <div className="albumWraper">
            <div className="bigimgPart">
                <Bigimg></Bigimg>
            </div>

            <div className="rightPart">
                <div className="titlebox">
                    <h1>宝马x4</h1>
                    <h3>2017年新款 1.6T</h3>
                </div>
               
                <div className="cl"></div>
                <Picker></Picker>
                <div className="cl"></div>
                <PicNav></PicNav>
            </div>
        </div>
    }
}

export default connect(
    ({carshow})=>({
        images: (() => {
            //如果已经init了，此时就返回当前颜色、当前图集的img数组
            if (carshow.images[carshow.position.color]) {
                return carshow.images[carshow.position.color][carshow.position.album];
            }
            return [];
        })() ,
        position: carshow.position
    })
    ,
    (dispatch)=>({
        init(){
            dispatch({"type":"carshow/init_async"});
        },
        goNext(){
            dispatch({"type":"carshow/gonext"});
        }
    })
)(App);