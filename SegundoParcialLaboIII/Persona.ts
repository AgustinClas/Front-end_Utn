class Persona{
    public edad:number;
    public nombre:string;
    public apellido:string;

    constructor(edad:number, nombre:string, apellido:string){
        this.edad = edad;
        this.nombre = nombre;
        this.apellido = apellido;
    }

    PersonaToJson(){
        return "{Nombre: " + this.nombre + " ,Apellido: " + this.apellido + " ,Edad: " + this.edad + "}";
    }
}