using PracticeFlorisoft.Models;
using System.Collections.Generic;
using PracticeFlorisoft.Repository;
using System.Net.Http;
using System.Net;
using PracticeFlorisoft.Helper;
using System.Net.Http.Headers;
using System.Web.Mvc;
using System.IO;
using Newtonsoft.Json;

namespace PracticeFlorisoft.Controllers
{
    public class BouquetController : System.Web.Mvc.Controller
    {
        private readonly static string _cacheKey = "Bouquet";
        private List<Bouquet> _products = new CacheHelper().GetAllBouquets(_cacheKey);  
        private BouquetRepository _bouquetRepository = new BouquetRepository();

        //TODO: Refactor views inside of API endpoints
        [HttpGet]
        public ActionResult All(string type)
        {

            if (string.IsNullOrEmpty(type))
                return Json(_products, JsonRequestBehavior.AllowGet);

            //TODO: Enum for type
            switch (type)
            {
                case "likes":
                    return Json(_bouquetRepository.SortByLikes(), JsonRequestBehavior.AllowGet);
                case "viewed":
                    return Json(_bouquetRepository.SortByViewed(), JsonRequestBehavior.AllowGet);
                case "comments":
                    return Json(_bouquetRepository.SortByComments(), JsonRequestBehavior.AllowGet);
                case "rated":
                    return Json(_bouquetRepository.SortByRated(), JsonRequestBehavior.AllowGet);
                default:
                    return Json(_products, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpGet]
        public PartialViewResult Test(string type = null)
        {
            var model = new BouquetModel();

            switch (type)
            {
                case "likes":
                    model.Bouquets = _bouquetRepository.SortByLikes();
                    break;
                case "viewed":
                    model.Bouquets = _bouquetRepository.SortByViewed();
                    break;
                case "comments":
                    model.Bouquets = _bouquetRepository.SortByComments();
                    break;
                case "rated":
                    model.Bouquets = _bouquetRepository.SortByRated();
                    break;
                default:
                    model.Bouquets = _bouquetRepository.GetAllBouquets();
                    break;
            }

            return PartialView("~/Views/Partial/Collage.cshtml", model);
        }

        [HttpPost]
        public ActionResult Add(Bouquet bouquet)
        {
            //Read raw data and deserialize
            //https://stackoverflow.com/questions/52958607/vue-fetch-post-data-to-controller-asp-net-mvc
            using (Stream request = Request.InputStream)
            {
                request.Seek(0, SeekOrigin.Begin);
                string bodyData = new StreamReader(request).ReadToEnd();
                bouquet = JsonConvert.DeserializeObject<Bouquet>(bodyData);
            }

            //var message = new HttpResponseMessage();
            BouquetRepository _boquetRepository = new BouquetRepository();

            if (bouquet == null)
                return Json($"403: Bouquet is null");
                //return new HttpResponseMessage
                //{
                //    StatusCode = HttpStatusCode.BadRequest,
                //    Content = new StringContent($"Bouquet is null")
                //};
                
            try
            {
                _boquetRepository.UpdateCache(bouquet);

            }
            catch (System.Exception e)
            {
                return Json($"403: Failed to add bouquet: {e}");

                //return new HttpResponseMessage
                //{
                //    StatusCode = HttpStatusCode.BadRequest,
                //    Content = new StringContent($"Failed to add bouquet: {e}")
                //};
            }
            return Json($"Succeeded to add {bouquet.Title} {_products.Count}");
           
            //return new HttpResponseMessage
            //{
            //    StatusCode = HttpStatusCode.OK,
            //    Content = new StringContent($"Succeeded to add {bouquet.Title} {_products.Count}")
            //};
        }

    }
}
