using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using Microsoft.AspNetCore.Mvc;
using MiPrimeraAppAngular.Clases;
using MiPrimeraAppAngular.Models;
//importamos para la sessiones
using Microsoft.AspNetCore.Session;
using Microsoft.AspNetCore.Http;

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
        [Route("api/Usuario/validarUsuario/{idUsuario}/{nombre}")]
        public int validarUsuario(int idUsuario, string nombre)
        {
            int rpta = 0;
            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    if (idUsuario == 0)
                    {
                        rpta = bd.Usuario.Where(p => p.Nombreusuario.ToLower() == nombre.ToLower()).Count();
                    }
                    else
                    {
                        rpta = bd.Usuario.Where(p => p.Nombreusuario.ToLower() == nombre.ToLower() && p.Iidusuario != idUsuario).Count();
                    }
                }
            } catch (Exception ex)
            {
                rpta = 0;
            }
            return rpta;
        }
        [HttpGet]
        [Route("api/Usuario/listarPaginas")]
        public List<PaginaCLS> listarPaginas()
        {
            List<PaginaCLS> listarPagina = new List<PaginaCLS>();
            int idTipoUsuario = int.Parse(HttpContext.Session.GetString("tipoUsuario"));
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                listarPagina = (from paginaTipo in bd.PaginaTipoUsuario
                                join pagina in bd.Pagina
                                on paginaTipo.Iidpagina equals pagina.Iidpagina
                                where paginaTipo.Bhabilitado == 1
                                && paginaTipo.Iidtipousuario == idTipoUsuario
                                select new PaginaCLS
                                {
                                    iidpagina = pagina.Iidpagina,
                                    accion = pagina.Accion,
                                    mensaje = pagina.Mensaje,
                                    bhabilitado = (int)pagina.Bhabilitado
                                }).ToList();
                return listarPagina;
            }
        }

        [HttpGet]
        [Route("api/Usuario/cerrarSession")]
        public SeguridadCLS cerrarSession()
        {
            SeguridadCLS oSeguridadCLS = new SeguridadCLS();
            try
            {
                HttpContext.Session.Remove("usuario");
                HttpContext.Session.Remove("tipoUsuario");
                oSeguridadCLS.valor = "OK";
            }catch(Exception es)
            {
                oSeguridadCLS.valor = "";
            }
            return oSeguridadCLS;
        }

        [HttpPost]
        [Route("api/Usuario/login")]
        public UsuarioCLS login([FromBody]UsuarioCLS oUsuarioCLS)
        {
            UsuarioCLS oUsuario = new UsuarioCLS();
            int rpta = 0;
            using (BDRestauranteContext db = new BDRestauranteContext())
            {
                
                //cifrar contraseña
                SHA256Managed sha = new SHA256Managed();
                byte[] dataNoCifrada = Encoding.Default.GetBytes(oUsuarioCLS.contra);
                byte[] dataCifrada = sha.ComputeHash(dataNoCifrada);
                string claveCifrada = BitConverter.ToString(dataCifrada).Replace("-", "");
                rpta = db.Usuario.Where(p => p.Nombreusuario.ToUpper() == oUsuarioCLS.nombreusuario.ToUpper() && p.Contra == claveCifrada).Count();
                if (rpta == 1)
                {
                    Usuario oUsuarioRecuperar = db.Usuario.Where(p => p.Nombreusuario.ToUpper() == oUsuarioCLS.nombreusuario.ToUpper() && p.Contra == claveCifrada).First();
                    HttpContext.Session.SetString("usuario", oUsuarioRecuperar.Iidusuario.ToString());
                    HttpContext.Session.SetString("tipoUsuario", oUsuarioRecuperar.Iidtipousuario.ToString());
                    //
                    oUsuario.iidusurio = oUsuarioRecuperar.Iidusuario;
                    oUsuario.nombreusuario = oUsuarioRecuperar.Nombreusuario;
                }
                else
                {
                    oUsuario.iidusurio = 0;
                    oUsuario.nombreusuario = "";
                }
            }
            return oUsuario;
        }
        [HttpGet]
        [Route("api/Usuario/obtenerVariableSession")]
        public SeguridadCLS obtenerVariableSession()
        {
            SeguridadCLS oSeguridadCLS = new SeguridadCLS();
            string variableSession = HttpContext.Session.GetString("usuario");
            if (variableSession == null)
            {
                oSeguridadCLS.valor = "";
            }
            else
            {
                oSeguridadCLS.valor = variableSession;
            }
            return oSeguridadCLS;
        }

        [HttpGet]
        [Route("api/Usuario/eliminarUsuario/{idusuario}")]
        public int eliminarUsuario(int idusuario)
        {
            int rpta = 0;
            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    Usuario oUsuario = bd.Usuario.Where(p => p.Iidusuario == idusuario).First();
                    oUsuario.Bhabilitado = 0;
                    bd.SaveChanges();
                    rpta = 1;
                }
            }
            catch (Exception es)
            {

            }
            return rpta;
        }


        [HttpPost]
        [Route("api/Usuario/guardarDatos")]
        public int guardarDatos([FromBody]UsuarioCLS oUsuarioCLS)
        {
            int rpta = 0;
            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    using (var transaccion = new TransactionScope())
                    {
                        if (oUsuarioCLS.iidusurio == 0)
                        {
                            //Agregar usuario
                            Usuario oUsuario = new Usuario();
                            oUsuario.Nombreusuario = oUsuarioCLS.nombreusuario;
                            //cifrar contraseña
                            SHA256Managed sha = new SHA256Managed();
                            string clave = oUsuarioCLS.contra;
                            byte[] dataNoCifrada = Encoding.Default.GetBytes(clave);
                            byte[] dataCifrada = sha.ComputeHash(dataNoCifrada);
                            string claveCifrada =BitConverter.ToString(dataCifrada).Replace("-", "");
                            oUsuario.Contra = claveCifrada;
                            oUsuario.Iidpersona = oUsuarioCLS.iidpersona;
                            oUsuario.Iidtipousuario = oUsuarioCLS.iidTipousuario;
                            oUsuario.Bhabilitado = 1;                            
                            bd.Usuario.Add(oUsuario);

                            //Modificar Persona (btieneUsuario de 0 a 1)

                            Persona oPersona = bd.Persona.Where(p => p.Iidpersona == oUsuarioCLS.iidpersona).First();
                            oPersona.Btieneusuario = 1;
                            bd.SaveChanges();
                            transaccion.Complete();
                            rpta = 1;
                        }
                        else
                        {
                            Usuario oUsuario = bd.Usuario.Where(p => p.Iidusuario == oUsuarioCLS.iidusurio).First();
                            oUsuario.Nombreusuario = oUsuarioCLS.nombreusuario;
                            oUsuario.Iidtipousuario = oUsuarioCLS.iidTipousuario;
                            bd.SaveChanges();
                            transaccion.Complete();
                            rpta = 1;
                        }
                    }
                }
            }catch(Exception es)
            {

            }
            return rpta;
        }
        [HttpGet]
        [Route("api/Usuario/recuperarUsuario/{iidUsuario}")]
        public UsuarioCLS recuperarUsuario(int iidUsuario)
        {
            using (BDRestauranteContext db = new BDRestauranteContext())
            {
                UsuarioCLS oUsuarioCLS = new UsuarioCLS();
                Usuario oUsuario = db.Usuario.Where(p => p.Iidusuario == iidUsuario).First();
                oUsuarioCLS.iidusurio = oUsuario.Iidusuario;
                oUsuarioCLS.nombreusuario = oUsuario.Nombreusuario;
                oUsuarioCLS.iidTipousuario =(int) oUsuario.Iidtipousuario;
                return oUsuarioCLS;
            } 

        }

        [HttpGet]
        [Route("api/Usuario/listarUsuario")]
        public IEnumerable<UsuarioCLS> listarUsuario()
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
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
        [HttpGet]
        [Route("api/Usuario/filtrarUsuarioPorTipo/{idTipo?}")]
        public IEnumerable<UsuarioCLS> filtrarUsuarioPorTipo(int idTipo=0)
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                List<UsuarioCLS> listausuario = (from usuario in bd.Usuario
                                                 join persona in bd.Persona
                                                 on usuario.Iidpersona equals persona.Iidpersona
                                                 join tipousuario in bd.TipoUsuario
                                                 on usuario.Iidtipousuario equals tipousuario.Iidtipousuario
                                                 where usuario.Bhabilitado == 1
                                                 && usuario.Iidtipousuario==idTipo
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