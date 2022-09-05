/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('/login', 'SessionsController.store')
Route.post('/logout', 'SessionsController.destroy')

Route.group(() => {
  Route.post('', 'UsersController.store')
  Route.get('', 'UsersController.index').middleware('auth')
  Route.get('/:id', 'UsersController.show').middleware('auth')
  Route.put('/:id', 'UsersController.update').middleware('auth')
  Route.delete('/:id', 'UsersController.destroy').middleware('auth')
}).prefix('/users')

Route.group(() => {
  Route.post('', 'SessionsController.store')
  Route.get('', 'SessionsController.index')
  Route.delete('', 'SessionsController.destroy')
}).prefix('/sessions')

Route.group(() => {
  Route.post('', 'CollaboratorsController.store')
  Route.get('', 'CollaboratorsController.index')
})
  .prefix('/collaborators')
  .middleware('auth')
