using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
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
        [HttpPost]
        [Route("api/TipoUsuario/guardarDatosTipoUsuario")]
        public int guardarDatosTipoUsuario([FromBody]TipoUsuariosCLS oTipoUsuariosCLS)
        {
            int rpta = 0;
            try
            {
                using (BDRestauranteContext db = new BDRestauranteContext())
                {
                    using (var transaccion = new TransactionScope())
                    {
                        if (oTipoUsuariosCLS.iidtipoUsuario == 0)
                        {
                            TipoUsuario oTipoUsuario = new TipoUsuario();
                            oTipoUsuario.Nombre = oTipoUsuariosCLS.nombre;
                            oTipoUsuario.Descripcion = oTipoUsuariosCLS.descripcion;
                            oTipoUsuario.Bhabilitado = 1;
                            db.TipoUsuario.Add(oTipoUsuario);
                            int idTipoUsuario = oTipoUsuario.Iidtipousuario;
                            string[] ids = oTipoUsuariosCLS.valores.Split("$");
                            for (int i = 0; i < ids.Length; i++)
                            {
                                PaginaTipoUsuario oPaginaTipoUsuario = new PaginaTipoUsuario();
                                oPaginaTipoUsuario.Iidpagina = int.Parse(ids[i]);
                                oPaginaTipoUsuario.Iidtipousuario = idTipoUsuario;
                                oPaginaTipoUsuario.Bhabilitado = 1;
                                db.PaginaTipoUsuario.Add(oPaginaTipoUsuario);
                            }
                            db.SaveChanges();
                            transaccion.Complete();
                            rpta = 1;

                        }
                        else
                        {
                            //Recuperar la informacion
                            TipoUsuario oTipoUsuario = db.TipoUsuario.Where(
                            p => p.Iidtipousuario == oTipoUsuariosCLS.iidtipoUsuario).First();

                            oTipoUsuario.Nombre = oTipoUsuariosCLS.nombre;
                            oTipoUsuario.Descripcion = oTipoUsuariosCLS.descripcion;
                            db.SaveChanges();
                            string[] ids = oTipoUsuariosCLS.valores.Split("$");
                            //Con el id Tipo Usuario(sacamos todas las paginas asociadas y
                            //las vamos a desahabilitar)
                            List<PaginaTipoUsuario> lista = db.PaginaTipoUsuario.Where(p => p.Iidtipousuario == oTipoUsuariosCLS.iidtipoUsuario).ToList();
                            foreach (PaginaTipoUsuario pag in lista)
                            {
                                pag.Bhabilitado = 0;
                            }
                            //Editar si el id de pagina es nuevo lo insertamos
                            //Si es un editar cambiamos de 0 a 1
                            int cantidad;
                            for (int i = 0; i < ids.Length; i++)
                            {
                                cantidad = lista.Where(p => p.Iidpagina == int.Parse(ids[i])).Count();
                                if (cantidad == 0)
                                {
                                    PaginaTipoUsuario oPaginaTipoUsuario = new PaginaTipoUsuario();
                                    oPaginaTipoUsuario.Iidpagina = int.Parse(ids[i]);
                                    oPaginaTipoUsuario.Iidtipousuario = oTipoUsuariosCLS.iidtipoUsuario;
                                    oPaginaTipoUsuario.Bhabilitado = 1;
                                    db.PaginaTipoUsuario.Add(oPaginaTipoUsuario);
                                }
                                else
                                {
                                    PaginaTipoUsuario oP = lista.Where(p => p.Iidpagina == int.Parse(ids[i])).First();
                                    oP.Bhabilitado = 1;

                                }

                            }
                            db.SaveChanges();
                            transaccion.Complete();
                            rpta = 0;
                        }
                    }
                }
            } catch (Exception ex)
            {
                rpta = 0;
            }
            return rpta;
        }

        [HttpGet]
        [Route("api/TipoUsuario/eliminarTipoUsuario/{iidTipoUsuario}")]
        public int eliminarTipoUsuario(int iidTipoUsuario)
        {
            int rpta = 0;
            try
            {
                using (BDRestauranteContext db= new BDRestauranteContext())
                {
                    TipoUsuario oTipoUsuario = db.TipoUsuario.Where(p => p.Iidtipousuario == iidTipoUsuario).First();
                    oTipoUsuario.Bhabilitado = 0;
                    db.SaveChanges();
                    rpta = 1;
                }
            }catch(Exception ex)
            {
                rpta = 0;
            }
            return rpta;
        }
            

        [HttpGet]
        [Route("api/TipoUsuario/listarPaginasRecuperar/{iidTipoUsuario}")]
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
                                                && paginasTipoUsu.Bhabilitado==1
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