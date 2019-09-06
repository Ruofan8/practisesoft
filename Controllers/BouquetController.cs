using PracticeFlorisoft.Models;
using System.Collections.Generic;
using System.Web.Http;
using System.Linq;
using PracticeFlorisoft.Repository;
using System.Net.Http;
using System.Net;
using PracticeFlorisoft.Helper;

namespace PracticeFlorisoft.Controllers
{
    public class BouquetController : ApiController
    {
        private readonly static string _cacheKey = "Bouquet";
        private List<Bouquet> _products = new CacheHelper().GetAllBouquets(_cacheKey);
        private BouquetRepository _bouquetRepository = new BouquetRepository();

        //TODO: Refactor views inside of API endpoints
        [HttpGet]
        public List<Bouquet> All(string type)
        {
            if(string.IsNullOrEmpty(type))
                return _products;

            //TODO: Enum for type
            switch(type)
            {
                case "likes":
                    _products = _bouquetRepository.SortByLikes();
                    break;
                case "viewed":
                    _products = _bouquetRepository.SortByViewed();
                    break;
                case "comments":
                    _products = _bouquetRepository.SortByComments();
                    break;
                case "rated":
                    _products = _bouquetRepository.SortByRated();
                    break;
                default:
                    break;
            }
            return _products;
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
