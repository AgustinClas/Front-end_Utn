window.addEventListener("load", PeticionGET);



function PeticionGET(){
    var spinner = document.getElementById("spinner");
    spinner.hidden = false;
    var peticionHttp = new XMLHttpRequest();

    peticionHttp.onreadystatechange = function(){
        if(peticionHttp.readyState == 4 && peticionHttp.status == 200){            
            GenerarTabla(document.getElementById("cuerpoTabla"), JSON.parse(peticionHttp.responseText));
            
        }        
    }
    peticionHttp.open("GET","http://localhost:3000/materias");    
    peticionHttp.send();

    spinner.hidden = true;
}

function GenerarTabla(tabla, elementos){

    
    elementos.forEach(elemento=>{

    
        var row = document.createElement("tr");
        tabla.appendChild(row);
    
        var tdId = document.createElement("td");
        var tdNombre = document.createElement("td");
        var tdCuatrimestre = document.createElement("td");
        var tdFechaFinal = document.createElement("td");
        var tdTurno = document.createElement("td");
    
        var textoId = document.createTextNode(elemento.id);
        var textoNombre = document.createTextNode(elemento.nombre);
        var textoCuatrimestre = document.createTextNode(elemento.cuatrimestre);
        var textoFechaFinal = document.createTextNode(elemento.fechaFinal);
        var textoTurno = document.createTextNode(elemento.turno);
    
        row.appendChild(tdId);
        tdId.style="display:none;";
        tdId.appendChild(textoId);
    
        row.appendChild(tdNombre);
        tdNombre.appendChild(textoNombre);
    
        row.appendChild(tdCuatrimestre);
        tdCuatrimestre.appendChild(textoCuatrimestre);
    
        row.appendChild(tdFechaFinal);
        tdFechaFinal.appendChild(textoFechaFinal);
    
        row.appendChild(tdTurno);
        tdTurno.appendChild(textoTurno);
    
        row.addEventListener("dblclick",LeerFila);

    })
}

function LeerFila(e)
{
    var divMateria=document.getElementById("materia");

    divMateria.hidden=false;

    var tabla=document.getElementById("cuerpoTabla");

    var row=e.target.parentNode;
    var id=row.childNodes[0].childNodes[0].nodeValue;
    var nombre=row.childNodes[1].childNodes[0].nodeValue;
    var Cuatrimestre=row.childNodes[2].childNodes[0].nodeValue;
    var fechaFinalDMA=row.childNodes[3].childNodes[0].nodeValue;
    var turno=row.childNodes[4].childNodes[0].nodeValue;


    var dia = fechaFinalDMA[0] + "" + fechaFinalDMA[1]; 
    var mes = fechaFinalDMA[3] + "" + fechaFinalDMA[4];
    var año = fechaFinalDMA[6] + "" + fechaFinalDMA[7] + fechaFinalDMA[8] + "" + fechaFinalDMA[9];
    var fechaFinalAMD = año + "-" + mes + "-" + dia;
    

    document.getElementById("nombre").value=nombre;
    document.getElementById("cuatrimestre").value=Cuatrimestre;
    document.getElementById("fechaFinal").value=fechaFinalAMD;
    
    if(turno == "Mañana")
    {
        document.getElementById("mañana").checked=true;
    }
    else
    {
        document.getElementById("tarde").checked=true;
    }

    //funcion eliminar
    document.getElementById("btnEliminar").onclick = function(){

        
        var spinner = document.getElementById("spinner");
        spinner.hidden = false;

        var peticionHttp = new XMLHttpRequest();
        peticionHttp.open("POST", "http://localhost:3000/eliminar")

        peticionHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        peticionHttp.send(JSON.stringify({"nombre":nombre,"Cuatrimestre":Cuatrimestre,"fechaFinal":fechaFinalDMA,"turno":turno,"id":id}));

        peticionHttp.onreadystatechange = function(){
            if(peticionHttp.readyState == 4 && peticionHttp.status == 200 /*&& JSON.parse(peticionHttp.responseText).type == "ok"*/){            
                tabla.removeChild(row);
            }        
        }

        spinner.hidden = true;
        divMateria.hidden=true;

    }

    //funcion modificar
    document.getElementById("btnModificar").onclick = function(){

        var contadorValidacion = 0;

        if(document.getElementById("nombre").value.length <= 6 ){
            contadorValidacion++;
            document.getElementById("nombre").className = "error";
        }

        if(new Date(document.getElementById("fechaFinal").value) < new Date()){
            contadorValidacion++;
            document.getElementById("fechaFinal").className = "error";
        }

        if(!(document.getElementById("mañana").checked ||  document.getElementById("tarde").checked)){
            document.getElementById("mañana").className = "error";
            document.getElementById("tarde").className = "error";
            contadorValidacion++;
        }

        if(contadorValidacion == 0){

            
            var nuevoNombre = document.getElementById("nombre").value
            var nuevaFecha = document.getElementById("fechaFinal").value;

            var dia = nuevaFecha[8] + "" + nuevaFecha[9]; 
            var mes = nuevaFecha[5] + "" + nuevaFecha[6];
            var año = nuevaFecha[0] + "" + nuevaFecha[1] + nuevaFecha[2] + "" + nuevaFecha[3];
            var fechaFinalDMA = dia + "-" + mes + "-" + año;

            var nuevoTurno = "tarde";

            if(document.getElementById("mañana").checked){
                nuevoTurno = "mañana";
            }

            var spinner = document.getElementById("spinner");
            spinner.hidden = false;

            var peticionHttp = new XMLHttpRequest();
           
            
            peticionHttp.onreadystatechange = function(){
                if(peticionHttp.readyState == 4 && peticionHttp.status == 200 )/*&& JSON.parse(peticionHttp.responseText).type == "ok"*/{            
                    row.childNodes[1].childNodes[0].nodeValue = nuevoNombre;
                    row.childNodes[3].childNodes[0].nodeValue = fechaFinalDMA;
                    row.childNodes[4].childNodes[0].nodeValue = nuevoTurno;
                    
                }        
            }

            peticionHttp.open("POST", "http://localhost:3000/editar");
            peticionHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            peticionHttp.send(JSON.stringify({"nombre":nuevoNombre,"Cuatrimestre":Cuatrimestre,"fechaFinal":fechaFinalDMA,"turno":nuevoTurno,"id":id}));

            spinner.hidden = true;
            divMateria.hidden=true;
            
        }


    }
}