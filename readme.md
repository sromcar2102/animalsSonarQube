
- El UML lo tenéis que crear vosotros con plantUML.
- CRUD animals para una protectora de animales (Las fichas de los animales).
- Animales deberán tener:
  - id (usando la biblioteca uuid)
  - name: Un nombre entre 3-100 caracteres
  - birthDate: date-fnd
  - gender: M/F
  - size: (Pequeño/Mediano/Grande)
  - breed (Raza)
  - vaccine: AnimalVaccine[]
  - update_at: Ultima fecha de actualización de la ficha
  - create_at: La fecha de creación de la ficha.
- Las Vaccines deberán ser:
  - id: (uuid)
  - nombre
- AnimalVaccine:
   - Vaccine
   - date
- La  vista:
  - Tendremos la mitad de la pantalla un formulario para Agregar/Editar (Se reutilizará el componente del formulario)
  - La otra mitad de la pantalla será una TABLA con los datos del animal (Se podrá cambiar la vista de los datos con un desplegable)
    mostrando una vista en CARTAS.
- Tendremos que tener el estado de la aplicación en un Map y tendremos que sincronizar el backend con peticiones de http.service.


