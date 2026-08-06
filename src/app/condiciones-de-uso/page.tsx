import { ArticleLayout } from '@/components/layout/ArticleLayout';

export default function CondicionesUsoPage() {
  return (
    <ArticleLayout title="Condiciones de Uso" lastUpdated="Agosto 2026">
      <p>
        Bienvenido a Infobet. Al utilizar nuestro sitio, aceptas cumplir con estas condiciones de uso. Por favor, léelas atentamente.
      </p>

      <h2>Aceptación de las condiciones</h2>
      <p>
        Al acceder y utilizar este sitio, aceptas estas condiciones en su totalidad. Si no estás de acuerdo con alguna parte, no debes utilizar el sitio.
      </p>

      <h2>Propiedad intelectual</h2>
      <p>
        Todo el contenido de este sitio (textos, gráficos, logotipos, iconos, imágenes, software) es propiedad de Infobet o de sus licenciantes y está protegido por las leyes de propiedad intelectual. No está permitida la reproducción, distribución o modificación sin autorización expresa.
      </p>

      <h2>Uso del sitio</h2>
      <p>
        El sitio se proporciona para fines informativos. No garantizamos la exactitud, integridad o actualidad de la información. El uso de la información es bajo tu propio riesgo.
      </p>

      <h2>Responsabilidad</h2>
      <p>
        Infobet no se hace responsable de:
      </p>
      <ul>
        <li>Pérdidas o daños derivados del uso de la información del sitio.</li>
        <li>Interrupciones o errores en el servicio.</li>
        <li>Contenido de sitios externos enlazados.</li>
      </ul>
      <p>
        El juego conlleva riesgos. Recomendamos jugar con responsabilidad y consultar las leyes locales.
      </p>

      <h2>Privacidad</h2>
      <p>
        El uso de tus datos personales se rige por nuestra <a href="/politica-privacidad" className="text-tinta underline hover:text-oro transition-colors">Política de Privacidad</a>.
      </p>

      <h2>Modificaciones</h2>
      <p>
        Podemos modificar estas condiciones en cualquier momento. Las modificaciones serán efectivas al publicarse en esta página. Te recomendamos revisarlas periódicamente.
      </p>

      <h2>Ley aplicable</h2>
      <p>
        Estas condiciones se rigen por las leyes de la República Argentina. Cualquier controversia será resuelta ante los tribunales de Córdoba, Argentina.
      </p>

      <p><strong>Última actualización: Agosto 2026</strong></p>
    </ArticleLayout>
  );
}
