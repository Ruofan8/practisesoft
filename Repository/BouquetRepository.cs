using PracticeFlorisoft.Helper;
using PracticeFlorisoft.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Caching;
using System.Web;

namespace PracticeFlorisoft.Repository
{
    public class BouquetRepository
    {
        //TODO: Move cache to CacheHelper
        private ObjectCache cache = MemoryCache.Default;
        public string cacheKey = "Bouquet";
        private CacheHelper cacheHelper = new CacheHelper();

        public List<Bouquet> GetAllBouquets()
        {
            return cacheHelper.GetAllBouquets(cacheKey);
        }

        public List<Bouquet> SortByLikes()
        {
            return cacheHelper.GetAllBouquets(cacheKey).OrderByDescending(x => x.AmountLikes).ToList();
        }

        public List<Bouquet> SortByViewed()
        {
            return cacheHelper.GetAllBouquets(cacheKey).OrderByDescending(x => x.AmountViews).ToList();
        }

        public List<Bouquet> SortByComments()
        {
            return cacheHelper.GetAllBouquets(cacheKey).OrderByDescending(x => x.AmountComments).ToList();
        }

        public List<Bouquet> SortByRated()
        {
            return cacheHelper.GetAllBouquets(cacheKey).OrderByDescending(x => x.Rating).ToList();
        }

        public void UpdateCache(Bouquet bouquet)
        {
            CacheItemPolicy policy = new CacheItemPolicy();
            var products = cacheHelper.GetAllBouquets(cacheKey);
            products.Add(bouquet);
            cache.Add(cacheKey, products, policy);
        }
    }
}