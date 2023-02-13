using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Serialization;
using System.Text.Json;
using Newtonsoft.Json;
using System;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;

namespace api_sol.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        [HttpGet(Name = "GetWeatherForecast")]
        public IEnumerable<Entities> Get(int limit=50, int offset=0)
        {
            var list = GetDataFromDB(limit, offset);
            return ConvertToUIObject(list);
        }

        private List<Entities> ConvertToUIObject(IEnumerable<DBEntitiy> list)
        {
            var result = new List<Entities>();

            return result;
        }

        private IEnumerable<DBEntitiy> GetDataFromDB(int limit, int offset)
        {
            var dataForRef = Class.data;
            return  JsonConvert.DeserializeObject<List<DBEntitiy>>(dataForRef).Skip(offset).Take(limit);
            

        }
    }
}