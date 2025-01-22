//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Cursos.sol";
import "./Paises.sol";

contract Certificados is Cursos {

  event LogCertificado(Pais pais, uint usuario, string nombre, uint categoria, uint curso, address certificador, uint indexed idCertificado, uint fecha, string nombreCertificador);
  event LogCertificadoEliminado(Pais pais, uint usuario, uint categoria, uint curso, address certificador);

  uint certificadoContador;

  struct EstructuraCursoUsuario {
    uint categoria;
    uint curso;
    uint idCertificado;
  }

  struct EstructuraUsuario {
    EstructuraCursoUsuario[] arregloCursosUsuario;
    string nombre;
  }

  mapping(Pais => mapping(uint usuario => EstructuraUsuario)) public mapUsuario;

  constructor(address _superAdmin, address[] memory _admins, string[] memory _nombres) Cursos(_superAdmin, _admins, _nombres) {}

  function datosYCertificadosUsuario(Pais pais, uint usuario) public view returns (EstructuraCursoUsuario[] memory, string memory) {
    return (mapUsuario[pais][usuario].arregloCursosUsuario, mapUsuario[pais][usuario].nombre);
  }

  function estaCertificadoId(Pais pais, uint usuario, uint categoria, uint curso)
    public view
    returns (bool)
  {
    require(mapCurso[categoria][curso].certificador != address(0), "Curso no existe");
    EstructuraCursoUsuario[] memory cursos =  mapUsuario[pais][usuario].arregloCursosUsuario;
    for (uint i = 0; i < cursos.length; i++)
    {
      if(cursos[i].categoria == categoria && cursos[i].curso == curso)
        return true;
    }
    return false;
  }

  function certificarId(Pais[] calldata paises, uint[] calldata idUsuarios, string[] calldata nombres, uint categoria, uint curso, string calldata nombreCertificador) public {
    require(msg.sender == mapCurso[categoria][curso].certificador, "No autorizado para este curso");
    require(mapCurso[categoria][curso].activo, "Curso no activo");
    for (uint i = 0; i < idUsuarios.length; i++)
    {
      _certificarId(paises[i], idUsuarios[i], nombres[i], categoria, curso, nombreCertificador);
    }
  }

  function _certificarId(Pais pais, uint usuario, string memory nombre, uint categoria, uint curso, string memory nombreCertificador) internal {
    if(!estaCertificadoId(pais, usuario, categoria, curso)) {
      mapUsuario[pais][usuario].arregloCursosUsuario.push(EstructuraCursoUsuario({categoria: categoria, curso: curso, idCertificado: certificadoContador}));
      if(keccak256(abi.encodePacked(mapUsuario[pais][usuario].nombre)) != keccak256(abi.encodePacked(nombre)))
        mapUsuario[pais][usuario].nombre = nombre;
      emit LogCertificado(pais, usuario, nombre, categoria, curso, msg.sender, certificadoContador, block.timestamp, nombreCertificador);
      certificadoContador++;
    }
  }

  function eliminarCertificadoId(Pais pais, uint usuario, uint categoria, uint curso) public {
    require(msg.sender == mapCurso[categoria][curso].certificador, "No autorizado para este curso");
    require(estaCertificadoId(pais, usuario, categoria, curso), "Usuario no certificado en este curso");
    require(mapCurso[categoria][curso].certificador != address(0), "Curso no existe");
    EstructuraCursoUsuario[] memory cursos = mapUsuario[pais][usuario].arregloCursosUsuario;
    bool encontrado = false;
    for(uint i = 0; i < cursos.length; i++) {
      if(cursos[i].categoria == categoria && cursos[i].curso == curso)
      {
        encontrado = true;
        mapUsuario[pais][usuario].arregloCursosUsuario[i] = cursos[cursos.length - 1];
        mapUsuario[pais][usuario].arregloCursosUsuario.pop();
        emit LogCertificadoEliminado(pais, usuario, categoria, curso, msg.sender);
      }
    }
    require(encontrado, "Curso no encontrado");
  }

  event LogCertificadoAddress(address usuario, string nombre, uint categoria, uint curso, address certificador, uint indexed idCertificado, uint fecha, string nombreCertificador);
  event LogCertificadoEliminadoAddress(address usuario, uint categoria, uint curso, address certificador);

  mapping(address usuario => EstructuraUsuario) public mapUsuarioAddress;

  function certificarAddress(address[] calldata usuarios, string[] calldata nombres, uint categoria, uint curso, string calldata nombreCertificador) public {
    require(msg.sender == mapCurso[categoria][curso].certificador, "No autorizado para este curso");
    require(mapCurso[categoria][curso].activo, "Curso no activo");
    for (uint i = 0; i < usuarios.length; i++)
    {
      _certificarAddress(usuarios[i], nombres[i], categoria, curso, nombreCertificador);
    }
  }

  function _certificarAddress(address usuario, string memory nombre, uint categoria, uint curso, string memory nombreCertificador) internal {
    if(!estaCertificadoAddress(usuario, categoria, curso)) {
      mapUsuarioAddress[usuario].arregloCursosUsuario.push(EstructuraCursoUsuario({categoria: categoria, curso: curso, idCertificado: certificadoContador}));
      if(keccak256(abi.encodePacked(mapUsuarioAddress[usuario].nombre)) != keccak256(abi.encodePacked(nombre)))
        mapUsuarioAddress[usuario].nombre = nombre;
      emit LogCertificadoAddress(usuario, nombre, categoria, curso, msg.sender, certificadoContador, block.timestamp, nombreCertificador);
      certificadoContador++;
    }
  }

  function eliminarCertificadoAddress(address usuario, uint categoria, uint curso) public {
    require(msg.sender == mapCurso[categoria][curso].certificador, "No autorizado para este curso");
    require(estaCertificadoAddress(usuario, categoria, curso), "Usuario no certificado en este curso");
    require(mapCurso[categoria][curso].certificador != address(0), "Curso no existe");
    EstructuraCursoUsuario[] memory cursos = mapUsuarioAddress[usuario].arregloCursosUsuario;
    bool encontrado = false;
    for(uint i = 0; i < cursos.length; i++) {
      if(cursos[i].categoria == categoria && cursos[i].curso == curso)
      {
        encontrado = true;
        mapUsuarioAddress[usuario].arregloCursosUsuario[i] = cursos[cursos.length - 1];
        mapUsuarioAddress[usuario].arregloCursosUsuario.pop();
        emit LogCertificadoEliminadoAddress(usuario, categoria, curso, msg.sender);
      }
    }
    require(encontrado, "Curso no encontrado");
  }

  function estaCertificadoAddress(address usuario, uint categoria, uint curso)
    public view
    returns (bool)
  {
    require(mapCurso[categoria][curso].certificador != address(0), "Curso no existe");
    EstructuraCursoUsuario[] memory cursos =  mapUsuarioAddress[usuario].arregloCursosUsuario;
    for (uint i = 0; i < cursos.length; i++)
    {
      if(cursos[i].categoria == categoria && cursos[i].curso == curso)
        return true;
    }
    return false;
  }

  function datosYCertificadosUsuarioAddress(address usuario) public view returns (EstructuraCursoUsuario[] memory, string memory) {
    return (mapUsuarioAddress[usuario].arregloCursosUsuario, mapUsuarioAddress[usuario].nombre);
  }
}