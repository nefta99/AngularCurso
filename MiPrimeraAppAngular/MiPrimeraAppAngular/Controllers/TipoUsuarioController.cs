using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MiPrimeraAppAngular.Clases;
using MiPrimeraAppAngular.Models;

namespace MiPrimeraAppAngular.Controllers
{
    public class TipoUsuarioController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        [Route("api/TipoUsuario/listarTipoUsuario")]
        public List<TipoUsuariosCLS> listarTipoUsuario()
        {
            List<TipoUsuariosCLS> listaTipoUsuario = new List<TipoUsuariosCLS>();
            using (BDRestauranteContext db = new BDRestauranteContext())
            {
                listaTipoUsuario = (from tipousuario in db.TipoUsuario
                                    where tipousuario.Bhabilitado == 1
                                    select new TipoUsuariosCLS
                                    {
                                        iidtipoUsuario = tipousuario.Iidtipousuario,
                                        nombre = tipousuario.Nombre,
                                        descripcion = tipousuario.Descripcion,
                                        bhabilitado = (int)tipousuario.Bhabilitado
                                    }).ToList();
                return listaTipoUsuario;
            }
        }
        [HttpGet]
        [Route("api/TipoUsuario/listarPaginasTipoUsuario")]

        public List<PaginaCLS> listarPaginasTipoUsuario()
        {
            List<PaginaCLS> listaPagina = new List<PaginaCLS>();
            using (BDRestauranteContext db = new BDRestauranteContext())
            {
                listaPagina = (from pagina in db.Pagina
                               where pagina.Bhabilitado == 1
                               select new PaginaCLS
                               {
                                   iidpagina = pagina.Iidpagina,
                                   mensaje = pagina.Mensaje
                               }).ToList();
            }
            return listaPagina;
        }
        [HttpGet]
        [Route("api/TipoUsuario/listarPaginasRecuperar")]
        public TipoUsuariosCLS listarPaginasRecuperar(int iidTipoUsuario)
        {
            TipoUsuariosCLS oTipoUsuariosCLS = new TipoUsuariosCLS();
            using (BDRestauranteContext db = new BDRestauranteContext())
            {
                List<PaginaCLS> listaPaginas = (from tipoUsuario in db.TipoUsuario
                                                join paginasTipoUsu in db.PaginaTipoUsuario
                                                on tipoUsuario.Iidtipousuario equals paginasTipoUsu.Iidtipousuario
                                                join pagina in db.Pagina
                                                on paginasTipoUsu.Iidpagina equals
                                                pagina.Iidpagina
                                                where paginasTipoUsu.Iidtipousuario == iidTipoUsuario
                                                select new PaginaCLS
                                                {
                                                    iidpagina = pagina.Iidpagina
                                                }).ToList();

                TipoUsuario oTipoUsuario = db.TipoUsuario.Where(p => p.Iidtipousuario == iidTipoUsuario).First();
                oTipoUsuariosCLS.iidtipoUsuario = oTipoUsuario.Iidtipousuario;
                oTipoUsuariosCLS.nombre = oTipoUsuario.Nombre;
                oTipoUsuariosCLS.descripcion = oTipoUsuario.Descripcion;
                oTipoUsuariosCLS.listaPagina = listaPaginas;

                return oTipoUsuariosCLS;
            }
        }
        
    }
}