class Manejadora implements EventListenerObject{

    public Empleados:Array<Empleado>;
    public opcionTabla;

    constructor(){
        this.Empleados = new Array<Empleado>();
        this.opcionTabla = 0;
    }

    public handleEvent(event:Event){
        event.preventDefault();

        let node: Element = <Element>event.target;

        switch(node.id){
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
    }

    LimpiarForm(){
        this.$("nombre").value = "";
        this.$("apellido").value = "";
        this.$("edad").value = "";
        this.$("horario").value = "Mañana";
        this.$("legajo").value = "legajo";
    }

    AgregarEmpleado(){
        
        let nombre = this.$("nombre").value;
        let apellido= this.$("apellido").value;
        let edad = this.$("edad").value;
        let legajo = parseInt(this.$("legajo").value);
        let horario = this.$("horario").value;

        while(!(this.VerificarLegajo(legajo))){
            legajo++;
        }


        let nuevoEmpleado = new Empleado(parseInt(edad), nombre, apellido, legajo, horario);

        this.Empleados.push(nuevoEmpleado);
        
        this.MostrarEmpleados(this.Empleados, this.opcionTabla);
    
    }

    VerificarLegajo(legajo:number){
        let listadoFiltrado = this.Empleados.filter(item => item.legajo == legajo);

        if(listadoFiltrado.length > 0) return false

        return true;
    }

    MostrarEmpleados(listado:Array<Empleado>, option:number){

        let tbody = <HTMLTableElement>document.getElementById("tbody"); 
        while (tbody.rows.length > 0) {
            tbody.removeChild(tbody.childNodes[0]);
        }

        let thead = <HTMLTableElement>document.getElementById("thead");
        while (thead.rows.length > 0) {
            thead.removeChild(thead.childNodes[0]);
        }

        /*this.$("thEdad").style.display = "inline-table";
        this.$("thLegajo").style.display = "inline-table";
        this.$("thTurno").style.display = "inline-table";
        this.$("thModificar").style.display = "inline-table";
        this.$("thEliminar").style.display = "inline-table";*/

        let rowHead = document.createElement("tr");
        thead.appendChild(rowHead);

        let thNombre = document.createElement("th");
        let textoThNombre = document.createTextNode("NOMBRE");
        rowHead.appendChild(thNombre);
        thNombre.appendChild(textoThNombre);

        let thApellido = document.createElement("th");
        let textoThApellido = document.createTextNode("APELLIDO");
        rowHead.appendChild(thApellido);
        thApellido.appendChild(textoThApellido);

        if(option === 0){ 
        let thEdad = document.createElement("th");
        let textoThEdad = document.createTextNode("EDAD");
        rowHead.appendChild(thEdad);
        thEdad.appendChild(textoThEdad);

        let thLegajo = document.createElement("th");
        let textoThLegajo = document.createTextNode("LEGAJO");
        rowHead.appendChild(thLegajo);
        thLegajo.appendChild(textoThLegajo);

        let thTurno = document.createElement("th");
        let textoThTurno = document.createTextNode("TURNO");
        rowHead.appendChild(thTurno);
        thTurno.appendChild(textoThTurno);

        let thModificar = document.createElement("th");
        let textoThModificar = document.createTextNode("MODIFICAR");
        rowHead.appendChild(thModificar);
        thModificar.appendChild(textoThModificar);

        let thEliminar = document.createElement("th");
        let textoThEliminar = document.createTextNode("ELIMINAR");
        rowHead.appendChild(thEliminar);
        thEliminar.appendChild(textoThEliminar);
        }
      
    
        listado.forEach(elemento=>{   

            let btnEliminar = document.createElement('input');
            btnEliminar.type = 'button';
            btnEliminar.className = 'btnEliminar';
            btnEliminar.value = "Eliminar";
            btnEliminar.onclick = () =>{
                this.EliminarEmpleado(listado.indexOf(elemento))
              };

            let btnModificar = document.createElement('input');
            btnModificar.type = 'button';
            btnModificar.className = 'btnModificar';
            btnModificar.value = "Modificar";
            btnModificar.onclick = () =>{
                this.CargarDatos(elemento)
              };
            
            
            let row = document.createElement("tr");
            tbody.appendChild(row);
            

            let tdNombre = document.createElement("td");
            let tdApellido = document.createElement("td");
            let textoNombre = document.createTextNode(elemento.nombre);
            let textoApellido = document.createTextNode(elemento.apellido);

            row.appendChild(tdNombre);
            tdNombre.appendChild(textoNombre);
                
            row.appendChild(tdApellido);
            tdApellido.appendChild(textoApellido);

            if(option === 0){ 
                let tdEdad = document.createElement("td");
                let tdLegajo = document.createElement("td");
                let tdHorario = document.createElement("td");
                let tdBotonModificar = document.createElement("td");
                let tdBotonEliminar = document.createElement("td");

                
                let textoEdad = document.createTextNode(elemento.edad.toString());
                let textoLegajo = document.createTextNode(elemento.legajo.toString());
                let textoHorario = document.createTextNode(elemento.horario);
                            
                    
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
        
    }


    EliminarEmpleado(index:number){
        this.Empleados.splice(index,1);
        this.MostrarEmpleados(this.Empleados, this.opcionTabla);
    }


    CargarDatos(empleado:Empleado){
        this.$("nombre").value = empleado.nombre;
        this.$("apellido").value = empleado.apellido;
        this.$("edad").value = empleado.edad.toString();
        this.$("legajo").value = empleado.legajo.toString();
        this.$("horario").value = empleado.horario;


    }

    ModificarEmpleado(){

        
        let apellido= this.$("apellido").value;
        let nombre = this.$("nombre").value;
        let edad = this.$("edad").value;
        let legajo = this.$("legajo").value;
        let horario = this.$("horario").value;

        let EmpleadoEliminado = this.Empleados.filter(item => item.legajo === parseInt(this.$("legajo").value));
        let index = this.Empleados.indexOf(EmpleadoEliminado[0]);
     
        this.Empleados[index].apellido = apellido;
        this.Empleados[index].nombre = nombre;
        this.Empleados[index].edad = parseInt(edad);
        this.Empleados[index].legajo = parseInt(legajo);
        this.Empleados[index].horario = horario;

        this.MostrarEmpleados(this.Empleados, this.opcionTabla);
    }
    
    FiltrarPorHorario(){
        let listadoFiltrado = this.Empleados;

        if(this.$("filtroPersona").value === "Mañana") listadoFiltrado = this.Empleados.filter(item => item.horario == "Mañana");
        else if(this.$("filtroPersona").value === "Tarde") listadoFiltrado = this.Empleados.filter(item => item.horario == "Tarde");

        return listadoFiltrado
    }

    MostrarNombresYApellidos(){
        let listado = this.Empleados.map(function(item){return {'nombre':item.nombre, 'apellido':item.apellido}});

       /* this.$("thEdad").style.display = "none";
        this.$("thLegajo").style.display = "none";
        this.$("thTurno").style.display = "none";
        this.$("thModificar").style.display = "none";
        this.$("thEliminar").style.display = "none";
*/
        this.CargarTablaNombreYApellido(listado);

        
    }

    CargarTablaNombreYApellido(listado){
        let tbody = <HTMLTableElement>document.getElementById("tbody"); 
        while (tbody.rows.length > 0) {
            tbody.removeChild(tbody.childNodes[0]);
        }
            
    
        listado.forEach(elemento=>{   


            let row = document.createElement("tr");
            tbody.appendChild(row);

            let tdNombre = document.createElement("td");
            let tdApellido = document.createElement("td");

            let textoNombre = document.createTextNode(elemento.nombre);
            let textoApellido = document.createTextNode(elemento.apellido);

            row.appendChild(tdNombre);
            tdNombre.appendChild(textoNombre);
                
            row.appendChild(tdApellido);
            tdApellido.appendChild(textoApellido);
        });
    }


    $(id: string): HTMLInputElement {
        return <HTMLInputElement>document.getElementById(id);
    }

    ObtenerPromedioEdad(){
        let listado = this.FiltrarPorHorario();

        let promedioEdad = listado.reduce((acumulador, item)=>{
            return acumulador + item.edad;
        },0) / listado.length;

        this.$("promedioEdad").value=promedioEdad.toString();
    }

}



  window.addEventListener("load", (event) => {
    event.preventDefault();

    let handler = new Manejadora();
    let btnAgregar = <HTMLElement>handler.$("btnAgregar");
    let btnModificar = <HTMLElement>handler.$("btnModificar");
    let btnFiltrar = <HTMLElement>handler.$("btnFiltrar");
    let btnPromedio = <HTMLElement>handler.$("btnPromedio");
    let btnNyA = <HTMLElement>handler.$("btnNyA");
    let btnMostrarTodo = <HTMLElement>handler.$("btnMostrarTodo");

    btnPromedio.addEventListener("click", (event) => handler.handleEvent(event));
    btnFiltrar.addEventListener("click", (event) => handler.handleEvent(event));
    btnAgregar.addEventListener("click", (event) => handler.handleEvent(event));
    btnModificar.addEventListener("click", (event) => handler.handleEvent(event));
    btnMostrarTodo.addEventListener("click", (event) => handler.handleEvent(event));
    btnNyA.addEventListener("click", (event) => handler.handleEvent(event));
  });