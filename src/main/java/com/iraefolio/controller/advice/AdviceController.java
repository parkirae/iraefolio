package com.iraefolio.controller.advice;

import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@Log4j2
@RestControllerAdvice
public class AdviceController {

    @ExceptionHandler(BindException.class)
    @ResponseStatus(HttpStatus.EXPECTATION_FAILED)
    public ResponseEntity<Map<String, String>> BindException(BindException e) {

        log.error(e);

        Map<String, String> errorMap = new HashMap<>();

        if(e.hasErrors()){

            BindingResult bindingResult = e.getBindingResult();


            bindingResult.getFieldErrors().forEach(fieldError -> {
                errorMap.put(fieldError.getField(), fieldError.getCode());
            });
        }

        return ResponseEntity.badRequest().body(errorMap);
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    @ResponseStatus(HttpStatus.EXPECTATION_FAILED)
    public ResponseEntity<String> UsernameNotFoundException(UsernameNotFoundException e) {

        log.error("UsernameNotFoundException 발생");
        return new ResponseEntity<>("UsernameNotFoundException 발생: " + e.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
    public ResponseEntity<String> HttpMediaTypeNotSupportedException(HttpMediaTypeNotSupportedException e) {

        log.error("클라이언트가 지원하지 않는 미디어 타입으로 요청을 보내서 에러 발생");
        return new ResponseEntity<>("HttpMediaTypeNotSupportedException 발생: " + e.getMessage(), HttpStatus.UNSUPPORTED_MEDIA_TYPE);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> Exception(Exception e) {

        log.error("예외 처리 되지 않은 Exception 발생");
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }
}
