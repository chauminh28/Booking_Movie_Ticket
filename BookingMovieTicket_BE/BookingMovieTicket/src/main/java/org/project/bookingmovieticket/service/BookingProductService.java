package org.project.bookingmovieticket.service;

import org.project.bookingmovieticket.dto.request.bookingproduct.BookingProductCreateRequest;
import org.project.bookingmovieticket.entity.Booking;
import org.project.bookingmovieticket.entity.BookingService;
import org.project.bookingmovieticket.entity.Product;
import org.project.bookingmovieticket.repository.BookingProductRepository;
import org.project.bookingmovieticket.repository.BookingRepository;
import org.project.bookingmovieticket.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BookingProductService {
    BookingProductRepository bookingProductRepository;
    BookingRepository bookingRepository;
    ProductRepository productRepository;

    public BookingProductService(BookingProductRepository bookingProductRepository, BookingRepository bookingRepository, ProductRepository productRepository) {
        this.bookingProductRepository = bookingProductRepository;
        this.bookingRepository = bookingRepository;
        this.productRepository = productRepository;
    }

    public BookingService createBookingProduct(Long bookingId, BookingProductCreateRequest request) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found with ID: " + bookingId));

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + request.getProductId()));

        Optional<BookingService> existingServiceOpt =
                bookingProductRepository.findByBookingIdAndServiceId(bookingId, product.getId());

        if (existingServiceOpt.isPresent()) {
            BookingService existingService = existingServiceOpt.get();
            existingService.setQuantity(existingService.getQuantity() + request.getQuantity());
            return bookingProductRepository.save(existingService);
        }

        BookingService bookingService = new BookingService();
        bookingService.setBooking(booking);
        bookingService.setService(product);
        bookingService.setQuantity(request.getQuantity());

        return bookingProductRepository.save(bookingService);
    }
}
