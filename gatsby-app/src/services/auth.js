
export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("gatsbyUser")
    ? JSON.parse(window.localStorage.getItem("gatsbyUser"))
    : {}

const setUser = user =>
  window.localStorage.setItem("gatsbyUser", JSON.stringify(user))

export const handleLogin = ({ token, name, userId }) => {
  if (!!token ) {
    return setUser({
      name,
      token,
      userId
    })
  }
  return false
}

export const isLoggedIn = () => {
  const user = getUser()
  return !!user.token
}

export const logout = callback => {
  setUser({})
  callback()
}