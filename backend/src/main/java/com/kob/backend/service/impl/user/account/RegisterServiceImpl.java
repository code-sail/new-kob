package com.kob.backend.service.impl.user.account;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.kob.backend.mapper.UserMapper;
import com.kob.backend.pojo.User;
import com.kob.backend.service.user.account.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RegisterServiceImpl implements RegisterService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;



    @Override
    public Map<String, String> register(String username, String password, String confirmedPassword) {
        //先定义返回信息的格式
        Map<String, String> map = new HashMap<>();

        username = username.trim();
        password = password.trim();
        if (username == null) {
            map.put("error_message", "用户名不能为空");
            return map;
        }


        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username", username);
        List<User> users = userMapper.selectList(queryWrapper);
        if(!users.isEmpty()){
            map.put("error_message", "用户名已存在");
            return map;
        }



        if (password == null ) {
            map.put("error_message", "密码不能为空");
            return map;
        }
        if(confirmedPassword == null) {
            map.put("error_message", "确认密码不能为空");
            return map;
        }




        if(username.length() == 0) {
            map.put("error_message", "用户名不能为空");
            return map;
        }

        //这里允许用户的密码有空格
        if(password.length() == 0 ||confirmedPassword.length() == 0) {
            map.put("error_message", "密码不能为空");
            return map;
        }

        if(username.length() >= 100) {
            map.put("error_message", "用户名长度过长");
            return map;
        }

        if(password.length() >= 100) {
            map.put("error_message", "密码长度过长");
            return  map;
        }

        if(!password.equals(confirmedPassword)) {
            map.put("error_message", "两次输入的密码不一致");
            return map;
        }




        //到这里用户就成功创建了一个账号
        //下一步是给密码加密
        String encodedPassword = passwordEncoder.encode(password);
        String photo = "https://cdn.acwing.com/media/user/profile/photo/225255_lg_5304f43837.jpg";

        //id不用传入，因为id是自增的
        User user = new User(null, username, encodedPassword,1000, "https://cdn.acwing.com/media/user/profile/photo/225255_lg_5304f43837.jpg");
        userMapper.insert(user);
        map.put("error_message", "success");
        return map;

    }
}
