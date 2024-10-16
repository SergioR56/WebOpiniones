# Portal-de-Opiniones

Este proyecto consiste en crear una API que funcione como un portal donde la gente pueda dar su opinión sobre cualquier tema.

## Instalar

1. Instalar las dependencias mediante el comando `npm install` o `npm i`.
2. Guardar el archivo `.env.example` como `.env` y cubrir los datos necesarios.
3. Ejecutar `npm run initDb` para crear las tablas necesarias en la base de datos anteriormente creada.
4. Ejecutar `npm run dev` para lanzar el servidor.

## Entidades

### User

| Campo      | Tipo     | Descripción                           |
| ---------- | -------- | ------------------------------------- |
| id         | INT      | Identificador único del usuario.      |
| email      | VARCHAR  | Dirección de correo electrónico.      |
| username   | VARCHAR  | Nombre de usuario.                    |
| password   | VARCHAR  | Contraseña del usuario.               |
| avatar     | VARCHAR  | Nombre del avatar del usuario.        |
| role       | VARCHAR  | Rol del usuario (normal o admin).     |
| createdAt  | DATETIME | Fecha y hora de creación del usuario. |
| modifiedAt | DATETIME | Fecha y hora de última modificación.  |

### Follows

| Campo      | Tipo     | Descripción                                |
| ---------- | -------- | -------------------------------------      |
| id         | INT      | Identificador único del follow.            |
| userId     | INT      | Identificador del usuario que da a seguir. |
| followedId | INT      | Identificador del usuario que seguimos.    |
| createdAt  | DATETIME | Fecha y hora de follow.                    |

### Posts

| Campo     | Tipo     | Descripción                                   |
| --------- | -------- | --------------------------------------------  |
| id        | INT      | Identificador único del post.                 |
| userId    | INT      | Identificador del usuario que creó el post.   |
| text      | VARCHAR  | Texto del post.                               |
| image     | VARCHAR  | Nombre de la imagen adjunta al post.          |
| createdAt | DATETIME | Fecha y hora de creación del post.            |

### Likes

| Campo     | Tipo     | Descripción                                   |
| --------- | -------- | --------------------------------------------  |
| id        | INT      | Identificador único del like.                 |
| userId    | INT      | Identificador del usuario que dio el like.    |
| postId    | INT      | Identificador del post que recibió el like.   |
| createdAt | DATETIME | Fecha y hora de creación del like.            |

### Comments

| Campo     | Tipo     | Descripción                                         |
| --------- | -------- | --------------------------------------------        |
| id        | INT      | Identificador único del comentario.                 |
| userId    | INT      | Identificador del usuario que comento el post.      |
| text      | VARCHAR  | Texto del comentario.                               |
| image     | VARCHAR  | Nombre de la imagen adjunta al comentario.          |
| postId    | INT      | Identificador del post que recibió el comentario.   |
| createdAt | DATETIME | Fecha y hora de creación del comentario.            |

### Saves

| Campo     | Tipo     | Descripción                                    |
| --------- | -------- | --------------------------------------------   |
| id        | INT      | Identificador único del post guardado.         |
| userId    | INT      | Identificador del usuario que guarda el post.  |
| postId    | INT      | Identificador del post que se guardó.          |
| createdAt | DATETIME | Fecha y hora de guardado.                      |


## Endpoints

### Usuarios:

-   POST `/users/register` - Registro de usuario.
-   POST `/users/login` - Login de usuario (devuelve token).
-   POST `/users/follows` - Seguidos por el usuario.
-   GET `/users/followers` - Seguidores del usuario.
-   GET `/users` - Devuelve información del usuario del token.
-   PUT `/users/update` - Editar informacion de usuario.
-   PUT `/users/avatar` - Editar el avatar.

### Posts:

-   POST `/posts` - Permite publicar una opinión.
-   GET `/posts` - Lista de todos los posts.
-   GET `/posts/:postId/saves` - Lista de todos los posts guardados.
-   POST `/posts/:postId/likes` - Añade un like a un post.
-   DELETE `/posts/:postId/likes` - Deshace un like de un post.
-   POST `/posts/:postId/comments` - Añade un comentario a un post.
-   DELETE `/posts/:postId/comments` - Borra el comentario de un post si eres quien lo creó.
-   DELETE `/posts/:postId` - Borra un post solo si eres quien lo creó.
