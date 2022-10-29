package com.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/usuario")
public class Hello {
	@GetMapping("/criar")
	public ResponseEntity<String> criar(){
			return ResponseEntity.ok("usuario criado");
		}
	@GetMapping("/buscar")
	public ResponseEntity<String> buscar(){
			return ResponseEntity.ok("usuario encontrado");
		}
	@GetMapping("/pai/buscar")
	public ResponseEntity<String> busscarpai(){
			return ResponseEntity.ok("pai encontrado, sorte grande viu");
		}
		
}
