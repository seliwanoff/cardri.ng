import store from "../index"
import axios from 'axios'
store.subscribe((mutations)=>{
    switch(mutations.type){
        case "SET_TOKEN":
       
        if(mutations.payload){
            axios.defaults.headers.common['Authorization'] = `Bearer ${mutations.payload}`
            localStorage.setItem('token',mutations.payload)
        }else{
            axios.defaults.headers.common['Authorization'] = null
            localStorage.remove('token',mutations.payload)

        }

        break;
    }
})