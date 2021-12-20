
export default [
  {
    name: 'name',
    title: '<span class="orange glyphicon glyphicon-user"></span> Full Name',
    sortField: 'name'
  },
  {
    name: 'email',
    sortField: 'email'
  },
  'birthdate',
  'nickname',
  {
    name: 'gender',
    formatter: (value) => {
      return value === 'M' ? 'Male' : 'Female'
    }
  },
  'actions'
]
