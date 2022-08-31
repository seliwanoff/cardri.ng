
import axios from 'axios'
export default {
    namespaced:true,
    state:{
        token:null,
        user:null,
        
    },
    mutations:{

    },
    actions:{
        async HandleLogin(_,credentials) {
        const response = await axios.post(`${process.env.VUE_APP_BASE_URL}api/auth/login`,credentials);
        console.log(response)

        },

    },
   
}