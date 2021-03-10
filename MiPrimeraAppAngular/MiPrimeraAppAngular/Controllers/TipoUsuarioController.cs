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
    }
}