﻿using PracticeFlorisoft.Models;
using PracticeFlorisoft.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PracticeFlorisoft.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var model = new BouquetModel();
            var bouquetRepository = new BouquetRepository();
            model.Bouquets = bouquetRepository.GetAllBouquets();
            return View(model);
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}