# AGENTS.md

## Propósito  
Este archivo define las pautas que debe seguir Codex al generar o modificar código en esta API basada en .NET 8.

---

## 1. Convenciones de nombres  
- **Variables descriptivas**  
  - Nunca `x`, ni `tmp`. Opta por nombres que reflejen claramente el propósito:  
    ```csharp
    // ❌ Malo
    var d = GetData();
    // ✅ Bueno
    var customerOrders = GetCustomerOrders();
    ```  
- **PascalCase** para clases, métodos y propiedades; **camelCase** para parámetros y variables locales.  
- Prefijos o sufijos estándar solo si aportan claridad (`IUsuarioService`, `OrderDto`, `maxItemsAllowed`).

---

## 2. Principios SOLID  
Aplica **siempre** SOLID, sin excepción:  
1. **S**ingle Responsibility Principle – Cada clase debe tener un único motivo de cambio.  
2. **O**pen/Closed Principle – Extiende comportamientos sin modificar el código existente.  
3. **L**iskov Substitution Principle – Las subclases deben ser intercambiables con sus clases base.  
4. **I**nterface Segregation Principle – Prefiere varias interfaces específicas a una interfaz monolítica.  
5. **D**ependency Inversion Principle – Depende de abstracciones, no de implementaciones.

---

## 3. Patrones de diseño  
¿Realmente vamos a reinventar la rueda? Solo si es necesario:  
- Usa **Factory**, **Strategy** o **Decorator** cuando ayude a separar responsabilidades o simplificar extensiones.  
- Emplea **Repository** y **Unit of Work** en la capa de acceso a datos para aislar la lógica de negocio.  
- Evita patrones innecesarios que añadan complejidad sin beneficio claro.

---

## 4. Rendimiento  
¿Optimizamos sin sobrecomplicar?  
- Prefiere llamadas asíncronas para operaciones de I/O intensivo.  
- Reduce interacciones redundantes con bases de datos y servicios externos.  
- Mide antes de optimizar: recurre a herramientas de perfilado y benchmarking.  

---

## 5. Mantenibilidad  
¿Quién leerá este código dentro de seis meses?  
- Acompaña las piezas críticas con pruebas automatizadas: unitarias e integración.  
- Organiza módulos y espacios de nombres según los dominios de negocio.  
- Elimina código y dependencias obsoletas de forma proactiva.

---

## 6. Escalabilidad  
¿Preparados para crecer sin reescribir desde cero?  
- Diseña contratos de comunicación claros entre componentes (REST, RPC u otros).  
- Separa responsabilidades en servicios o módulos alineados al dominio.  
- Anticipa cuellos de botella y plantea estrategias de particionamiento o balanceo.  

---

## 7. Flujo de trabajo recomendado  
1. Clona o actualiza el repositorio.  
2. Revisa este AGENTS.md antes de generar código.  
3. Ejecuta el script de inicialización y los tests:  
   ```bash
   dotnet restore
   dotnet build
   dotnet test
    ```
4.	Comparte PR con descripciones claras y referencia a tickets o issues.
5.	Asegura que todas las comprobaciones de estilo y calidad pasen sin errores.