using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace API.Models.Dto.Task
{
    public class TaskChart
    {
        public int id;
        public string start_date;
        public string text;
        public string progress;
        public string duration;
        public int parent;
    }
}