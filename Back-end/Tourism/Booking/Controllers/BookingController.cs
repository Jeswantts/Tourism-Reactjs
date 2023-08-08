using Booking.Interface;
using Booking.Models;
using Booking.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Profile.Models.DTO;
using System.Net;

namespace Booking.Controllers
{   
    //[Authorize (Roles = "user")]
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IBookService service;
        public BookingController(IBookService _service)
        {
            service = _service;
        }
        [HttpGet("Passenger/{id}")]
        public async Task<Passenger> GetById(int id)
        {
            return await service.GetById(id);
        }

        [HttpPost("Passenger")]
        public async Task<IActionResult> Add(List<Passenger> passenger)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)).ToList();
                return new BadRequestObjectResult(errors);
            }

            try
            {
                var addedPassenger = await service.Post(passenger);
                return Ok(addedPassenger);
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message)
                {
                    StatusCode = (int)HttpStatusCode.InternalServerError
                };
            }
        }

        [HttpDelete("{id}")]
        public async Task<Passenger> DeleteById(int id)
        {
            return await service.DeleteById(id);
        }


        [HttpGet("Booking/{id}")]
        public async Task<Bookings> GetId(int id)
        {
            return await service.GetBookingsById(id);
        }

        [HttpPost("Booking")]
        public async Task<IActionResult> PostBooking(Bookings bookings)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)).ToList();
                return new BadRequestObjectResult(errors);
            }

            try
            {
                var postbooking = await service.PostBooking(bookings);
                return Ok(postbooking);
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message)
                {
                    StatusCode = (int)HttpStatusCode.InternalServerError
                };
            }
        }

        [HttpDelete("Booking/{id}")]
        public async Task<Bookings> Delete(int id)
        {
            return await service.DeleteBooking(id);
        }

        [HttpPost("Payment/Carddetail")]
        public async Task<IActionResult> Payment(Payment payment)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)).ToList();
                return new BadRequestObjectResult(errors);
            }

            try
            {
                var payments = await service.PostPayment(payment);
                return Ok(payments);
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message)
                {
                    StatusCode = (int)HttpStatusCode.InternalServerError
                };
            }
        }
        [HttpPut("Booking/Status/{id}")]
        public async Task<IActionResult> BookingStatus(int id, BookingStatus_DTO status_DTO)
        {
            try
            {
                BookingStatus_DTO activate = await service.ChangeStatus(id, status_DTO);
                return Ok(activate);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred during payment activation: {ex.Message}");
            }
        }
    }
}
