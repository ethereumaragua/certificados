/**
 * This file is autogenerated by Scaffold-ETH.
 * You should not edit it manually or your changes might be overwritten.
 */
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const deployedContracts = {
  534352: {
    Certificados: {
      address: "0xdF26Ad13e14676bE014B2c7264AC21Dbc0aC889C",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "_superAdmin",
              type: "address",
            },
            {
              internalType: "address[]",
              name: "_admins",
              type: "address[]",
            },
            {
              internalType: "string[]",
              name: "_nombres",
              type: "string[]",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [],
          name: "AccessControlBadConfirmation",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
            {
              internalType: "bytes32",
              name: "neededRole",
              type: "bytes32",
            },
          ],
          name: "AccessControlUnauthorizedAccount",
          type: "error",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "cuenta",
              type: "address",
            },
            {
              indexed: false,
              internalType: "string",
              name: "nombre",
              type: "string",
            },
          ],
          name: "LogAdminCreado",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "cuentaAnterior",
              type: "address",
            },
            {
              indexed: false,
              internalType: "address",
              name: "cuentaNueva",
              type: "address",
            },
          ],
          name: "LogAdminCuentaModificada",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "cuenta",
              type: "address",
            },
            {
              indexed: false,
              internalType: "string",
              name: "nombre",
              type: "string",
            },
          ],
          name: "LogAdminEliminado",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "cuenta",
              type: "address",
            },
            {
              indexed: false,
              internalType: "string",
              name: "nombreAnterior",
              type: "string",
            },
            {
              indexed: false,
              internalType: "string",
              name: "nombreNuevo",
              type: "string",
            },
          ],
          name: "LogAdminNombreModificado",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "admin",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "categoria",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "string",
              name: "nombre",
              type: "string",
            },
            {
              indexed: false,
              internalType: "bool",
              name: "estado",
              type: "bool",
            },
          ],
          name: "LogCategoriaCreada",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "enum Pais",
              name: "pais",
              type: "uint8",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "usuario",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "string",
              name: "nombre",
              type: "string",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "categoria",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "curso",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "address",
              name: "certificador",
              type: "address",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "idCertificado",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "fecha",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "string",
              name: "nombreCertificador",
              type: "string",
            },
          ],
          name: "LogCertificado",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "usuario",
              type: "address",
            },
            {
              indexed: false,
              internalType: "string",
              name: "nombre",
              type: "string",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "categoria",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "curso",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "address",
              name: "certificador",
              type: "address",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "idCertificado",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "fecha",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "string",
              name: "nombreCertificador",
              type: "string",
            },
          ],
          name: "LogCertificadoAddress",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "enum Pais",
              name: "pais",
              type: "uint8",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "usuario",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "categoria",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "curso",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "address",
              name: "certificador",
              type: "address",
            },
          ],
          name: "LogCertificadoEliminado",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "usuario",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "categoria",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "curso",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "address",
              name: "certificador",
              type: "address",
            },
          ],
          name: "LogCertificadoEliminadoAddress",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "admin",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "categoria",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "curso",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "string",
              name: "nombreCurso",
              type: "string",
            },
            {
              indexed: false,
              internalType: "string",
              name: "descripcion",
              type: "string",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "duracion",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint8",
              name: "tipoCertificado",
              type: "uint8",
            },
            {
              indexed: false,
              internalType: "address",
              name: "certificador",
              type: "address",
            },
            {
              indexed: false,
              internalType: "bool",
              name: "activo",
              type: "bool",
            },
          ],
          name: "LogCursoCreado",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "admin",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "categoria",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "curso",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "string",
              name: "nombreCurso",
              type: "string",
            },
            {
              indexed: false,
              internalType: "string",
              name: "descripcion",
              type: "string",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "duracion",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint8",
              name: "tipoCertificado",
              type: "uint8",
            },
            {
              indexed: false,
              internalType: "address",
              name: "certificador",
              type: "address",
            },
            {
              indexed: false,
              internalType: "bool",
              name: "activo",
              type: "bool",
            },
          ],
          name: "LogCursoModificado",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "cuentaAnterior",
              type: "address",
            },
            {
              indexed: false,
              internalType: "address",
              name: "cuentaNueva",
              type: "address",
            },
          ],
          name: "LogSuperAdminTransferido",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "bytes32",
              name: "role",
              type: "bytes32",
            },
            {
              indexed: true,
              internalType: "bytes32",
              name: "previousAdminRole",
              type: "bytes32",
            },
            {
              indexed: true,
              internalType: "bytes32",
              name: "newAdminRole",
              type: "bytes32",
            },
          ],
          name: "RoleAdminChanged",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "bytes32",
              name: "role",
              type: "bytes32",
            },
            {
              indexed: true,
              internalType: "address",
              name: "account",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "sender",
              type: "address",
            },
          ],
          name: "RoleGranted",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "bytes32",
              name: "role",
              type: "bytes32",
            },
            {
              indexed: true,
              internalType: "address",
              name: "account",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "sender",
              type: "address",
            },
          ],
          name: "RoleRevoked",
          type: "event",
        },
        {
          inputs: [],
          name: "ADMIN_ROLE",
          outputs: [
            {
              internalType: "bytes32",
              name: "",
              type: "bytes32",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "DEFAULT_ADMIN_ROLE",
          outputs: [
            {
              internalType: "bytes32",
              name: "",
              type: "bytes32",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "categoria",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "nombreCurso",
              type: "string",
            },
            {
              internalType: "string",
              name: "descripcion",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "duracion",
              type: "uint256",
            },
            {
              internalType: "uint8",
              name: "tipoCertificado",
              type: "uint8",
            },
            {
              internalType: "address",
              name: "certificador",
              type: "address",
            },
            {
              internalType: "bool",
              name: "activo",
              type: "bool",
            },
          ],
          name: "agregarCurso",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "arregloAdmins",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "arregloCategorias",
          outputs: [
            {
              internalType: "string",
              name: "nombre",
              type: "string",
            },
            {
              internalType: "bool",
              name: "activa",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "arregloCursosPorCategoria",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "cuentaNueva",
              type: "address",
            },
          ],
          name: "cambiarSuperAdmin",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address[]",
              name: "usuarios",
              type: "address[]",
            },
            {
              internalType: "string[]",
              name: "nombres",
              type: "string[]",
            },
            {
              internalType: "uint256",
              name: "categoria",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "curso",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "nombreCertificador",
              type: "string",
            },
          ],
          name: "certificarAddress",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "enum Pais[]",
              name: "paises",
              type: "uint8[]",
            },
            {
              internalType: "uint256[]",
              name: "idUsuarios",
              type: "uint256[]",
            },
            {
              internalType: "string[]",
              name: "nombres",
              type: "string[]",
            },
            {
              internalType: "uint256",
              name: "categoria",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "curso",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "nombreCertificador",
              type: "string",
            },
          ],
          name: "certificarId",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "admin",
              type: "address",
            },
            {
              internalType: "string",
              name: "nombre",
              type: "string",
            },
          ],
          name: "crearAdmin",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "nombre",
              type: "string",
            },
          ],
          name: "crearCategoria",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "enum Pais",
              name: "pais",
              type: "uint8",
            },
            {
              internalType: "uint256",
              name: "usuario",
              type: "uint256",
            },
          ],
          name: "datosYCertificadosUsuario",
          outputs: [
            {
              components: [
                {
                  internalType: "uint256",
                  name: "categoria",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "curso",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "idCertificado",
                  type: "uint256",
                },
              ],
              internalType: "struct Certificados.EstructuraCursoUsuario[]",
              name: "",
              type: "tuple[]",
            },
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "usuario",
              type: "address",
            },
          ],
          name: "datosYCertificadosUsuarioAddress",
          outputs: [
            {
              components: [
                {
                  internalType: "uint256",
                  name: "categoria",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "curso",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "idCertificado",
                  type: "uint256",
                },
              ],
              internalType: "struct Certificados.EstructuraCursoUsuario[]",
              name: "",
              type: "tuple[]",
            },
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "usuario",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "categoria",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "curso",
              type: "uint256",
            },
          ],
          name: "eliminarCertificadoAddress",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "enum Pais",
              name: "pais",
              type: "uint8",
            },
            {
              internalType: "uint256",
              name: "usuario",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "categoria",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "curso",
              type: "uint256",
            },
          ],
          name: "eliminarCertificadoId",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "cuenta",
              type: "address",
            },
          ],
          name: "esAdmin",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "usuario",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "categoria",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "curso",
              type: "uint256",
            },
          ],
          name: "estaCertificadoAddress",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "enum Pais",
              name: "pais",
              type: "uint8",
            },
            {
              internalType: "uint256",
              name: "usuario",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "categoria",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "curso",
              type: "uint256",
            },
          ],
          name: "estaCertificadoId",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "role",
              type: "bytes32",
            },
          ],
          name: "getRoleAdmin",
          outputs: [
            {
              internalType: "bytes32",
              name: "",
              type: "bytes32",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "role",
              type: "bytes32",
            },
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
          ],
          name: "grantRole",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "role",
              type: "bytes32",
            },
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
          ],
          name: "hasRole",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "mapAdmin",
          outputs: [
            {
              internalType: "uint256",
              name: "indice",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "nombre",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "categoria",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "curso",
              type: "uint256",
            },
          ],
          name: "mapCurso",
          outputs: [
            {
              internalType: "string",
              name: "nombreCurso",
              type: "string",
            },
            {
              internalType: "string",
              name: "descripcion",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "duracion",
              type: "uint256",
            },
            {
              internalType: "uint8",
              name: "tipoCertificado",
              type: "uint8",
            },
            {
              internalType: "address",
              name: "certificador",
              type: "address",
            },
            {
              internalType: "bool",
              name: "activo",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "enum Pais",
              name: "",
              type: "uint8",
            },
            {
              internalType: "uint256",
              name: "usuario",
              type: "uint256",
            },
          ],
          name: "mapUsuario",
          outputs: [
            {
              internalType: "string",
              name: "nombre",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "usuario",
              type: "address",
            },
          ],
          name: "mapUsuarioAddress",
          outputs: [
            {
              internalType: "string",
              name: "nombre",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "categoria",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "nombre",
              type: "string",
            },
            {
              internalType: "bool",
              name: "estado",
              type: "bool",
            },
          ],
          name: "modificarCategoria",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "cuentaAnterior",
              type: "address",
            },
            {
              internalType: "address",
              name: "cuentaNueva",
              type: "address",
            },
          ],
          name: "modificarCuentaAdmin",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "categoria",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "curso",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "nombreCurso",
              type: "string",
            },
            {
              internalType: "string",
              name: "descripcion",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "duracion",
              type: "uint256",
            },
            {
              internalType: "uint8",
              name: "tipoCertificado",
              type: "uint8",
            },
            {
              internalType: "address",
              name: "certificador",
              type: "address",
            },
            {
              internalType: "bool",
              name: "activo",
              type: "bool",
            },
          ],
          name: "modificarCurso",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "admin",
              type: "address",
            },
            {
              internalType: "string",
              name: "nombreNuevo",
              type: "string",
            },
          ],
          name: "modificarNombreAdmin",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "mostrarAdmins",
          outputs: [
            {
              internalType: "address[]",
              name: "",
              type: "address[]",
            },
            {
              internalType: "string[]",
              name: "",
              type: "string[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "mostrarArregloCursosPorCategoria",
          outputs: [
            {
              internalType: "uint256[]",
              name: "",
              type: "uint256[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "mostrarArregloDeCategorias",
          outputs: [
            {
              components: [
                {
                  internalType: "string",
                  name: "nombre",
                  type: "string",
                },
                {
                  internalType: "bool",
                  name: "activa",
                  type: "bool",
                },
              ],
              internalType: "struct Cursos.EstructuraCategoria[]",
              name: "",
              type: "tuple[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "mostrarCantidadDeCursos",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "categoria",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "curso",
              type: "uint256",
            },
          ],
          name: "mostrarCategoriaYCurso",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
            {
              components: [
                {
                  internalType: "string",
                  name: "nombreCurso",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "descripcion",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "duracion",
                  type: "uint256",
                },
                {
                  internalType: "uint8",
                  name: "tipoCertificado",
                  type: "uint8",
                },
                {
                  internalType: "address",
                  name: "certificador",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "activo",
                  type: "bool",
                },
              ],
              internalType: "struct Cursos.EstructuraCurso",
              name: "",
              type: "tuple",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "admin",
              type: "address",
            },
          ],
          name: "removerAdmin",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "role",
              type: "bytes32",
            },
            {
              internalType: "address",
              name: "callerConfirmation",
              type: "address",
            },
          ],
          name: "renounceRole",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "role",
              type: "bytes32",
            },
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
          ],
          name: "revokeRole",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "superAdmin",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes4",
              name: "interfaceId",
              type: "bytes4",
            },
          ],
          name: "supportsInterface",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      inheritedFunctions: {
        ADMIN_ROLE: "contracts/Cursos.sol",
        DEFAULT_ADMIN_ROLE: "contracts/Cursos.sol",
        agregarCurso: "contracts/Cursos.sol",
        arregloAdmins: "contracts/Cursos.sol",
        arregloCategorias: "contracts/Cursos.sol",
        arregloCursosPorCategoria: "contracts/Cursos.sol",
        cambiarSuperAdmin: "contracts/Cursos.sol",
        crearAdmin: "contracts/Cursos.sol",
        crearCategoria: "contracts/Cursos.sol",
        esAdmin: "contracts/Cursos.sol",
        getRoleAdmin: "contracts/Cursos.sol",
        grantRole: "contracts/Cursos.sol",
        hasRole: "contracts/Cursos.sol",
        mapAdmin: "contracts/Cursos.sol",
        mapCurso: "contracts/Cursos.sol",
        modificarCategoria: "contracts/Cursos.sol",
        modificarCuentaAdmin: "contracts/Cursos.sol",
        modificarCurso: "contracts/Cursos.sol",
        modificarNombreAdmin: "contracts/Cursos.sol",
        mostrarAdmins: "contracts/Cursos.sol",
        mostrarArregloCursosPorCategoria: "contracts/Cursos.sol",
        mostrarArregloDeCategorias: "contracts/Cursos.sol",
        mostrarCantidadDeCursos: "contracts/Cursos.sol",
        mostrarCategoriaYCurso: "contracts/Cursos.sol",
        removerAdmin: "contracts/Cursos.sol",
        renounceRole: "contracts/Cursos.sol",
        revokeRole: "contracts/Cursos.sol",
        superAdmin: "contracts/Cursos.sol",
        supportsInterface: "contracts/Cursos.sol",
      },
    },
  },
} as const;

export default deployedContracts satisfies GenericContractsDeclaration;
