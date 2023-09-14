using API.Models;
using API.Services;
using API2.Models.Dto.Task;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;


namespace API.Controllers
{
    public class TaskController : ApiController
    {
        private readonly ITaskService _taskService;
        public TaskController()
        {
            _taskService = new TaskService();
        }


        // GET: Task
        [HttpGet]
        public IHttpActionResult Task()
        {
            var rs = _taskService.GetAllTask();
            return Ok(rs);

        }

        [HttpGet]
        public IHttpActionResult Task1()
        {
            var rs = _taskService.GetAllTask1();
            return Ok(rs);
        }

        [HttpGet]
        public IHttpActionResult Task(int id)
        {
            var rs = _taskService.GetTask(id);
            if(rs == null)
            {
                return NotFound();
            }
            return Ok(rs);
        }

        [HttpPost]
        public IHttpActionResult Task(Task createTaskDto)
        {
            var rs = _taskService.CreateTask(createTaskDto);
            if(rs > 0)
            {
                return Ok(rs);
            }
            return BadRequest();
        }

        [HttpPut]
        public IHttpActionResult Task(int id,Task detailTaskDto)
        {
            var rs = _taskService.EditTask(id,detailTaskDto);
            if (rs)
            {
                return Ok(rs);
            }
            return BadRequest();
        }
        [HttpDelete]
        public IHttpActionResult DeleteTask(int id)
        {
            var rs = _taskService.DeleteTask(id);
            if (rs)
            {
                return Ok(rs);
            }
            return BadRequest();
        }
    }
}