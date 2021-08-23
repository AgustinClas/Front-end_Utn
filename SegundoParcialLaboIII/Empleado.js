var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Empleado = /** @class */ (function (_super) {
    __extends(Empleado, _super);
    function Empleado(edad, nombre, apellido, legajo, horario) {
        var _this = _super.call(this, edad, nombre, apellido) || this;
        _this.legajo = legajo;
        _this.horario = horario;
        return _this;
    }
    Empleado.prototype.EmpleadoToJson = function () {
        return _super.prototype.PersonaToJson + "Legajo: " + this.legajo + ",Horario: " + this.horario;
    };
    return Empleado;
}(Persona));
