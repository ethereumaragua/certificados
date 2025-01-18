//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Admin.sol";

contract Cursos is Admin {

  event LogCategoriaCreada(address admin, uint categoria, string nombre, bool estado);
  event LogCursoCreado(address admin, uint categoria, uint curso, string nombreCurso, string descripcion, uint duracion, uint8 tipoCertificado, address certificador, bool activo);
  event LogCursoModificado(address admin, uint categoria, uint curso, string nombreCurso, string descripcion, uint duracion, uint8 tipoCertificado, address certificador, bool activo);

  struct EstructuraCategoria {
    string nombre;
    bool activa;
  }
  
  EstructuraCategoria[] public arregloCategorias;

  function crearCategoria(string calldata nombre) public onlyRole(ADMIN) {
    uint categoria = arregloCategorias.length;
    arregloCategorias.push(EstructuraCategoria({nombre: nombre, activa: true}));
    arregloCursosPorCategoria.push(0);
    emit LogCategoriaCreada(msg.sender, categoria, nombre, true);
  }

  function modificarCategoria(uint categoria, string calldata nombre, bool estado) public onlyRole(ADMIN) {
    require(categoria < arregloCategorias.length, "Categoria no existe");
    EstructuraCategoria memory registro = EstructuraCategoria({nombre: nombre, activa: estado});
    arregloCategorias[categoria] = registro;
    emit LogCategoriaCreada(msg.sender, categoria, nombre, estado);
  }

  function mostrarArregloDeCategorias()
    public view
    returns(EstructuraCategoria[] memory)
  {
    return arregloCategorias;
  }

  struct EstructuraCurso {
    string nombreCurso;     // Nombre del curso
    string descripcion;     // Descripcion del curso
    uint duracion;          // Duracion del curso
    uint8 tipoCertificado;  // Tipo de certificado
    address certificador;   // Cuenta autorizada para certificar el curso
    bool activo;            // Si el curso se encuentra activo o no
  }

  // Arreglo para almacenar cantidad de cursos que tiene cada categoria
  uint[] public arregloCursosPorCategoria;

  mapping(uint categoria => mapping(uint curso => EstructuraCurso)) public mapCurso;

  function agregarCurso(uint categoria, string calldata nombreCurso, string calldata descripcion, uint duracion, uint8 tipoCertificado, address certificador, bool activo)
    public onlyRole(ADMIN)
  {
    require(arregloCategorias[categoria].activa, "Categoria no activa");
    require(certificador != address(0), "Address certificador incorrecta");
    uint curso = arregloCursosPorCategoria[categoria];
    mapCurso[categoria][curso] = EstructuraCurso({nombreCurso: nombreCurso, descripcion: descripcion, duracion: duracion, tipoCertificado: tipoCertificado, certificador: certificador, activo: activo});
    arregloCursosPorCategoria[categoria]++;
    emit LogCursoCreado(msg.sender, categoria, curso, nombreCurso, descripcion, duracion, tipoCertificado, certificador, activo);
  }

  function modificarCurso(uint categoria, uint curso, string calldata nombreCurso, string calldata descripcion, uint duracion, uint8 tipoCertificado, address certificador, bool activo)
    public onlyRole(ADMIN)
  {
    require (mapCurso[categoria][curso].certificador != address(0), "Curso no existe");
    require(certificador != address(0), "Address certificador incorrecta");
    mapCurso[categoria][curso] = EstructuraCurso({nombreCurso: nombreCurso, descripcion: descripcion, duracion: duracion, tipoCertificado: tipoCertificado, certificador: certificador, activo: activo});
    emit LogCursoModificado(msg.sender, categoria, curso, nombreCurso, descripcion, duracion, tipoCertificado, certificador, activo);
  }

  function mostrarArregloCursosPorCategoria() public view returns(uint[] memory) {
    return arregloCursosPorCategoria;
  }

  function mostrarCantidadDeCursos()
    public view
    returns(uint)
  {
    uint cantidadDeCursos;
    for(uint i = 0; i < arregloCursosPorCategoria.length; i++) {
      cantidadDeCursos += arregloCursosPorCategoria[i];
    }
    return cantidadDeCursos;
  }

  function mostrarCategoriaYCurso(uint categoria, uint curso) public view returns (string memory, EstructuraCurso memory) {
    return (arregloCategorias[categoria].nombre, mapCurso[categoria][curso]);
  }
}