using PracticeFlorisoft.Models;
using System.Collections.Generic;
using System.Web.Http;
using System.Linq;
using PracticeFlorisoft.Repository;

namespace PracticeFlorisoft.Controllers
{
    public class BouquetController : ApiController
    {
        private List<Bouquet> _products = new BouquetRepository().GetAllBouquets();

        [HttpGet]
        public List<Bouquet> All()
        {
            return _products;
        }

        [HttpGet]
        [Route("api/bouquet/likes")]
        public List<Bouquet> Likes()
        {
            return _products.OrderByDescending(x => x.AmountLikes).ToList();
        }

        [HttpGet]
        [Route("api/bouquet/viewed")]
        public List<Bouquet> Viewed()
        {
            return _products.OrderByDescending(x => x.AmountViews).ToList();
        }

        [HttpGet]
        [Route("api/bouquet/comments")]
        public List<Bouquet> comments()
        {
            return _products.OrderByDescending(x => x.AmountComments).ToList();
        }

        [HttpGet]
        [Route("api/bouquet/rateed")]
        public List<Bouquet> Rated()
        {
            return _products.OrderByDescending(x => x.Rating).ToList();
        }
    }
}
