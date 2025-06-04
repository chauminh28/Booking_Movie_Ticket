package org.project.bookingmovieticket.service;

import org.project.bookingmovieticket.dto.request.schedule.ScheduleCreateRequest;
import org.project.bookingmovieticket.dto.request.schedule.ScheduleResponse;
import org.project.bookingmovieticket.dto.request.schedule.ScheduleUpdateRequest;
import org.project.bookingmovieticket.dto.request.showtime.ShowtimeResponse;
import org.project.bookingmovieticket.entity.Schedule;
import org.project.bookingmovieticket.entity.ScheduleDetail;
import org.project.bookingmovieticket.entity.ShowTime;
import org.project.bookingmovieticket.repository.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ScheduleService {
    private final ShowtimeRepository showtimeRepository;
    private final ScheduleDetailRepository scheduleDetailRepository;
    private final ScheduleRepository scheduleRepository;
    private final MovieRepository movieRepository;
    private final RoomRepository roomRepository;

    public ScheduleService(ShowtimeRepository showtimeRepository, ScheduleDetailRepository scheduleDetailRepository, ScheduleRepository scheduleRepository, MovieRepository movieRepository, RoomRepository roomRepository) {
        this.scheduleDetailRepository = scheduleDetailRepository;
        this.scheduleRepository = scheduleRepository;
        this.showtimeRepository = showtimeRepository;
        this.movieRepository = movieRepository;
        this.roomRepository = roomRepository;
    }

    public List<ShowtimeResponse> getAllShowtimes() {
        return showtimeRepository.findAll().stream().map(showTime -> {
            ShowtimeResponse showtimeResponse = new ShowtimeResponse();
            showtimeResponse.setId(showTime.getId());
            showtimeResponse.setTime(showTime.getTime());
            return showtimeResponse;
        }).collect(Collectors.toList());
    }

    public Page<ScheduleResponse> getAllSchedules(String searchValue, Pageable pageable) {
        Page<Schedule> schedules;
        if (searchValue == null || searchValue.isEmpty()) {
            schedules = scheduleRepository.findAll(pageable);
        }
        else {
            schedules = scheduleRepository.findByMovie_movieNameContainingIgnoreCase(searchValue, pageable);
        }
        return schedules.map(
                schedule -> {
                    ScheduleResponse scheduleResponse = new ScheduleResponse();
                    scheduleResponse.setId(schedule.getId());
                    scheduleResponse.setMovieId(schedule.getMovie().getId());
                    scheduleResponse.setMovieName(schedule.getMovie().getMovieName());
                    scheduleResponse.setRoomId(schedule.getRoom().getId());
                    scheduleResponse.setRoomName(schedule.getRoom().getRoomName());
                    scheduleResponse.setStatus(schedule.isStatus());
                    scheduleResponse.setScheduleDate(schedule.getScheduleDate());
                    scheduleResponse.setShowtimes(schedule.getScheduleDetails().stream()
                            .map(detail -> detail.getShowTime().getTime().toString()).toList());
                    return scheduleResponse;
                }
        );
    }

    public ScheduleResponse getScheduleById(Long id) {
        Schedule schedule = scheduleRepository.findById(id).orElseThrow(() -> new RuntimeException("Schedule not found"));
        ScheduleResponse scheduleResponse = new ScheduleResponse();
        scheduleResponse.setId(id);
        scheduleResponse.setMovieId(schedule.getMovie().getId());
        scheduleResponse.setMovieName(schedule.getMovie().getMovieName());
        scheduleResponse.setRoomId(schedule.getRoom().getId());
        scheduleResponse.setRoomName(schedule.getRoom().getRoomName());
        scheduleResponse.setStatus(schedule.isStatus());
        scheduleResponse.setScheduleDate(schedule.getScheduleDate());
        scheduleResponse.setShowtimes(schedule.getScheduleDetails().stream()
                .map(detail -> detail.getShowTime().getTime().toString()).toList());
        return scheduleResponse;
    }

    public ScheduleResponse createSchedule(ScheduleCreateRequest request) {
        Schedule schedule = new Schedule();
        schedule.setMovie(movieRepository.findById(request.getMovieId()).orElseThrow(() -> new RuntimeException("Movie not found")));
        schedule.setRoom(roomRepository.findById(request.getRoomId()).orElseThrow(() -> new RuntimeException("Room not found")));
        schedule.setScheduleDate(request.getScheduleDate());
        schedule.setStatus(request.isStatus());
        schedule.setScheduleDetails(request.getShowtimes().stream()
                .map(showtimeId -> {
                    ScheduleDetail scheduleDetail = new ScheduleDetail();
                    ShowTime showTime = showtimeRepository.findById(showtimeId).orElseThrow(() -> new RuntimeException("Showtime not found"));
                    scheduleDetail.setSchedule(schedule);
                    scheduleDetail.setShowTime(showTime);
                    return scheduleDetail;
        })
                .collect(Collectors.toList()));
        scheduleRepository.save(schedule);
        ScheduleResponse scheduleResponse = new ScheduleResponse();
        scheduleResponse.setId(schedule.getId());
        scheduleResponse.setMovieId(schedule.getMovie().getId());
        scheduleResponse.setMovieName(schedule.getMovie().getMovieName());
        scheduleResponse.setRoomId(schedule.getRoom().getId());
        scheduleResponse.setRoomName(schedule.getRoom().getRoomName());
        scheduleResponse.setStatus(schedule.isStatus());
        scheduleResponse.setScheduleDate(schedule.getScheduleDate());
        scheduleResponse.setShowtimes(schedule.getScheduleDetails().stream()
                .map(detail -> detail.getShowTime().getTime().toString()).toList());
        return scheduleResponse;
    }

    public ScheduleResponse updateSchedule(Long id,ScheduleUpdateRequest request) {
        Schedule schedule = scheduleRepository.findById(id).orElseThrow(() -> new RuntimeException("Schedule not found"));
        schedule.setMovie(movieRepository.findById(request.getMovieId()).orElseThrow(() -> new RuntimeException("Movie not found")));
        schedule.setRoom(roomRepository.findById(request.getRoomId()).orElseThrow(() -> new RuntimeException("Room not found")));
        schedule.setScheduleDate(request.getScheduleDate());
        List<ScheduleDetail> oldScheduleDetails = schedule.getScheduleDetails();
        oldScheduleDetails.clear();
        List<ScheduleDetail> newScheduleDetails = request.getShowtimes().stream()
                .map(showtimeId -> {
                    ScheduleDetail scheduleDetail = new ScheduleDetail();
                    ShowTime showTime = showtimeRepository.findById(showtimeId).orElseThrow(() -> new RuntimeException("Showtime not found"));
                    scheduleDetail.setSchedule(schedule);
                    scheduleDetail.setShowTime(showTime);
                    return scheduleDetail;
                })
                .toList();
        oldScheduleDetails.addAll(newScheduleDetails);
        schedule.setScheduleDetails(oldScheduleDetails);
        scheduleRepository.save(schedule);
        ScheduleResponse scheduleResponse = new ScheduleResponse();
        scheduleResponse.setId(id);
        scheduleResponse.setMovieId(schedule.getMovie().getId());
        scheduleResponse.setMovieName(schedule.getMovie().getMovieName());
        scheduleResponse.setRoomId(schedule.getRoom().getId());
        scheduleResponse.setRoomName(schedule.getRoom().getRoomName());
        scheduleResponse.setStatus(schedule.isStatus());
        scheduleResponse.setScheduleDate(schedule.getScheduleDate());
        scheduleResponse.setShowtimes(schedule.getScheduleDetails().stream()
                .map(detail -> detail.getShowTime().getTime().toString()).toList());
        return scheduleResponse;
    }

    public void deleteSchedule(Long id) {
        scheduleRepository.deleteById(id);
    }
}
