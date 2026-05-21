# CentralClima Full Stack

Este repo contiene dos proyectos separados dentro del mismo repositorio:

- `centralclima-front`: landing y frontend, preparado para desplegar en Cloudflare con OpenNext.
- `centralclima-back`: backend en Next.js, preparado para desplegar en Vercel.

## Desarrollo local

Frontend:

```bash
cd centralclima-front
pnpm install
pnpm dev
```

Backend:

```bash
cd centralclima-back
pnpm install
pnpm dev
```

## CI/CD

GitHub Actions se usa solo para CI y valida cada proyecto por separado cuando cambian sus archivos.

- `centralclima-front`: ejecuta `pnpm cf:build`
- `centralclima-back`: ejecuta `pnpm build`

Para CD no hace falta duplicar despliegues en GitHub Actions si cada plataforma ya está conectada al repo. La forma recomendada es:

- Vercel apuntando a `centralclima-back` como `Root Directory`
- Cloudflare apuntando a `centralclima-front` como `Root Directory`

Con esa configuracion, un push a `main` dispara:

- validacion en GitHub Actions
- despliegue del backend en Vercel
- despliegue del frontend en Cloudflare

## Ajustes recomendados de plataforma

Vercel:

- `Root Directory`: `centralclima-back`
- `Install Command`: `pnpm install --frozen-lockfile`
- `Build Command`: `pnpm build`

Cloudflare:

- `Root Directory`: `centralclima-front`
- `Install Command`: `pnpm install --frozen-lockfile`
- `Build Command`: `pnpm cf:build`

Si Cloudflare pide comando de despliegue manual, usa `pnpm deploy`.
