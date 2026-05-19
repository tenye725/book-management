package com.example.bookmanagementapi.bookapi.config; // 본인의 패키지명 확인!

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class BookConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // /api/ 로 시작하는 모든 주소에 대해
                .allowedOrigins("http://localhost:3000") // 프론트엔드(Next.js) 주소의 접근을 허용합니다.
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 허용할 HTTP 메서드들
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
