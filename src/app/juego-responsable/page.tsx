import { Inter } from 'next/font/google';
import { Fraunces } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const fraunces = Fraunces({ subsets: ['latin'] });

export default function JuegoResponsablePage() {
  return (
    <div className={`min-h-screen bg-[#14213D] text-[#EDE6D6] ${inter.className}`}>
      <div className="container mx-auto px-6 max-w-[720px] py-16">
        <h1 className={`${fraunces.className} text-4xl md:text-5xl font-bold text-[#EDE6D6] mb-4`}>
          Juego Responsable
        </h1>

        <p className="text-base leading-relaxed mb-6">
          En InfoBet creemos que las apuestas deben ser entretenimiento, nunca una fuente de ingresos ni una vía de escape. Esta página existe para ayudarte a jugar de forma consciente y saber dónde buscar ayuda si la necesitás.
        </p>

        <h2 className={`${fraunces.className} text-2xl font-bold text-[#EDE6D6] mt-8 mb-4`}>
          ¿Cuándo el juego deja de ser un entretenimiento?
        </h2>
        <p className="text-base leading-relaxed mb-4">
          Algunas señales de alerta a las que prestar atención:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-base leading-relaxed">
          <li>Perseguir pérdidas aumentando las apuestas después de perder dinero</li>
          <li>Ocultar o mentir a familiares y amigos sobre el tiempo o dinero destinado al juego</li>
          <li>Poner en riesgo relaciones, trabajo o estudios por seguir jugando</li>
          <li>Pedir dinero prestado o usar fondos destinados a gastos básicos para apostar</li>
          <li>Sentir culpa, vergüenza o ansiedad después de jugar, pero volver a hacerlo</li>
          <li>Cambios notorios en el sueño, el apetito o el estado de ánimo vinculados al juego</li>
        </ul>
        <p className="text-base leading-relaxed mt-4">
          Si te identificás con varios de estos puntos, puede ser momento de pedir ayuda.
        </p>

        <h2 className={`${fraunces.className} text-2xl font-bold text-[#EDE6D6] mt-8 mb-4`}>
          Recomendaciones para jugar de forma más consciente
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-base leading-relaxed">
          <li>No intentes recuperar pérdidas aumentando el monto de tus apuestas</li>
          <li>Establecé límites de tiempo y dinero antes de empezar a jugar, y respetalos</li>
          <li>Llevá un registro de tus depósitos, retiros y tiempo de juego</li>
          <li>Desactivá notificaciones o correos promocionales si sentís que te impulsan a jugar más de lo que querés</li>
          <li>Usá herramientas de límites y autoexclusión que ofrecen las plataformas reguladas</li>
        </ul>
        <p className="text-base leading-relaxed mt-4">
          El juego online está reservado exclusivamente a personas mayores de 18 años. Verificá siempre que la plataforma en la que jugás cuente con licencia vigente antes de registrarte o depositar fondos — es tu primera protección real.
        </p>

        <h2 className={`${fraunces.className} text-2xl font-bold text-[#EDE6D6] mt-8 mb-4`}>
          Líneas de ayuda en Argentina
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-[#1B2A4A] border border-[#B08D57] rounded-lg p-5">
            <h3 className={`${fraunces.className} text-lg font-bold text-[#EDE6D6] mb-1`}>
              Línea 141 (SEDRONAR)
            </h3>
            <p className="font-ibm-mono text-sm text-[#B08D57]">Atención 24h · Anónimo</p>
            <p className="text-sm text-[#EDE6D6]/80 mt-1">Consumos problemáticos, incluido el juego.</p>
          </div>

          <div className="bg-[#1B2A4A] border border-[#B08D57] rounded-lg p-5">
            <h3 className={`${fraunces.className} text-lg font-bold text-[#EDE6D6] mb-1`}>
              ReVA — Registro Voluntario de Autoexclusión
            </h3>
            <p className="font-ibm-mono text-sm text-[#B08D57]">saberjugar.gob.ar</p>
            <p className="text-sm text-[#EDE6D6]/80 mt-1">Bloqueo propio de acceso a plataformas legales por hasta 2 años.</p>
          </div>

          <div className="bg-[#1B2A4A] border border-[#B08D57] rounded-lg p-5">
            <h3 className={`${fraunces.className} text-lg font-bold text-[#EDE6D6] mb-1`}>
              Jugadores Anónimos
            </h3>
            <p className="font-ibm-mono text-sm text-[#B08D57]">Grupos de apoyo gratuitos</p>
            <p className="text-sm text-[#EDE6D6]/80 mt-1">Reuniones presenciales y virtuales en todo el país.</p>
          </div>

          <div className="bg-[#1B2A4A] border border-[#B08D57] rounded-lg p-5">
            <h3 className={`${fraunces.className} text-lg font-bold text-[#EDE6D6] mb-1`}>
              Cobertura de tratamiento (Ley N° 26.934)
            </h3>
            <p className="font-ibm-mono text-sm text-[#B08D57]">Obras sociales y prepagas</p>
            <p className="text-sm text-[#EDE6D6]/80 mt-1">Cobertura obligatoria para el tratamiento de ludopatía en Argentina.</p>
          </div>

          <div className="bg-[#1B2A4A] border border-[#B08D57] rounded-lg p-5">
            <h3 className={`${fraunces.className} text-lg font-bold text-[#EDE6D6] mb-1`}>
              Buenos Aires (Provincia)
            </h3>
            <p className="font-ibm-mono text-sm text-[#B08D57]">0800-222-5462</p>
            <p className="text-sm text-[#EDE6D6]/80 mt-1">Atención gratuita.</p>
          </div>

          <div className="bg-[#1B2A4A] border border-[#B08D57] rounded-lg p-5">
            <h3 className={`${fraunces.className} text-lg font-bold text-[#EDE6D6] mb-1`}>
              CABA
            </h3>
            <p className="font-ibm-mono text-sm text-[#B08D57]">108</p>
            <p className="text-sm text-[#EDE6D6]/80 mt-1">Atención telefónica gratuita.</p>
          </div>
        </div>

        <p className="text-base leading-relaxed mt-6">
          Si el juego dejó de ser entretenimiento y empezó a generar malestar, deudas o conflictos, hay ayuda disponible — buena parte de ella, gratuita y anónima.
        </p>
      </div>
    </div>
  );
}
