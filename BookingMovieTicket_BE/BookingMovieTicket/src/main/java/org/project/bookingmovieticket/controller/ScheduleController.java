package org.project.bookingmovieticket.controller;

import jakarta.validation.Valid;
import org.project.bookingmovieticket.dto.request.schedule.ScheduleCreateRequest;
import org.project.bookingmovieticket.dto.request.schedule.ScheduleResponse;
import org.project.bookingmovieticket.dto.request.schedule.ScheduleUpdateRequest;
import org.project.bookingmovieticket.dto.request.showtime.ShowtimeResponse;
import org.project.bookingmovieticket.entity.Schedule;
import org.project.bookingmovieticket.service.ScheduleService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/schedules")
public class ScheduleController {
    private ScheduleService scheduleService;

    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @PostMapping
    public ScheduleResponse createSchedule(@RequestBody @Valid ScheduleCreateRequest request) {
        return scheduleService.createSchedule(request);
    }

    @GetMapping
    public Page<ScheduleResponse> getSchedules(@RequestParam(value = "search", required = false) String searchValue, Pageable pageable){
        return scheduleService.getAllSchedules(searchValue, pageable);
    }

    @GetMapping("/{sheduleId}")
    public ScheduleResponse getSchedule(@PathVariable Long sheduleId){
        return scheduleService.getScheduleById(sheduleId);
    }

    @GetMapping("/showtimes")
    public List<ShowtimeResponse> getShowTimes(){
        return scheduleService.getAllShowtimes();
    }

    @GetMapping("/showtimes/{showtimeId}")
    public ShowtimeResponse getShowTime(@PathVariable("showtimeId") Long id) {
        return scheduleService.getShowtimeById(id);
    }

    @PutMapping("/{scheduleId}")
    public ScheduleResponse updateSchedule(@PathVariable Long scheduleId, @RequestBody @Valid ScheduleUpdateRequest request) {
        return scheduleService.updateSchedule(scheduleId, request);
    }

    @DeleteMapping("/{scheduleId}")
    public String deleteSchedule(@PathVariable Long scheduleId){
        scheduleService.deleteSchedule(scheduleId);
        return "Schedule deleted";
    }
}
