using API.Models;
using API.Services;
using API2.Models.Dto.Staff;
using API2.Models.Validation.Staff;
using FluentValidation;
using FluentValidation.Results;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Helpers;
using System.Web.Http;
using System.Web.Http.Cors;

namespace API.Controllers
{
    //[EnableCors(origins: "*", headers: "*", methods: "*")]
    public class StaffController : ApiController
    {
        private readonly IStaffService _staffService;
        public StaffController()
        {
            _staffService = new StaffService();
        }

        //[HttpGet]
        //public HttpResponseMessage Staff()
        //{
        //    return new HttpResponseMessage()
        //    {
        //        Content = new StringContent(JsonConvert.SerializeObject(_staffService.GetAllStaff())),
        //        StatusCode = HttpStatusCode.OK
        //    };
        //}

        [HttpGet]

        public IHttpActionResult Staff()
        {
            var staffs = _staffService.GetAllStaff();
            return Ok(staffs);
        }

        [HttpPost]
        public IHttpActionResult Staff([FromBody] Staff createStaffDto)
        {
            Staff staffValidation = new Staff();
            //ValidationResult result = staffValidation.Validate(createStaffDto);
            if (_staffService.CreateStaff(createStaffDto) > 0)
            {
                return Ok("Succes");
            }
            else return BadRequest();

        }

        //[HttpPost]   
        
        //public IHttpActionResult Staff([FromBody]CreateStaffDto createStaffDto)
        //{
        //    CreateStaffDtoValidation staffValidation = new CreateStaffDtoValidation();
        //    ValidationResult result = staffValidation.Validate(createStaffDto);
        //    if (_staffService.CreateStaff(createStaffDto) > 0)
        //    {
        //        return Ok(result);
        //    }
        //    else return BadRequest();

        //}
        [HttpGet]

        public IHttpActionResult Staff(int Id)
        {
            if(Id<= 0)
            {
                return BadRequest();
            }
            var staff = _staffService.GetStaff(Id);
            if(staff == null)
            {
                return NotFound();
            }
            else return Ok(staff);

        }
        [HttpDelete]

        public IHttpActionResult DeleteStaff(int id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }
           
            if (!_staffService.DeleteStaff(id))
            {
                return BadRequest();
            }
            else return Ok();

        }
        [HttpPut]

        public IHttpActionResult Staff(int id,Staff detailStaffDto)
        {
            if (id <= 0)
            {
                return BadRequest();
            }
            var rs = _staffService.EditStaff(id,detailStaffDto);
            if (!rs)
            {
                return BadRequest();
            }
            else return Ok(rs);

        }
    }
}
