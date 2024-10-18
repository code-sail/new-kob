package com.kob.backend.service.impl.user.account;

import com.kob.backend.pojo.User;
import com.kob.backend.service.impl.utils.UserDetailsImpl;
import com.kob.backend.service.user.account.LoginService;
import com.kob.backend.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.net.Authenticator;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    private AuthenticationManager authenticationManager; //用于验证用户是否已经登录的api

    @Override
    public Map<String, String> getToken(String username, String password) {
        //将用户名和密码封装一下，这样就不会存明文
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(username, password);

        Authentication authenticate = authenticationManager.authenticate(usernamePasswordAuthenticationToken);// 如果登录失败，会自动处理

        //此时已经登录成功
        UserDetailsImpl loginuser = (UserDetailsImpl)authenticate.getPrincipal();
        User user = loginuser.getUser();

        //已经取出了用户，此时要把用户信息封装成一个jwt token
        String jwt = JwtUtil.createJWT(user.getId().toString());

        // 成功之后，定义一个map作为返回结果
        //这里信息的存放格式要跟自己的前端对应即可
        Map<String,String> map = new HashMap<>();
        map.put("error_message", "success"); //因为在上面已经有过登录失败的处理，所以到这里一定是登录成功了，所以这里只有success
        map.put("token", jwt);


        return map;
    }
}
