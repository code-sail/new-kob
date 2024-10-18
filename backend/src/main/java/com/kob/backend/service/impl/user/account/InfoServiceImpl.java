package com.kob.backend.service.impl.user.account;


import com.kob.backend.pojo.User;
import com.kob.backend.service.impl.utils.UserDetailsImpl;
import com.kob.backend.service.user.account.InfoService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Service // 如果不加这个注解，就不能将他注入到spring里，就没法用@Autowired注解自动加入了
public class InfoServiceImpl implements InfoService {
    @Override
    public Map<String, String> getinfo() {
        //如果授权成功，就从上下文当中把信息提取出来
        //就是一大坨api，记就行了
        UsernamePasswordAuthenticationToken authenticationToken = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();


        UserDetailsImpl loginUser = (UserDetailsImpl) authenticationToken.getPrincipal();
        User user = loginUser.getUser();

        Map<String, String> map = new HashMap<>();
        map.put("error_message", "success");
        map.put("id", user.getId().toString());
        map.put("username", user.getUsername());
        map.put("photo", user.getPhoto());
        return map;



    }
}
