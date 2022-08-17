export default function ({ route, redirect }) {
  const token = sessionStorage.getItem('mob-jwtKey')
  if (route.fullPath !== '/login' && !token) {
    return redirect('/login')
  } else if (route.fullPath === '/login' && !!token) {
    return redirect('/')
  }
}
