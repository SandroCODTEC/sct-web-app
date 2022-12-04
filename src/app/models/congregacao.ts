export class Congregacao {
    Nome: string = 'Minha Congregação';
    Responsavel: string = '';
    EmailResponsavel: string = '';
    CelularResponsavel: string = '';

    Ajudante: string = '';
    EmailAjudante: string = '';
    CelularAjudante: string = '';
}

export interface Saida {
    Parada:number;
    Horario:Date;
    Logradouro:string;
    Numero:string;
    Complemento:string;
    Bairro:string;
    Cidade:string;
    UF:string;
    Latitude:number;
    Longitude:number;
}