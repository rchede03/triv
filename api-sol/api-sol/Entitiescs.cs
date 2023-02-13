namespace api_sol
{
    public class Entities
    {
        public List<string> Columns { get; set; }
        public List<List<string>> Values { get; set; }
        public Entities()
        {
            Columns = new List<string>();
            Values = new List<List<string>>();
        }
    }
}
