var Manejadora = /** @class */ (function () {
    function Manejadora() {
        this.Empleados = new Array();
        this.opcionTabla = 0;
    }
    Manejadora.prototype.handleEvent = function (event) {
        event.preventDefault();
        var node = event.target;
        switch (node.id) {
            case "btnAgregar":
                this.AgregarEmpleado();
                this.LimpiarForm();
                break;
            case "btnModificar":
                this.ModificarEmpleado();
                this.LimpiarForm();
                break;
            case "btnFiltrar":
                this.MostrarEmpleados(this.FiltrarPorHorario(), this.opcionTabla);
                break;
            case "btnPromedio":
                this.ObtenerPromedioEdad();
                break;
            case "btnNyA":
                this.opcionTabla = 1;
                this.MostrarEmpleados(this.Empleados, this.opcionTabla);
                break;
            case "btnMostrarTodo":
                this.opcionTabla = 0;
                this.MostrarEmpleados(this.Empleados, this.opcionTabla);
                break;
        }
    };
    Manejadora.prototype.LimpiarForm = function () {
        this.$("nombre").value = "";
        this.$("apellido").value = "";
        this.$("edad").value = "";
        this.$("horario").value = "Mañana";
        this.$("legajo").value = "legajo";
    };
    Manejadora.prototype.AgregarEmpleado = function () {
        var nombre = this.$("nombre").value;
        var apellido = this.$("apellido").value;
        var edad = this.$("edad").value;
        var legajo = parseInt(this.$("legajo").value);
        var horario = this.$("horario").value;
        while (!(this.VerificarLegajo(legajo))) {
            legajo++;
        }
        var nuevoEmpleado = new Empleado(parseInt(edad), nombre, apellido, legajo, horario);
        this.Empleados.push(nuevoEmpleado);
        this.MostrarEmpleados(this.Empleados, this.opcionTabla);
    };
    Manejadora.prototype.VerificarLegajo = function (legajo) {
        var listadoFiltrado = this.Empleados.filter(function (item) { return item.legajo == legajo; });
        if (listadoFiltrado.length > 0)
            return false;
        return true;
    };
    Manejadora.prototype.MostrarEmpleados = function (listado, option) {
        var _this = this;
        var tbody = document.getElementById("tbody");
        while (tbody.rows.length > 0) {
            tbody.removeChild(tbody.childNodes[0]);
        }
        var thead = document.getElementById("thead");
        while (thead.rows.length > 0) {
            thead.removeChild(thead.childNodes[0]);
        }
        /*this.$("thEdad").style.display = "inline-table";
        this.$("thLegajo").style.display = "inline-table";
        this.$("thTurno").style.display = "inline-table";
        this.$("thModificar").style.display = "inline-table";
        this.$("thEliminar").style.display = "inline-table";*/
        var rowHead = document.createElement("tr");
        thead.appendChild(rowHead);
        var thNombre = document.createElement("th");
        var textoThNombre = document.createTextNode("NOMBRE");
        rowHead.appendChild(thNombre);
        thNombre.appendChild(textoThNombre);
        var thApellido = document.createElement("th");
        var textoThApellido = document.createTextNode("APELLIDO");
        rowHead.appendChild(thApellido);
        thApellido.appendChild(textoThApellido);
        if (option === 0) {
            var thEdad = document.createElement("th");
            var textoThEdad = document.createTextNode("EDAD");
            rowHead.appendChild(thEdad);
            thEdad.appendChild(textoThEdad);
            var thLegajo = document.createElement("th");
            var textoThLegajo = document.createTextNode("LEGAJO");
            rowHead.appendChild(thLegajo);
            thLegajo.appendChild(textoThLegajo);
            var thTurno = document.createElement("th");
            var textoThTurno = document.createTextNode("TURNO");
            rowHead.appendChild(thTurno);
            thTurno.appendChild(textoThTurno);
            var thModificar = document.createElement("th");
            var textoThModificar = document.createTextNode("MODIFICAR");
            rowHead.appendChild(thModificar);
            thModificar.appendChild(textoThModificar);
            var thEliminar = document.createElement("th");
            var textoThEliminar = document.createTextNode("ELIMINAR");
            rowHead.appendChild(thEliminar);
            thEliminar.appendChild(textoThEliminar);
        }
        listado.forEach(function (elemento) {
            var btnEliminar = document.createElement('input');
            btnEliminar.type = 'button';
            btnEliminar.className = 'btnEliminar';
            btnEliminar.value = "Eliminar";
            btnEliminar.onclick = function () {
                _this.EliminarEmpleado(listado.indexOf(elemento));
            };
            var btnModificar = document.createElement('input');
            btnModificar.type = 'button';
            btnModificar.className = 'btnModificar';
            btnModificar.value = "Modificar";
            btnModificar.onclick = function () {
                _this.CargarDatos(elemento);
            };
            var row = document.createElement("tr");
            tbody.appendChild(row);
            var tdNombre = document.createElement("td");
            var tdApellido = document.createElement("td");
            var textoNombre = document.createTextNode(elemento.nombre);
            var textoApellido = document.createTextNode(elemento.apellido);
            row.appendChild(tdNombre);
            tdNombre.appendChild(textoNombre);
            row.appendChild(tdApellido);
            tdApellido.appendChild(textoApellido);
            if (option === 0) {
                var tdEdad = document.createElement("td");
                var tdLegajo = document.createElement("td");
                var tdHorario = document.createElement("td");
                var tdBotonModificar = document.createElement("td");
                var tdBotonEliminar = document.createElement("td");
                var textoEdad = document.createTextNode(elemento.edad.toString());
                var textoLegajo = document.createTextNode(elemento.legajo.toString());
                var textoHorario = document.createTextNode(elemento.horario);
                row.appendChild(tdNombre);
                tdNombre.appendChild(textoNombre);
                row.appendChild(tdApellido);
                tdApellido.appendChild(textoApellido);
                row.appendChild(tdEdad);
                tdEdad.appendChild(textoEdad);
                row.appendChild(tdLegajo);
                tdLegajo.appendChild(textoLegajo);
                row.appendChild(tdHorario);
                tdHorario.appendChild(textoHorario);
                row.appendChild(tdBotonModificar);
                tdBotonModificar.appendChild(btnModificar);
                row.appendChild(tdBotonEliminar);
                tdBotonEliminar.appendChild(btnEliminar);
            }
            //row.addEventListener("dblclick",()=>this.CargarDatos(elemento));
        });
    };
    Manejadora.prototype.EliminarEmpleado = function (index) {
        this.Empleados.splice(index, 1);
        this.MostrarEmpleados(this.Empleados, this.opcionTabla);
    };
    Manejadora.prototype.CargarDatos = function (empleado) {
        this.$("nombre").value = empleado.nombre;
        this.$("apellido").value = empleado.apellido;
        this.$("edad").value = empleado.edad.toString();
        this.$("legajo").value = empleado.legajo.toString();
        this.$("horario").value = empleado.horario;
    };
    Manejadora.prototype.ModificarEmpleado = function () {
        var _this = this;
        var apellido = this.$("apellido").value;
        var nombre = this.$("nombre").value;
        var edad = this.$("edad").value;
        var legajo = this.$("legajo").value;
        var horario = this.$("horario").value;
        var EmpleadoEliminado = this.Empleados.filter(function (item) { return item.legajo === parseInt(_this.$("legajo").value); });
        var index = this.Empleados.indexOf(EmpleadoEliminado[0]);
        this.Empleados[index].apellido = apellido;
        this.Empleados[index].nombre = nombre;
        this.Empleados[index].edad = parseInt(edad);
        this.Empleados[index].legajo = parseInt(legajo);
        this.Empleados[index].horario = horario;
        this.MostrarEmpleados(this.Empleados, this.opcionTabla);
    };
    Manejadora.prototype.FiltrarPorHorario = function () {
        var listadoFiltrado = this.Empleados;
        if (this.$("filtroPersona").value === "Mañana")
            listadoFiltrado = this.Empleados.filter(function (item) { return item.horario == "Mañana"; });
        else if (this.$("filtroPersona").value === "Tarde")
            listadoFiltrado = this.Empleados.filter(function (item) { return item.horario == "Tarde"; });
        return listadoFiltrado;
    };
    Manejadora.prototype.MostrarNombresYApellidos = function () {
        var listado = this.Empleados.map(function (item) { return { 'nombre': item.nombre, 'apellido': item.apellido }; });
        /* this.$("thEdad").style.display = "none";
         this.$("thLegajo").style.display = "none";
         this.$("thTurno").style.display = "none";
         this.$("thModificar").style.display = "none";
         this.$("thEliminar").style.display = "none";
 */
        this.CargarTablaNombreYApellido(listado);
    };
    Manejadora.prototype.CargarTablaNombreYApellido = function (listado) {
        var tbody = document.getElementById("tbody");
        while (tbody.rows.length > 0) {
            tbody.removeChild(tbody.childNodes[0]);
        }
        listado.forEach(function (elemento) {
            var row = document.createElement("tr");
            tbody.appendChild(row);
            var tdNombre = document.createElement("td");
            var tdApellido = document.createElement("td");
            var textoNombre = document.createTextNode(elemento.nombre);
            var textoApellido = document.createTextNode(elemento.apellido);
            row.appendChild(tdNombre);
            tdNombre.appendChild(textoNombre);
            row.appendChild(tdApellido);
            tdApellido.appendChild(textoApellido);
        });
    };
    Manejadora.prototype.$ = function (id) {
        return document.getElementById(id);
    };
    Manejadora.prototype.ObtenerPromedioEdad = function () {
        var listado = this.FiltrarPorHorario();
        var promedioEdad = listado.reduce(function (acumulador, item) {
            return acumulador + item.edad;
        }, 0) / listado.length;
        this.$("promedioEdad").value = promedioEdad.toString();
    };
    return Manejadora;
}());
window.addEventListener("load", function (event) {
    event.preventDefault();
    var handler = new Manejadora();
    var btnAgregar = handler.$("btnAgregar");
    var btnModificar = handler.$("btnModificar");
    var btnFiltrar = handler.$("btnFiltrar");
    var btnPromedio = handler.$("btnPromedio");
    var btnNyA = handler.$("btnNyA");
    var btnMostrarTodo = handler.$("btnMostrarTodo");
    btnPromedio.addEventListener("click", function (event) { return handler.handleEvent(event); });
    btnFiltrar.addEventListener("click", function (event) { return handler.handleEvent(event); });
    btnAgregar.addEventListener("click", function (event) { return handler.handleEvent(event); });
    btnModificar.addEventListener("click", function (event) { return handler.handleEvent(event); });
    btnMostrarTodo.addEventListener("click", function (event) { return handler.handleEvent(event); });
    btnNyA.addEventListener("click", function (event) { return handler.handleEvent(event); });
});
