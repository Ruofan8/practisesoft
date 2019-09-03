using PracticeFlorisoft.Models;
using System.Collections.Generic;
using System.Web.Http;
using System.Linq;
using PracticeFlorisoft.Repository;
using System.Net.Http;
using System.Net;

namespace PracticeFlorisoft.Controllers
{
    public class BouquetController : ApiController
    {
        private List<Bouquet> _products = new BouquetRepository().GetAllBouquets();
        //TODO: Refactor views inside of API endpoints
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
        [Route("api/bouquet/rated")]
        public List<Bouquet> Rated()
        {
            return _products.OrderByDescending(x => x.Rating).ToList();
        }

        [HttpPost]
        [Route("api/bouquet/add")]
        public HttpResponseMessage Add(Bouquet bouquet)
        {
            BouquetRepository _boquetRepository = new BouquetRepository();

            if (bouquet == null)
                return Request.CreateResponse(HttpStatusCode.BadRequest, $"Bouquet is null");

            try
            {
                _boquetRepository.UpdateCache(bouquet);

            }
            catch (System.Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, $"Failed to add bouquet: {e}");
            }
            return Request.CreateResponse(HttpStatusCode.OK, $"Succeeded to add {bouquet.Title} {_products.Count}");
        }
    }
}
