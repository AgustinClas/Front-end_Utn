class Empleado extends Persona{
    
    public legajo:number;
    public horario:string;
    
    constructor(edad:number, nombre:string, apellido:string, legajo:number, horario:string){
        super(edad, nombre, apellido);
        this.legajo = legajo;
        this.horario = horario;
    }

    EmpleadoToJson(){
        return super.PersonaToJson + "Legajo: " + this.legajo + ",Horario: " + this.horario;
    }
}