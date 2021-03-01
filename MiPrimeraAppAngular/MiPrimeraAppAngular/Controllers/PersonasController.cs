using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MiPrimeraAppAngular.Clases;
using MiPrimeraAppAngular.Models;

namespace MiPrimeraAppAngular.Controllers
{
    public class PersonasController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        [Route("api/Persona/listarPersonas")]
        public IEnumerable<PersonaCLS> listarPersonas()
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                List<PersonaCLS> listaPersona = (from persona in bd.Persona
                                                 where persona.Bhabilitado == 1
                                                 select new PersonaCLS
                                                 {
                                                     iidpersona = persona.Iidpersona,
                                                     nombreCompleto = persona.Nombre + " " + persona.Appaterno + " " + persona.Apmaterno,
                                                     correo = persona.Correo
                                                 }).ToList();
                return listaPersona;
            }
        }

        [HttpGet]
        [Route("api/Personas/filtrarPersona/{nombreCompleto?}")]
        public IEnumerable<PersonaCLS> filtrarPersona(string nombreCompleto = "")
        {
            List<PersonaCLS> listaPersona;
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                if (nombreCompleto == "")
                {
                    listaPersona = (from persona in bd.Persona
                                    where persona.Bhabilitado == 1
                                    select new PersonaCLS
                                    {
                                        iidpersona = persona.Iidpersona,
                                        nombreCompleto = persona.Nombre + " " + persona.Appaterno + " " + persona.Apmaterno,
                                        correo = persona.Correo
                                    }).ToList();
                }
                else
                {
                    listaPersona = (from persona in bd.Persona
                                    where persona.Bhabilitado == 1
                                    && (persona.Nombre + " " + persona.Appaterno + " " + persona.Apmaterno).ToLower().Contains(nombreCompleto.ToLower())
                                    select new PersonaCLS
                                    {
                                        iidpersona = persona.Iidpersona,
                                        nombreCompleto = persona.Nombre + " " + persona.Appaterno + " " + persona.Apmaterno,
                                        correo = persona.Correo
                                    }).ToList();
                }
                return listaPersona;
            }
        }

        [HttpGet]
        [Route("api/Persona/listarPersonaCombo")]
        public IEnumerable<PersonaCLS> listarPersonaCombo()
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                IEnumerable<PersonaCLS> listarPersona = (from persona in bd.Persona
                                                         where persona.Bhabilitado == 1
                                                         && persona.Btieneusuario == 0
                                                         select new PersonaCLS
                                                         {
                                                             iidpersona = persona.Iidpersona,
                                                             nombreCompleto = persona.Nombre + " " + persona.Appaterno + " " + persona.Apmaterno
                                                         }).ToList();
                return listarPersona;
            }
        }

        [HttpPost]
        [Route("api/Persona/guadarPersona")]
        public int guadarPersona([FromBody]PersonaCLS oPersonaCLS)
        {
            int rpta = 0;
            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    if (oPersonaCLS.iidpersona == 0) {
                        Persona oPersona = new Persona();
                        oPersona.Iidpersona = oPersonaCLS.iidpersona;
                        oPersona.Nombre = oPersonaCLS.nombre;
                        oPersona.Appaterno = oPersonaCLS.apPaterno;
                        oPersona.Apmaterno = oPersonaCLS.apMaterno;
                        oPersona.Correo = oPersonaCLS.correo;
                        oPersona.Telefono = oPersonaCLS.telefono;
                        oPersona.Bhabilitado = 1;
                        oPersona.Btieneusuario = 0;
                        oPersona.Fechanacimiento = oPersonaCLS.fechaNacimiento;
                        rpta = 1;

                        bd.Persona.Add(oPersona);
                        bd.SaveChanges();
                    }
                    else
                    {
                        //recuperar toda la fila
                        Persona oPersona = bd.Persona.Where(p => p.Iidpersona == oPersonaCLS.iidpersona).First();
                        oPersona.Nombre = oPersonaCLS.nombre;
                        oPersona.Appaterno = oPersonaCLS.apPaterno;
                        oPersona.Apmaterno = oPersonaCLS.apMaterno;
                        oPersona.Correo = oPersonaCLS.correo;
                        oPersona.Telefono = oPersonaCLS.telefono;
                        oPersona.Fechanacimiento = oPersonaCLS.fechaNacimiento;
                        bd.SaveChanges();
                        rpta = 1;
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return rpta;
        }

        [HttpGet]
        [Route("api/Persona/validarCorreo/{id}/{correo}")]
        public int validarCorreo(int id, string correo)
        {
            int rpta = 0;
            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    if (id == 0)
                    {
                        rpta = bd.Persona.Where(p => p.Correo.ToLower() == correo.ToLower()).Count();

                    }
                    else
                    {
                        //editar
                        rpta = bd.Persona.Where(p => p.Correo.ToLower() == correo.ToLower() && p.Iidpersona!=id).Count();
                    }
                }
            }catch(Exception ex)
            {

            }
            return rpta;
        }

        [HttpGet]
        [Route("api/Persona/recuperarPersona/{idPersona}")]
        public PersonaCLS recuperarPersona(int idPersona)
        {
            using (BDRestauranteContext db = new BDRestauranteContext())
            {
                PersonaCLS oPersonaCls = (from persona in db.Persona
                                          where persona.Bhabilitado == 1
                                          && persona.Iidpersona == idPersona
                                          select new PersonaCLS
                                          {
                                              iidpersona = persona.Iidpersona,
                                              nombre = persona.Nombre,
                                              apPaterno = persona.Appaterno,
                                              apMaterno = persona.Apmaterno,
                                              telefono = persona.Telefono,
                                              correo = persona.Correo,
                                              fechaCadena = persona.Fechanacimiento != null ? ((DateTime)persona.Fechanacimiento).ToString("yyyy-MM-dd") : ""
                                          }).First();
                return oPersonaCls;
            }
        }
        [HttpGet]
        [Route("api/Persona/eliminarPersona/{idPersona}")]
        public int eliminarPersona(int idPersona)
        {
            int rpta = 0;
            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    Persona oPersona = bd.Persona.Where(p => p.Iidpersona == idPersona).First();
                    oPersona.Bhabilitado = 0;
                    bd.SaveChanges();
                    rpta = 1;

                }
            }
            catch (Exception ex)
            {
                rpta = 0;
            }
            return rpta;
            
        }

    }
}