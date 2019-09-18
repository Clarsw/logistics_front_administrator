import md5 from 'js-md5'

export function setSession (name, auth) {
  sessionStorage.setItem('username', name)
  sessionStorage.setItem('userauth', md5(String(auth)))
}
export function getName () {
  return sessionStorage.getItem('username')
}
export function getAuth () {
  return sessionStorage.getItem('userauth')
}
export function removeSession () {
  sessionStorage.removeItem('username')
  sessionStorage.removeItem('userauth')
}
export default {setSession, getName, removeSession, getAuth}
