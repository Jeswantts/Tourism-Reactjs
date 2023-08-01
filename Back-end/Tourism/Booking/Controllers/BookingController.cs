﻿using Booking.Interface;
using Booking.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace Booking.Controllers
{   
    [Authorize (Roles = "user")]
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IBooking service;
        public BookingController(IBooking _service)
        {
            service = _service;
        }
        [HttpGet("{id}")]
        public async Task<Passenger> GetById(int id)
        {
            return await service.GetById(id);
        }

        [HttpPost]
        public async Task<IActionResult> Add(Passenger passenger)
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
    }
}