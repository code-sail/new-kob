package com.kob.backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootTest
class BackendApplicationTests {

    @Test
    void contextLoads() {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        System.out.println(passwordEncoder.encode("pjmf"));
        System.out.println(passwordEncoder.encode("pjmf"));

        System.out.println(passwordEncoder.matches("pjmf", "$2a$10$zlQJSLGNhsx6TsIL1vEpcOe.XUdhspqQwvL0E44kb.ieA6g09AceC"));



    }

}
