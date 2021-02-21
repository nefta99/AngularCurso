using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MiPrimeraAppAngular.Clases;
using MiPrimeraAppAngular.Models;

namespace MiPrimeraAppAngular.Controllers
{
    public class ProductoController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        [Route("api/Producto/listarProductos")]
        public IEnumerable<ProductoCLS> listarProductos()
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                List<ProductoCLS> lista = (from producto in bd.Producto
                                           join categoria in bd.Categoria
                                           on producto.Iidcategoria equals categoria.Iidcategoria
                                           where producto.Bhabilitado==1
                                           select new ProductoCLS
                                           {
                                               idproducto = producto.Iidproducto,
                                               nombre = producto.Nombre,
                                               precio = (decimal)producto.Precio,
                                               stock = (int)producto.Stock,
                                               nombreCategoria = categoria.Nombre


                                           }).ToList();
                return lista;

            }
        }
        [HttpGet]
        [Route("api/Producto/obtenerProductoPorId/{idProducto}")]
        public ProductoCLS obtenerProductoPorId(int idProducto)
        {
            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    ProductoCLS oProductoCLS = (from producto in bd.Producto
                                                where producto.Bhabilitado == 1
                                                && producto.Iidproducto== idProducto
                                                select new ProductoCLS
                                                {
                                                    idproducto = producto.Iidproducto,
                                                    nombre = producto.Nombre,
                                                    idcategoria = (int)producto.Iidcategoria,
                                                    idmarca = (int)producto.Iidmarca,
                                                    precio = (decimal)producto.Precio,
                                                    stock = (int)producto.Stock
                                                }).First();
                    return oProductoCLS;
                }
            }catch(Exception es)
            {
                return null;
            }
        }
        [HttpGet]
        [Route("api/Producto/filtraProductoPorNombre/{nombre}")]
        public IEnumerable<ProductoCLS> filtraProductoPorNombre(string nombre)
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                List<ProductoCLS> lista = (from producto in bd.Producto
                                           join categoria in bd.Categoria
                                           on producto.Iidcategoria equals categoria.Iidcategoria
                                           where producto.Bhabilitado==1
                                           && producto.Nombre.ToLower().Contains(nombre.ToLower())
                                           select new ProductoCLS
                                           {
                                               idproducto = producto.Iidproducto,
                                               nombre = producto.Nombre,
                                               precio = (decimal)producto.Precio,
                                               stock = (int)producto.Stock,
                                               nombreCategoria = categoria.Nombre


                                           }).ToList();
                return lista;

            }
        }
        [HttpGet]
        [Route("api/Producto/filtraProductoPorCategoria/{idcategoria}")]
        public IEnumerable<ProductoCLS> filtraProductoPorCategoria(int  idcategoria)
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                List<ProductoCLS> lista = (from producto in bd.Producto
                                           join categoria in bd.Categoria
                                           on producto.Iidcategoria equals categoria.Iidcategoria
                                           where producto.Bhabilitado == 1
                                           && producto.Iidcategoria==idcategoria
                                           select new ProductoCLS
                                           {
                                               idproducto = producto.Iidproducto,
                                               nombre = producto.Nombre,
                                               precio = (decimal)producto.Precio,
                                               stock = (int)producto.Stock,
                                               nombreCategoria = categoria.Nombre


                                           }).ToList();
                return lista;

            }
        }
        [HttpGet]
        [Route("ap/Producto/listarMarcas")]
        public IEnumerable<MarcaCLS> listarMarcas()
        {
            using (BDRestauranteContext db = new BDRestauranteContext())
            {
                List<MarcaCLS> listarMarca = (from marca in db.Marca
                                              where marca.Bhabilitado == 1
                                              select new MarcaCLS
                                              {
                                                  iidmarca = marca.Iidmarca,
                                                  nombre = marca.Nombre
                                              }
                                             ).ToList();
                return listarMarca;
            }
        }
    }
}