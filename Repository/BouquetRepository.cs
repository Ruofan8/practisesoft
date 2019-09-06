using PracticeFlorisoft.Helper;
using PracticeFlorisoft.Models;
using System.Collections.Generic;
using System.Linq;

namespace PracticeFlorisoft.Repository
{
    public class BouquetRepository
    {
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
            cacheHelper.UpdateCache(bouquet, this.cacheKey);
        }
    }
}