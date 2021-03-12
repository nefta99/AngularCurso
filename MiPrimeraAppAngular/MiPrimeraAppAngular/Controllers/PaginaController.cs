using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MiPrimeraAppAngular.Clases;
using MiPrimeraAppAngular.Models;

namespace MiPrimeraAppAngular.Controllers
{
    public class PaginaController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        [Route("api/Pagina/listarPaginasBD")]
        public List<PaginaCLS> listarPaginasBD()
        {
            List<PaginaCLS> listaPagina = new List<PaginaCLS>();
            using (BDRestauranteContext db = new BDRestauranteContext())
            {
                listaPagina = (from pagina in db.Pagina
                               where pagina.Bhabilitado == 1
                               select new PaginaCLS
                               {
                                   iidpagina = pagina.Iidpagina,
                                   mensaje = pagina.Mensaje,
                                   accion = pagina.Accion
                               }).ToList();

                return listaPagina;


            }
        }
    }
}