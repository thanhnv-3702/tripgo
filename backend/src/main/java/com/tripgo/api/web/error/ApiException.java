package com.tripgo.api.web.error;

public class ApiException extends RuntimeException {

    private final String code;
    private final int status;

    public ApiException(String code, String message, int status) {
        super(message);
        this.code = code;
        this.status = status;
    }

    public String getCode() {
        return code;
    }

    public int getStatus() {
        return status;
    }

    public static ApiException notFound(String message) {
        return new ApiException("NOT_FOUND", message, 404);
    }
}
