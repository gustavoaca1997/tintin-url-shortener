# Tintin
## Microservicio para acortar direcciones URL

### Historias de usuarios:
1. Puedo pasar una URL como parámetro y recibiré una URL abreviada en la respuesta JSON.
2. Si paso una URL no válida que no sigue el formato http://www.example.com válido, la respuesta JSON contendrá un error.
3. Cuando visito esa URL abreviada, me redirigirá a mi enlace original.

### Ejemplo de uso:
Puede obtener una URL abreviada de `suURL` yendo a `tintin.glitch.me/new/yourURL`.
Por ejemplo, después de que se accede por primera vez a tintin.glitch.me/new/http://facebook.com, todos podrán acceder a Facebook accediendo a https://tintin.glitch.me/79
