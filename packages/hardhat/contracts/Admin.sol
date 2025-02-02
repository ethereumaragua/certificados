//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

contract Admin is AccessControl  {

  struct EstructuraAdmin {
    uint indice;
    string nombre;
  }

  address[] public arregloAdmins;

  mapping(address => EstructuraAdmin) public mapAdmin;

  event LogSuperAdminTransferido(address cuentaAnterior, address cuentaNueva);
  event LogAdminCreado(address cuenta, string nombre);
  event LogAdminEliminado(address cuenta, string nombre);
  event LogAdminNombreModificado(address cuenta, string nombreAnterior, string nombreNuevo); 
  event LogAdminCuentaModificada(address cuentaAnterior, address cuentaNueva);

  bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
  address public superAdmin; // Cuenta Multisig

  constructor(address _superAdmin, address[] memory _admins, string[] memory _nombres) {
    // DEFAULT_ADMIN_ROLE es el rol de super administrador predeterminado
    // este podrá otorgar y revocar cualquier rol.
    _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    superAdmin = msg.sender;
    for (uint i = 0; i < _admins.length; i++) {
        crearAdmin(_admins[i], _nombres[i]);
    }
    cambiarSuperAdmin(_superAdmin);
  }

  function cambiarSuperAdmin(address cuentaNueva)
    public onlyRole(DEFAULT_ADMIN_ROLE)
  {
    address cuentaAnterior = superAdmin;
    _revokeRole(DEFAULT_ADMIN_ROLE, cuentaAnterior);
    _grantRole(DEFAULT_ADMIN_ROLE, cuentaNueva);
    superAdmin = cuentaNueva;
    emit LogSuperAdminTransferido(cuentaAnterior, cuentaNueva);
  }

  function esAdmin(address cuenta)
    public view
    returns(bool)
  {
    return hasRole(ADMIN_ROLE, cuenta);
  }

  function crearAdmin(address admin, string memory nombre)
    public onlyRole(DEFAULT_ADMIN_ROLE)
  {
    require(!hasRole(ADMIN_ROLE, admin), "Cuenta ya posee rol ADMIN_ROLE");
    require(admin != address(0), "Cuenta admin no puede ser address 0");
    mapAdmin[admin].nombre = nombre;
    mapAdmin[admin].indice = arregloAdmins.length;
    arregloAdmins.push(admin);
    _grantRole(ADMIN_ROLE, admin);
    emit LogAdminCreado(admin, nombre);
  }

  function removerAdmin(address admin)
    external onlyRole(DEFAULT_ADMIN_ROLE)
  {
    require(hasRole(ADMIN_ROLE, admin), "Cuenta no posee rol ADMIN_ROLE");
    _revokeRole(ADMIN_ROLE, admin);
    EstructuraAdmin memory filaAEliminar = mapAdmin[admin];
    address ultimoAdmin = arregloAdmins[arregloAdmins.length - 1];
    arregloAdmins[filaAEliminar.indice] = ultimoAdmin;
    mapAdmin[ultimoAdmin].indice = filaAEliminar.indice;
    arregloAdmins.pop();
    emit LogAdminEliminado(admin, filaAEliminar.nombre);
  }

  function modificarNombreAdmin(
        address admin,
        string calldata nombreNuevo)
    public onlyRole(DEFAULT_ADMIN_ROLE)
  {
    require(hasRole(ADMIN_ROLE, admin), "Admin no existe");
    string memory nombreAnterior = mapAdmin[admin].nombre;
    mapAdmin[admin].nombre = nombreNuevo;
    emit LogAdminNombreModificado(admin, nombreAnterior, nombreNuevo);
  }

  function modificarCuentaAdmin(
        address cuentaAnterior,
        address cuentaNueva)
    public onlyRole(DEFAULT_ADMIN_ROLE)
  {
    require(hasRole(ADMIN_ROLE, cuentaAnterior), "Admin no existe");
    EstructuraAdmin memory datosAnteriores = mapAdmin[cuentaAnterior];
    mapAdmin[cuentaNueva].indice = datosAnteriores.indice;
    mapAdmin[cuentaNueva].nombre = datosAnteriores.nombre;
    arregloAdmins[datosAnteriores.indice] = cuentaNueva;
    _revokeRole(ADMIN_ROLE, cuentaAnterior);
    _grantRole(ADMIN_ROLE, cuentaNueva);
    emit LogAdminCuentaModificada(cuentaAnterior, cuentaNueva);
  }

  function mostrarAdmins()
    public view
    returns(address[] memory, string[] memory)
  {
    string[] memory nombres = new string[](arregloAdmins.length);
    for (uint i = 0; i < arregloAdmins.length; i++) {
        nombres[i] = mapAdmin[arregloAdmins[i]].nombre;
    }
    return (arregloAdmins, nombres);
  }
}