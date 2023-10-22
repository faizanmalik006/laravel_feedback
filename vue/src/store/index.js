import {createStore} from "vuex";
import axiosClient from "../axios";

const tmpFeedbacks = [
    {
        id : '1',
        title : 'Test 1',
        description : 'fnjnfjcndvkfnjnfjcndvkfnjnfjcndvk fnjnfjcndvk fnjnfjcndvk fnjnfjcndvk fnjnfjcndvk fnjnfjcndvkfnjnfjcndvkfnjnfjcndvkfnjnfjcndvk fnjnfjcndvkfnjnfjcndvk fnjnfjcndvkfnjnfjcndvk fnjnfjcndvkfnjnfjcndvk fnjnfjcndvkfnjnfjcndvk fnjnfjcndvkfnjnfjcndvk ',
        category : 'bugReport',
        votes : 0,
        comments: [
            {
                id : '1',
                feedback_id : '1',
                user_id : '2',
                username : 'Faizan',
                text : 'dfjdbfsjdjvndjvndjkn'
            },
            {
                id : '2',
                feedback_id : '1',
                user_id : '3',
                username : 'Ali',
                text : 'gblmdkfndjfebfcxckck'
            },
        ]
    },
    {
        id : '2',
        title : 'Test 2',
        description : 'dkngdjscns',
        category : 'featureRequest',
        votes : 25,
        comments: [
            {
                id : '3',
                feedback_id : '2',
                user_id : '2',
                username : 'Faizan',
                text : 'dfjdbfsjdjvndjvndjkn'
            },
            {
                id : '4',
                feedback_id : '2',
                user_id : '3',
                username : 'Ali',
                text : 'gblmdkfndjfebfcxckck'
            },
        ]
    },
];

const store = createStore({
    state : {
        user : {
            data: {},
            token: sessionStorage.getItem('TOKEN')
        },
        feedbacks : [...tmpFeedbacks]
    },
    getters : {},
    actions : {
        saveFeedback({ commit }, feedback){
            let response = axiosClient.post('/feedback/create',feedback).then((res)=>{
                commit('saveFeedback',res.data.feedback);
                return res;
            })
            return response;
        },
        register({ commit },user)
        {
            return axiosClient.post('/register',user)
            .then(({ data }) =>{
                commit('setUser',data);
                return data;
            })
        },
        login({ commit },user)
        {
            return axiosClient.post('/login',user)
            .then(({ data }) =>{
                commit('setUser',data);
                return data;
            })
        },
        logout({ commit })
        {
            return axiosClient.post('/logout')
            .then((response) => {
                commit('logout');
                return response;
            })
        }
    },
    mutations : {
        saveFeedback : (state,feedback) => {
            state.feedbacks = [...state.feedbacks, feedback]
        },
        logout: (state) => {
            state.user.data = {};
            state.user.token = null;
            sessionStorage.removeItem('TOKEN');
        },

        setUser : (state, userData) => {
            state.user.token = userData.token;
            state.user.data = userData.user;
            sessionStorage.setItem('TOKEN',userData.token);
        }
    },
    modules : {}
})

export default store;