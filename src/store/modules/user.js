import axios from "axios"

export default ({
    state:{
        user:null,
        token:null
    },
    getters:{
        authenticated(state){
            return state.token 
        },
        user(state){
            return state.user
        }
    },
    mutations:{
        SET_TOKEN(state,token){
            state.token = token
        },
        SET_USER(state,data){
            state.user = data
        }
    },
    actions:{
        LOGIN:({dispatch},payload)=>{
            return new Promise((resolve , reject)=>{
                axios.post(`${process.env.VUE_APP_BASE_URL}api/auth/login`,payload)
                .then(({data,status})=>{
                    if(status === 200){
                        resolve(true)
                    }
                dispatch('attempt',data.token)
               
                })
                .catch(error=>{
                    reject(error)
                })
                
            })
          
           
        },
        async attempt({commit,state},token){
            if(token){
                commit('SET_TOKEN',token)
            }
            if(!state.token){
                return
            }
            try{
                let response =await  axios.get(`${process.env.VUE_APP_BASE_URL}api/getdatils`)
                commit('SET_USER',response.data)
            }catch(e){
                console.log(e)
                commit('SET_USER',null)
                commit('SET_TOKEN',null)
            }
        },
        signOut({commit}){
            return axios.get(`${process.env.VUE_APP_BASE_URL}api/logout`).then(()=>{
                commit('SET_USER',null)
                commit('SET_TOKEN',null)
                
            })

        }
    },
    
})