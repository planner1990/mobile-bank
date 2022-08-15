export default function ({ route, redirect }) {
  const token = sessionStorage.getItem('jwtKey')
  if (route.fullPath !== '/login' && !token) {
    return redirect('/login')
  } else if (route.fullPath === '/login' && !!token) {
    return redirect('/')
  }
}
