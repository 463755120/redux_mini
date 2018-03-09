import React from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from './mini-redux'
//connect负责链接组件，给到redux里的数据放到组件的属性里
//1负责接收一个组件，把state里的一些数据放进去，返回一个组件
//数据变化通知组件
// state=>state  ===  function(state){return state}
export const connect = (mapStateToProps = state => state, mapDispatchToProps = {}) => (WrapComponent) => {
    return class ConnectComponent extends React.Component {
        static contextTypes = {
			store:PropTypes.object
		}

        constructor(props, context) {
            super(props, context)
            this.state = {
                props: {}
            }
        }

        componentDidMount() {
            const {store} = this.context
            store.subscribe(()=>{this.update()})
            this.update()
        }
        //获取mapStateToProps和mapDispatchToProps 放入this.props里
        //：mapStateToProps和mapDispatchToProps。它们定义了 UI 组件的业务逻辑
        //。前者负责输入逻辑，即将state映射到 UI 组件的参数（props），
        //  后者负责输出逻辑，即将用户对 UI 组件的操作映射成 Action。
        update() {
            const { store } = this.context
            //获取store里当前所有的状态（state）,给到mapStateToProps
            const stateProps = mapStateToProps(store.getState())
            const dispatchProps = bindActionCreators(mapDispatchToProps,store.dispatch)
            //从state获取的props和本身的props融合在一起
            this.setState({
                props: {
                    ...this.state.props,
                    ...stateProps,                   
                    ...dispatchProps
                }
            })
        }
        render(){
            //WrapComponent就是包装好的组件，即含有组合过的props
            return <WrapComponent {...this.state.props}></WrapComponent>
        }
    }
}

//Provider 把store放到context,所有的子元素就可以直接获取store
export class Provider extends React.Component{
	static childContextTypes = {
		store: PropTypes.object
	}
	getChildContext(){
		return {store:this.store}
	}
	constructor(props, context){
		super(props, context)
		this.store = props.store
	}
	render(){
		return this.props.children
	}
}