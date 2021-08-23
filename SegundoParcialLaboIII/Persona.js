var Persona = /** @class */ (function () {
    function Persona(edad, nombre, apellido) {
        this.edad = edad;
        this.nombre = nombre;
        this.apellido = apellido;
    }
    Persona.prototype.PersonaToJson = function () {
        return "{Nombre: " + this.nombre + " ,Apellido: " + this.apellido + " ,Edad: " + this.edad + "}";
    };
    return Persona;
}());
