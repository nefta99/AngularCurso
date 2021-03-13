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
        [HttpPost]
        [Route("api/Pagina/guardarPagina")]
        public int guardarPagina([FromBody] PaginaCLS oPaginaCLS)
        {
            int rpta = 0;
            try
            {
                using (BDRestauranteContext db= new BDRestauranteContext()) { 
                    if (oPaginaCLS.iidpagina == 0)
                    {
                        Pagina oPagina = new Pagina();
                        oPagina.Accion = oPaginaCLS.accion;
                        oPagina.Mensaje = oPaginaCLS.mensaje;
                        oPagina.Bhabilitado = 1;
                        db.Pagina.Add(oPagina);
                        db.SaveChanges();
                        rpta = 1;
                    }
                    else
                    {
                        Pagina oPagina = db.Pagina.Where(p => p.Iidpagina == oPaginaCLS.iidpagina).First();
                        oPagina.Accion = oPaginaCLS.accion;
                        oPagina.Mensaje = oPaginaCLS.mensaje;
                        db.SaveChanges();
                        rpta = 1;
                    }
                }
            } catch (Exception ex)
            {

            }
            return rpta;
        }
        [HttpGet]
        [Route("api/Pagina/recuperarPagina/{idPagina}")]
        public PaginaCLS recuperarPagina(int idPagina)
        {
            PaginaCLS oPaginaCLS = new PaginaCLS();
            try
            {
                using (BDRestauranteContext db = new BDRestauranteContext())
                {
                    oPaginaCLS = (from pagina in db.Pagina
                                  where pagina.Bhabilitado == 1
                                  select new PaginaCLS
                                  {
                                      iidpagina = pagina.Iidpagina,
                                      accion = pagina.Accion,
                                      mensaje = pagina.Mensaje
                                  }).First();
                }
                
            }
            catch (Exception ex)
            {
                oPaginaCLS.accion = null;
            }
            return oPaginaCLS;
        }

        [HttpGet]
        [Route("api/Pagina/eliminarPagina/{idPagina}")]
        public int eliminarPagina(int idPagina)
        {
            int rpta = 0;
            try
            {
                using (BDRestauranteContext db = new BDRestauranteContext())
                {
                    Pagina oPagina = db.Pagina.Where(p => p.Iidpagina == idPagina).First();
                    oPagina.Bhabilitado = 0;
                    db.SaveChanges();
                    rpta = 1;
                }
            }catch(Exception ex)
            {
                rpta = 0;
            }
            return rpta;
        }
    }
}