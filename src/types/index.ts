export interface Stat {
  num: string;
  label: string;
}

export interface Sector {
  id: string;
  eyebrow: string;
  titulo: string;
  descripcion: string;
  items: string[];
}

export interface Servicio {
  num: string;
  titulo: string;
  descripcion: string;
}

export interface Cliente {
  nombre: string;
  slug?: string;
}

export interface Certificacion {
  nombre: string;
}

export interface CoverageRegion {
  nombre: string;
}

export interface QuoteFormData {
  nombre: string;
  empresa: string;
  email: string;
  telefono: string;
  tipoServicio: 'instalacion' | 'mantencion-preventiva' | 'mantencion-correctiva' | 'auditoria';
  descripcion: string;
  cantidadEquipos?: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}
