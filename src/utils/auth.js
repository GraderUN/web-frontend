import Cookies from 'js-cookie'

const TokenKey = 'Token'
const Rol = 'Rol'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getRol() {
  return Cookies.get(Rol)
}

export function setRol(rol) {
  return Cookies.set(Rol, rol)
}

export function removeRol() {
  return Cookies.remove(Rol)
}
