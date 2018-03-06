import React from 'react'
import PropTypes from 'prop-types'


//Provider 把store当到context,所有的子元素就可以直接获取store
export class Provider extends React.Component{
    static childContextTypes={
        store:PropTypes.object
    }

    getChildContext(){
        return {store:this.store}
    }
    constructor(props,context){
        super(props,context)
        this.store = this.props.store
    }
     render(){
         return this.props.children
     }
}