package org.project.bookingmovieticket.controller;

import jakarta.validation.Valid;
import org.project.bookingmovieticket.dto.request.product.ProductCreateRequest;
import org.project.bookingmovieticket.dto.request.product.ProductResponse;
import org.project.bookingmovieticket.dto.request.product.ProductUpdateRequest;
import org.project.bookingmovieticket.entity.Product;
import org.project.bookingmovieticket.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("products")
public class ProductController {
    ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    public Product createProduct(@RequestBody @Valid ProductCreateRequest request) {
        return productService.createProduct(request);
    }

    @GetMapping
    public Page<ProductResponse> getProducts(@RequestParam(value = "search", required = false) String searchValue, Pageable pageable) {
        return productService.getProducts(searchValue, pageable);
    }

    @GetMapping("/{productId}")
    public ProductResponse getProduct(@PathVariable("productId") Long productId) {
        return productService.getProduct(productId);
    }

    @PutMapping("/{productId}")
    public Product updateProduct(@PathVariable("productId") Long id, @RequestBody @Valid ProductUpdateRequest request) {
        return productService.updateProduct(id, request);
    }

    @DeleteMapping("/{productId}")
    public String deleteProduct(@PathVariable("productId") Long id) {
        productService.deleteProduct(id);

        return "Product has been deleted";
    }
}
