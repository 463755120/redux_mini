

import React from 'react'

class Demo extends React.Component{
	constructor(props){
        super(props)
        this.state={
            num:1,
			name:'imooc'
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(){
        this.setState({
            num:this.state.num+1
        })
    }
	shouldComponentUpdate(nextProps,nextState){
        console.log(nextProps,nextState)
        if(this.state.num%5 === 0){
            return true
        }
        return false
    }
	render(){
		return (
			<div>
				<p>{this.state.num}</p>
				<button onClick={this.handleClick}>click</button>
			</div>
		)
	}
}




export default Demo







