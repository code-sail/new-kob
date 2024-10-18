package com.kob.backend.pojo;


import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // 帮助我们自动实现getter、tostring函数等
@NoArgsConstructor //实现无参构造
@AllArgsConstructor //实现有参构造
public class User {
    @TableId(type = IdType.AUTO) //自增注解（是mybatis plus 里的）
    private Integer id;

    private String username;

    private String password;

    private int rating;

    private String photo;

}
