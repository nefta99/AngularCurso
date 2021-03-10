using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiPrimeraAppAngular.Clases
{
    public class TipoUsuariosCLS
    {
        public int iidtipoUsuario { get; set; }
        public string nombre { get; set; }

        public string descripcion { get; set; }
        public int bhabilitado { get; set; }
        //Agregar
        public string valores { get; set; }
        //editar
        public List<PaginaCLS> listaPagina { get; set; }
    }
}
