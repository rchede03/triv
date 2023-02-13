using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Reflection;

namespace api_sol2.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        [HttpGet(Name = "GetWeatherForecast")]
        public Entities Get(int limit = 50, int offset = 0)
        {
            var list = GetDataFromDB(limit, offset);
            var finalList = ConvertToUIObject(list);
            return finalList;
        }

        private Entities ConvertToUIObject(IEnumerable<DBEntitiy> list)
        {
            var result = new Entities();
            var cols = new List<string>();
            var temp = list.ToList();
            var rows = new List<List<string>>();
            for (var counter = 0;counter< temp.Count;counter++)
            {
                var row = new List<string>();
                Type myType = temp[counter].GetType();
                IList<PropertyInfo> props = new List<PropertyInfo>(myType.GetProperties());

                foreach (PropertyInfo prop in props)
                {
                    if(counter == 0)
                    {
                        cols.Add(prop.Name);
                    }
                    var tempVal = prop.GetValue(temp[counter], null);
                    if (tempVal != null)
                    {
                        row.Add(tempVal.ToString());
                    }
                    else { row.Add(null); }

                }
                rows.Add(row);
            }
            result.Columns = cols;
            result.Values = rows;
            return result;
        }

        private IEnumerable<DBEntitiy> GetDataFromDB(int limit, int offset)
        {
            var dataForRef = Class.data;
            
            var data =  JsonConvert.DeserializeObject<List<DBEntitiy>>(dataForRef).ToList();
            data.AddRange(data);
            data.AddRange(data);
            data.AddRange(data);
            data.AddRange(data);
            data.AddRange(data);
            data.AddRange(data);
            data.AddRange(data);
            data.AddRange(data);
            data.AddRange(data);
            return data.Skip(offset).Take(limit);
        }
    }
}