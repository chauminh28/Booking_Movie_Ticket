package org.project.bookingmovieticket.service;

import org.project.bookingmovieticket.dto.request.product.ProductCreateRequest;
import org.project.bookingmovieticket.dto.request.product.ProductResponse;
import org.project.bookingmovieticket.dto.request.product.ProductUpdateRequest;
import org.project.bookingmovieticket.repository.ProductRepository;
import org.project.bookingmovieticket.repository.ServiceTypeRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.project.bookingmovieticket.entity.Product;

@Service
public class ProductService {
    private ProductRepository productRepository;
    private ServiceTypeRepository serviceTypeRepository;

    public ProductService(ProductRepository productRepository, ServiceTypeRepository serviceTypeRepository) {
        this.productRepository = productRepository;
        this.serviceTypeRepository = serviceTypeRepository;
    }

    public Product createProduct(ProductCreateRequest request) {
        return productRepository.save(Product.builder()
                        .serviceName(request.getServiceName())
                        .price(request.getPrice())
                        .image(request.getImage())
                        .serviceType(serviceTypeRepository.findById(request.getServiceTypeId())
                                .orElseThrow(() -> new RuntimeException("Service type not found")))
                        .build());
    }

    public Page<ProductResponse> getProducts(String searchValue, Pageable pageable) {
        Page<Product> page;

        if(searchValue == null || searchValue.isEmpty()) {
            page = productRepository.findAll(pageable);
        }
        else {
            page = productRepository.findByServiceNameContainingIgnoreCase(searchValue, pageable);
        }

        return page.map(product -> {
            return ProductResponse.builder()
                    .id(product.getId())
                    .serviceName(product.getServiceName())
                    .price(product.getPrice())
                    .image(product.getImage())
                    .serviceTypeId(product.getServiceType().getId())
                    .build();
        });
    }

    public ProductResponse getProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        return ProductResponse.builder()
                .id(product.getId())
                .serviceName(product.getServiceName())
                .price(product.getPrice())
                .image(product.getImage())
                .serviceTypeId(product.getServiceType().getId())
                .build();
    }

    public Product updateProduct(Long id, ProductUpdateRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setServiceName(request.getServiceName());
        product.setPrice(request.getPrice());
        product.setImage(request.getImage());
        product.setServiceType(serviceTypeRepository.findById(request.getServiceTypeId())
                .orElseThrow(() -> new RuntimeException("Service type not found")));

        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
