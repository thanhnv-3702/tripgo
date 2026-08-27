package com.tripgo.api.web.mapper;

import com.tripgo.api.domain.entity.User;
import com.tripgo.api.domain.enums.UserRole;
import com.tripgo.api.web.dto.AuthDtos;

public final class UserMapper {

    private UserMapper() {
    }

    public static AuthDtos.UserResponse toResponse(User user) {
        return new AuthDtos.UserResponse(
            user.getId().toString(),
            user.getName(),
            user.getEmail(),
            roleSlug(user.getRole()),
            user.getAvatar()
        );
    }

    public static String roleSlug(UserRole role) {
        return role.name().toLowerCase();
    }
}
