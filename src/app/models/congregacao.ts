export class Congregacao {
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
}

export interface Passageiro {
  Oid: string;
  Nome: string;
  TipoDocumento: string;
  Documento: string;
  Celular: string;
  Dependentes: any;
}
