# Tintin
## Microservicio Acortador de URL

### Historias de usuarios:
1. Puedo pasar una URL como parámetro y recibiré una URL acortada en la respuesta JSON.
2. Si paso una URL no válida que no sigue el formato válido de http://www.example.com, la respuesta JSON contendrá un error.
3. Cuando visite esa URL acortada, me redirigirá a mi enlace original.

### Ejemplo de uso:
Puede obtener una url reducida de `yourURL` yendo a `tintin.glitch.me/new/yourURL`.
Por ejemplo, después de acceder por primera vez a tintin.glitch.me/new/http://facebook.com, todos pueden entrar a Facebook accediendo a https://tintin.glitch.me/79
