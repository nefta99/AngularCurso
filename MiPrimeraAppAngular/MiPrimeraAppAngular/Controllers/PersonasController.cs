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

        [HttpPost]
        [Route("api/Persona/guadarPersona")]
        public int guadarPersona([FromBody]PersonaCLS oPersonaCLS)
        {
            int rpta = 0;
            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    Persona oPersona = new Persona();
                    oPersona.Iidpersona = oPersonaCLS.iidpersona;
                    oPersona.Nombre = oPersonaCLS.nombre;
                    oPersona.Appaterno = oPersonaCLS.apPaterno;
                    oPersona.Apmaterno = oPersonaCLS.apMaterno;
                    oPersona.Correo = oPersonaCLS.correo;
                    oPersona.Telefono = oPersonaCLS.telefono;
                    oPersona.Bhabilitado = 1;
                    oPersona.Btieneusuario = 0;
                    rpta = 1;

                    bd.Persona.Add(oPersona);
                    bd.SaveChanges();
                }
            }
            catch (Exception ex)
            {

            }
            return rpta;
        }

        [HttpGet]
        [Route("api/Persona/recuperarPersona")]
        public PersonaCLS recuperarPersona(int idpersona)
        {
            using (BDRestauranteContext db = new BDRestauranteContext())
            {
                PersonaCLS oPersonaCls = (from persona in db.Persona
                                          where persona.Bhabilitado == 1
                                          && persona.Iidpersona == idpersona
                                          select new PersonaCLS
                                          {
                                              iidpersona = persona.Iidpersona,
                                              nombre = persona.Nombre,
                                              apPaterno = persona.Appaterno,
                                              apMaterno = persona.Apmaterno,
                                              telefono = persona.Telefono,
                                              correo = persona.Correo
                                          }).First();
                return oPersonaCls;
            }
        }

    }
}