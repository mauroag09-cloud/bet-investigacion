-- ============================================================
-- TABLA: reclamos  (sección "ALERTA - RECLAMOS VERIFICADOS")
-- Ejecutar en: Supabase Dashboard → SQL Editor → New query
-- ============================================================

create table if not exists public.reclamos (
  id uuid primary key default gen_random_uuid(),
  nombre_plataforma text not null default '',
  plataforma_id uuid references public.plataformas(id) on delete set null,
  titulo text not null default '',
  descripcion text not null default '',
  estado text not null default 'pending' check (estado in ('pending', 'reviewing', 'resolved')),
  fecha date not null default current_date,
  enlace text,
  nombre_usuario text,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Índice para ordenar por fecha
create index if not exists reclamos_fecha_idx on public.reclamos (fecha desc);

-- RLS: mismas reglas que el resto de tablas del proyecto (sin restricciones)
alter table public.reclamos disable row level security;

-- ============================================================
-- SEED: los 3 reclamos que estaban hardcodeados en el código
-- (editalos después desde el panel /admin/reclamos)
-- ============================================================
insert into public.reclamos (nombre_plataforma, titulo, descripcion, estado, fecha, enlace) values
  ('Royal Casino', 'Retiro de $500 bloqueado por 15 días', 'El usuario denuncia que su retiro está en estado "en proceso" desde hace 15 días sin respuesta del soporte.', 'reviewing', '2026-08-15', null),
  ('Lucky Spin', 'Bono de bienvenida no acreditado', 'El usuario realizó el depósito mínimo requerido pero el bono del 200% nunca fue acreditado en su cuenta.', 'pending', '2026-08-12', null),
  ('BetMaster', 'Cuenta bloqueada sin explicación', 'El usuario fue bloqueado al intentar retirar $200. El casino argumentó "actividad sospechosa" sin pruebas.', 'resolved', '2026-08-10', null)
on conflict do nothing;
