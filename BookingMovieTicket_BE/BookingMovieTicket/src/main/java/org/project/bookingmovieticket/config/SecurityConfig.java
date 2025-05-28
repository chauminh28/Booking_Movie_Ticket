//package org.project.bookingmovieticket.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpMethod;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.CorsConfigurationSource;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//
//import java.util.List;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig {
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
////        http
////                .cors()
////                .and()
////                .authorizeHttpRequests(request ->
////                request.requestMatchers(HttpMethod.POST, "/users").permitAll()
////                        .requestMatchers(HttpMethod.POST, "/auth/token", "/auth/login").permitAll()
////                        .requestMatchers("/genres/**").permitAll()
////                        .requestMatchers("/movies/**").permitAll()
////
////                        .anyRequest().authenticated());
//        http
//                .cors().and()
//                .csrf(AbstractHttpConfigurer::disable)
//                .authorizeHttpRequests(req -> req.anyRequest().permitAll());
//        http.csrf(AbstractHttpConfigurer::disable);
//
//        return http.build();
//    }
//
//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
//        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//        configuration.setAllowedHeaders(List.of("*"));
//        configuration.setAllowCredentials(true);
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }
//}
