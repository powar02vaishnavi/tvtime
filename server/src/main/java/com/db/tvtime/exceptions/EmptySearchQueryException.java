package com.db.tvtime.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.FAILED_DEPENDENCY)
public class EmptySearchQueryException extends RuntimeException {
    public EmptySearchQueryException() {
        super("Cannot Search an empty String.");
    }
}