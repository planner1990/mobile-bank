export default function ({ route, redirect }) {
  const token = localStorage.getItem('jwtRefreshKey')
  if (route.fullPath !== '/login' && !token) {
    return redirect('/login')
  } else if (route.fullPath === '/login' && !!token) {
    return redirect('/')
  }
}
