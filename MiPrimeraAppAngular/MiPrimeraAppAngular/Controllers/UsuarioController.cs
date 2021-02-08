using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MiPrimeraAppAngular.Clases;
using MiPrimeraAppAngular.Models;

namespace MiPrimeraAppAngular.Controllers
{
    public class UsuarioController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        [Route("api/Usuario/listarTipoUsuario")]
        public IEnumerable<TipoUsuariosCLS> listarTipoUsuario()
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                List<TipoUsuariosCLS> listaTipoUsuario = (from tipousuario in bd.TipoUsuario
                                                          where tipousuario.Bhabilitado == 1
                                                          select new TipoUsuariosCLS
                                                          {
                                                              iidtipoUsuario = tipousuario.Iidtipousuario,
                                                              nombre = tipousuario.Nombre
                                                          }).ToList();
                return listaTipoUsuario;
            }
        }


        [HttpGet]
        [Route("api/Usuario/listarUsuario")]
        public IEnumerable<UsuarioCLS> listarUsuario()
        {
            using (BDRestauranteContext bd= new BDRestauranteContext())
            {
                List<UsuarioCLS> listausuario = (from usuario in bd.Usuario
                                                 join persona in bd.Persona
                                                 on usuario.Iidpersona equals persona.Iidpersona
                                                 join tipousuario in bd.TipoUsuario
                                                 on usuario.Iidtipousuario equals tipousuario.Iidtipousuario
                                                 where usuario.Bhabilitado == 1
                                                 select new UsuarioCLS
                                                 {
                                                     iidusurio = usuario.Iidusuario,
                                                     nombreusuario = usuario.Nombreusuario,
                                                     nombrePersona = persona.Nombre + " " + persona.Appaterno + " " + persona.Apmaterno,
                                                     nombreTipoUsuario = tipousuario.Nombre
                                                 }).ToList();
                return listausuario;
            }
        }
    }
}