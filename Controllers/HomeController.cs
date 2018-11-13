using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CityLib.Models;
using Pomelo.EntityFrameworkCore.MySql;

namespace CityLib.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            try
            {
                using(var context = new CityLibContext())
                {
                    var listOfBooks = context.Book.Where(x => x.bookid > -1);
                    ViewBag.Books = listOfBooks;
                }
            }
            catch (System.Exception ex)
            {
            }
            
            return View();
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public ActionResult ReaderFunction() {
            return View();
        }

        public ActionResult IsUserValid(string data) {
            bool isValid = false;

            if (string.IsNullOrEmpty(data)) {
                return NotFound(isValid);
            }
            isValid = true;
            return Ok(isValid);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        // public IActionResult SearchBoook(int option, string data) 
        // {
            
        // }
    }
}
