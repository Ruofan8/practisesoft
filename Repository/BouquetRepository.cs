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

        public List<Bouquet> GetAllBouquets ()
        {
            if(!cache.Contains(cacheKey))
            {
                var products = new List <Bouquet> {
                    new Bouquet
                    {
                        Title = "Titel van het boeket",
                        AmountComments = 1,
                        AmountLikes = 20,
                        PhotoUrl = "/statics/img/Boeket1.jpg",
                        Rating = 9.0,
                        AmountViews = 56,
                        Username = "Ruofan"
                    },
                new Bouquet
                {
                    Title = "Titel van het boeket",
                    AmountComments = 2,
                    AmountLikes = 19,
                    PhotoUrl = "/statics/img/Boeket2.jpg",
                    Rating = 2.7,
                    AmountViews = 526,
                    Username = "Ruofan"
                },
                new Bouquet
                {
                    Title = "Titel van het boeket",
                    AmountComments = 3,
                    AmountLikes = 18,
                    PhotoUrl = "/statics/img/Boeket3.jpg",
                    Rating = 7.0,
                    AmountViews = 123,
                    Username = "Ruofan"
                },
                new Bouquet
                {
                    Title = "Titel van het boeket",
                    AmountComments = 4,
                    AmountLikes = 17,
                    PhotoUrl = "/statics/img/Boeket4.jpg",
                    Rating = 8.0,
                    AmountViews = 89,
                    Username = "Ruofan"
                },
                new Bouquet
                {
                    Title = "Titel van het boeket",
                    AmountComments = 5,
                    AmountLikes = 16,
                    PhotoUrl = "/statics/img/Boeket5.jpg",
                    Rating = 3.0,
                    AmountViews = 12,
                    Username = "Ruofan"
                },
                new Bouquet
                {
                    Title = "Titel van het boeket",
                    AmountComments = 6,
                    AmountLikes = 15,
                    PhotoUrl = "/statics/img/Boeket6.jpg",
                    Rating = 4.0,
                    AmountViews = 345,
                    Username = "Ruofan"
                },
                new Bouquet
                {
                    Title = "Titel van het boeket",
                    AmountComments = 72,
                    AmountLikes = 12,
                    PhotoUrl = "/statics/img/Boeket7.jpg",
                    Rating = 9.3,
                    AmountViews = 5698,
                    Username = "Ruofan"
                },
                new Bouquet
                {
                    Title = "Titel van het boeket",
                    AmountComments = 72,
                    AmountLikes = 12,
                    PhotoUrl = "/statics/img/Boeket8.jpg",
                    Rating = 9.9,
                    AmountViews = 846,
                    Username = "Ruofan"
                }
   
            };
                CacheItemPolicy policy = new CacheItemPolicy();
                cache.Add(cacheKey, products, policy);
            }
            return cache.Get(cacheKey) as List<Bouquet>;
        }

        public void UpdateCache(Bouquet bouquet)
        {
            CacheItemPolicy policy = new CacheItemPolicy();
            var products = GetAllBouquets();
            products.Add(bouquet);
            cache.Add(cacheKey, products, policy);
        }
    }
}