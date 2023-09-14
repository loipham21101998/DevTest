using API2.Models.Dto.Staff;
using API2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Security.Cryptography.X509Certificates;
using API2.Models.Dto.Task;
using System.Web.Http;
using API.Models;

namespace API.Services
{
    public interface ITaskService
    {
        List<Task> GetAllTask();
        dynamic GetAllTask1();
        Task GetTask(int id);
        int CreateTask(Task createTaskDto);
        bool EditTask(int id, Task detailTaskDto);
        bool DeleteTask(int id);
    }
    public class TaskService : ITaskService
    {
        private readonly StaffManagementEntities _db;
        public TaskService()
        {
            _db = new StaffManagementEntities();
        }

        public int CreateTask(Task createTaskDto)
        {
            //var task = AutoMapper.Mapper.Map<Task>(createTaskDto);
            _db.Tasks.Add(createTaskDto);
            if (_db.SaveChanges() > 0)
            {
                return 1;
            }
            else
            {
                return 0;
            }
        }
        public bool DeleteTask(int Id)
        {
            var task = _db.Tasks.FirstOrDefault(x => x.Id == Id);
            if (task == null) throw new HttpResponseException(System.Net.HttpStatusCode.NotFound);
            _db.Tasks.Remove(task);
            return _db.SaveChanges() > 0;
        }

        public bool EditTask(int id, Task detailTaskDto)
        {
            var task = _db.Tasks.FirstOrDefault(x => x.Id == id);
            if (task == null)
            {
                return false;
            }
            else
            {
                task.Label = detailTaskDto.Label;
                task.StartDate = detailTaskDto.StartDate;
                task.EndDate = detailTaskDto.EndDate; 
                task.Duration = detailTaskDto.Duration;
                task.IsUnscheduled = detailTaskDto.IsUnscheduled;
                task.Name = detailTaskDto.Name;
                task.ParentId = detailTaskDto.ParentId;
                task.Type = detailTaskDto.Type;
                task.Progress = detailTaskDto.Progress;
                _db.Entry(task).State = System.Data.Entity.EntityState.Modified;
                //AutoMapper.Mapper.Map(detailTaskDto, task);
            }
            return _db.SaveChanges() > 0;
        }

        public List<Task> GetAllTask()
        {
             return  _db.Tasks.ToList();
        }

        public dynamic GetAllTask1()
        {
            return _db.Tasks.Select(x=> new
            {
                id = x.Id,
                text = x.Name,
                start_date = x.StartDate,
                duration = x.Duration,
                progress = x.Progress.Trim(),
                open = x.IsUnscheduled,
                parent = x.ParentId
            }).ToList();
        }

        public Task GetTask(int id)
        {
            var task = _db.Tasks.FirstOrDefault(x => x.Id == id);
            return task;
        }
    }

}
