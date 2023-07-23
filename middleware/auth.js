export default function ({ route, redirect }) {
  const token = localStorage.getItem('mob-jwtRefreshKey')

  if (route.fullPath !== '/login' && !token) {
    return redirect('/login')
  } else if (route.fullPath === '/login' && !!token) {
    // if user before login and again go to /login
    return redirect('/')
  }
}
