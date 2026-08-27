package com.tripgo.api.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tripgo.api.domain.entity.User;
import com.tripgo.api.domain.enums.UserRole;
import com.tripgo.api.repository.UserRepository;
import com.tripgo.api.security.AuthUserPrincipal;
import com.tripgo.api.security.JwtService;
import com.tripgo.api.web.dto.AuthDtos;
import com.tripgo.api.web.error.ApiException;
import com.tripgo.api.web.mapper.UserMapper;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
        UserRepository userRepository,
        PasswordEncoder passwordEncoder,
        JwtService jwtService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Transactional
    public AuthDtos.AuthResponse register(AuthDtos.RegisterRequest request) {
        String email = normalizeEmail(request.email());
        if (userRepository.existsByEmail(email)) {
            throw new ApiException("EMAIL_EXISTS", "Email đã được sử dụng", 409);
        }

        User user = new User();
        user.setName(request.name().trim());
        user.setEmail(email);
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.setRole(UserRole.USER);
        userRepository.save(user);
        return buildAuthResponse(user);
    }

    @Transactional(readOnly = true)
    public AuthDtos.AuthResponse login(AuthDtos.LoginRequest request) {
        User user = userRepository.findByEmail(normalizeEmail(request.email()))
            .orElseThrow(this::invalidCredentials);

        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw invalidCredentials();
        }
        return buildAuthResponse(user);
    }

    @Transactional(readOnly = true)
    public AuthDtos.UserResponse me(AuthUserPrincipal principal) {
        User user = userRepository.findById(principal.getId())
            .orElseThrow(() -> ApiException.notFound("Không tìm thấy user"));
        return UserMapper.toResponse(user);
    }

    private AuthDtos.AuthResponse buildAuthResponse(User user) {
        String token = jwtService.generateToken(user.getId(), user.getEmail());
        return new AuthDtos.AuthResponse(token, UserMapper.toResponse(user));
    }

    private ApiException invalidCredentials() {
        return new ApiException(
            "INVALID_CREDENTIALS",
            "Email hoặc mật khẩu không đúng",
            401
        );
    }

    private static String normalizeEmail(String email) {
        return email.trim().toLowerCase();
    }
}
