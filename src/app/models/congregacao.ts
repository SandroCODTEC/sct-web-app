import Guid from "devextreme/core/guid";

export class Congregacao {
  Oid: string = new Guid().toString();
  Nome: string = 'Minha Congregação';
  Responsavel: string = '';
  EmailResponsavel: string = '';
  CelularResponsavel: string = '';

  Ajudante: string = '';
  EmailAjudante: string = '';
  CelularAjudante: string = '';
}

export interface Evento {
  Oid: string;
  Descricao: string;
  Tema: string;
  DataInicial: Date;
  DataFinal: Date;
  ValorPassagem: number;
  Concluido: boolean;
}

export interface Saida {
  Oid: string;
  Parada: number;
  Horario: Date;
  Logradouro: string;
  Numero: string;
  Complemento: string;
  Bairro: string;
  Cidade: string;
  UF: string;
  Latitude: number;
  Longitude: number;
}

export interface Passagem {
  Oid: string;
  Evento: any;
  Passageiro: any;
  Dependentes: any;
  Dias: any;
  Grupo: any;
  Saida: any;
  ValorPago: number;
}

export interface Passageiro {
  Oid: string;
  Nome: string;
  TipoDocumento: string;
  Documento: string;
  Celular: string;
  Dependentes: any;
}
export interface Dependente {
  Oid: string;
  Nome: string;
  TipoDocumento: string;
  Documento: string;
  Celular: string;
}

export interface Backup {
  Type: string;
  Version: string;
  Congregacao: string;
  Saidas: string;
  Eventos: string;
  Passageiros: string;
  Dependentes: string;
  Passagens: BackupPassagem[];
}
export interface Arranjo {
  Type: string;
  Version: string;
  Congregacao: any;
  Saidas: any[];
  Evento: any;
  Passageiros: any[];
  Dependentes: any[];
  Passagens: any[];
}
export interface BackupPassagem {
  Oid: string;
  Passagens: string;
}
