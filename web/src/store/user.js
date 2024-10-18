//store里存的是全局信息
import $ from "jquery"

export default {
    state: {
        id: "",
        username: "",
        photo: "",
        token: "",
        is_login: false,
        pulling_info: true, // 是否正在拉取信息
    },
    getters: {
    },
    mutations: { // 调用mutations里的函数要用commit
        updateUser(state, user) {
            state.id = user.id;
            state.username = user.username;
            state.photo = user.photo;
            state.is_login = user.is_login;
        },
        updateToken(state, token) {
            state.token = token;
        },
        logout(state) {
            state.id = "";
            state.usernaem = "";
            state.photo = "";
            state.token = "";
            state.is_login = false;
        },
        updatePullingInfo(state,pulling_info) {
            state.pulling_info = pulling_info;
        }
    },
    actions: {
        login(context, data) {
            $.ajax({
                url: "http://localhost:3030/user/account/token/",
                type: "post",
                data: {
                    username: data.username,
                    password: data.password,
                },
                success(resp) {
                    if (resp.error_message === "success") {
                        localStorage.setItem("jwt_token", resp.token);
                        context.commit("updateToken", resp.token);
                        data.success(resp);
                    } else {
                        data.error(resp);
                    }
                },
                error(resp) {
                    data.error(resp);
                }
            });

        },

        getinfo(context, data) {
            $.ajax({
                url: "http://localhost:3030/user/account/info/",
                type: "get",
                headers: {
                    Authorization: "Bearer " + context.state.token,
                },
                success(resp){
                    if(resp.error_message == "success") {
                        context.commit("updateUser", {
                            ...resp, //把user里的信息解构出来 就是把user里的key value对里的信息放到当前的对象里面
                            is_login: true,
                        });
                        data.success(resp);
                    } else {
                        data.error(resp);
                    }
                }, 
                error(resp){
                    data.error(resp);
                },
            })
        },

        logout(context) {
            localStorage.removeItem("jwt_token");
            context.commit("logout");
        }
    },
    modules: {
    }
}