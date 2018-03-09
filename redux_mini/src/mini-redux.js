export function createStore(reduxer,enhancer){
    if(enhancer){
        return enhancer(createStore)(reduxer)
    }
    let currentState={}
    let currentLiteners = []
    const getState = () =>{return currentState}
    //设置监听函数
    const subscribe = (listener)=>{
        currentLiteners.push(listener)
    }
    //store.dispatch()是 View 发出 Action 的唯一方法。
    const dispatch = (action)=>{
        currentState = reduxer(currentState,action)
        //每次改动，都要触发监听的currentLiteners里的每个注册过的函数
        currentLiteners.forEach(v=>v())
        return action
    }
    dispatch({type:'@zhigang/mini-redux'})
    return {getState,subscribe,dispatch}
}
export function applyMiddleware(...middlewares){}
// addGun(参数)
// dispatch(addGun(参数))
//把creator(addGun)和dispatch（dispatch()是 View 发出 Action 的唯一方法）关联起来
const bindActionCreator = (creator,dispatch)=>{
    return (...args) => dispatch(creator(...args))
}
export function bindActionCreators(creators,dispatch){
    let bound = {}
    Object.keys(creators).forEach(v=>{
        let creator = creators[v]
        bound[v] = bindActionCreator(creator,dispatch)
        
    })
    return bound
}


