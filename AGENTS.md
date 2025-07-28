# AGENTS.md

## Propósito

Este documento establece **directrices globales** para la generación y modificación de código en **cualquier** proyecto, sin atarse a un lenguaje, framework o plataforma específica. Su objetivo es garantizar coherencia, calidad y escalabilidad, sin importar el stack tecnológico.

---

## 1. Convenciones de nombres

* **¿Variables con “x” o “tmp”?** Mejor no. Usa nombres que hablen por sí mismos:

  ```text
  // ❌ Malo
  var d = ObtenerDatos();
  // ✅ Bueno
  var pedidosCliente = ObtenerPedidosCliente();
  ```
* **Coherencia sobre todo**: adáptate a las convenciones de tu ecosistema (camelCase, snake\_case, PascalCase…), pero **mantén un único estilo** a lo largo de todo el proyecto.
* Prefijos o sufijos solo cuando realmente clarifiquen (“IUsuarioService” en entornos OOP, “max\_items\_allowed” en scripts de automatización, etc.).

---

## 2. Principios SOLID

**¿Por qué?** Porque sin ellos el código se vuelve frágil y difícil de extender.

1. **S**ingle Responsibility – Cada módulo o clase tiene un único motivo de cambio.
2. **O**pen/Closed – Extiende sin modificar el núcleo existente.
3. **L**iskov Substitution – Las implementaciones concretas sustituyen sin sorpresas.
4. **I**nterface Segregation – Prefiere interfaces pequeñas y específicas.
5. **D**ependency Inversion – Depende de abstracciones, no de detalles concretos.

---

## 3. Patrones de diseño

* ¿Reinventar la rueda? Solo si no queda más remedio.
* Emplea patrones probados (Factory, Strategy, Decorator, Observer…) **cuando** simplifiquen responsabilidades o faciliten extensiones.
* Aísla el acceso a datos con un **Repository** o una capa de abstracción similar, sin sobrecargar el dominio.

---

## 4. Rendimiento

* **Asíncrono siempre que puedas**: evita bloqueos en operaciones de I/O.
* Minimiza llamadas redundantes a bases de datos o APIs externas.
* **Mide antes de optimizar**: usa perfiladores y benchmarks para identificar cuellos de botella reales.

---

## 5. Mantenibilidad

* ¿Quién mantendrá esto dentro de seis meses?

  * Acompaña la lógica crítica con pruebas unitarias e integración.
  * Organiza módulos y espacios de nombres (o carpetas/paquetes) según dominios de negocio.
  * Elimina código y dependencias obsoletas de modo proactivo.

---

## 6. Escalabilidad

* Diseña **contratos claros** (REST, RPC, eventos, colas…) para la comunicación entre componentes.
* Separa responsabilidades en servicios o módulos alineados al dominio.
* Anticipa puntos de congestión y planifica particionamiento, balanceo o caching.

---

## 7. Flujo de trabajo recomendado

1. Clona o actualiza el repositorio.
2. Revisa este **AGENTS.md** antes de agregar o modificar código.
3. Ejecuta las comprobaciones iniciales y los tests:

   ```bash
   <comando_de_tu_stack> restore
   <comando_de_tu_stack> build
   <comando_de_tu_stack> test
   ```
4. Abre un pull request con descripción clara y referencia a tickets o issues relevantes.
5. Asegura que todas las verificaciones de estilo, calidad y seguridad pasen sin errores antes de fusionar.

---

**Conclusión:**
Este conjunto de guías no es un dogma inamovible, sino un punto de partida. **Cuestiónalo** cuando haga falta, pero **aplícalo** siempre con rigor y pragmatismo para obtener resultados claros, consistentes y adaptables a cualquier tecnología.
