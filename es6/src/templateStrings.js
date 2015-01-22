export function usersWidget(users) {

  return '<ul>' +

  users.reduce((previous, current) => {
    return (previous + `<li>${current.first} ${current.last}</li>`)
  }, '')

  + '</ul>';
}