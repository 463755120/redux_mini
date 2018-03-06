export function createStore(reduxer){
    let currentState={}
    let currentLiteners = []
    const getState = () =>{return currentState}
    const subscribe = (listener)=>{
        currentLiteners.push(listener)
    }
    const dispatch = (action)=>{
        currentState = reduxer(currentState,action)
        //每次改动，都要触发监听的currentLiteners里的每个注册过的函数
        currentLiteners.forEach(v=>v())
        return action
    }
    dispatch({type:'@zhigang/mini-redux'})
    return {getState,subscribe,dispatch}
}