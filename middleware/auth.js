export default function ({ route, redirect }) {
  const token = sessionStorage.getItem('jwtKey')
  console.log(token)
  if (route.fullPath !== '/login' && !token) {
    return redirect('/login')
  } else if (route.fullPath === '/login' && !!token) {
    return redirect('/')
  }
}
