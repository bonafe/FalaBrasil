import { ReconhecedorFala } from './reconhecedor_fala.js';

export class FalaBrasil extends  ReconhecedorFala{

    constructor(){
        super();        
    }


    reconhecer_cpf(callback) {

        this.callback_cpf = callback;

        super.reconhecer(this.reconheceu_cpf);
    }


    reconheceu_cpf(texto, final) {

        let numeros_ouvidos = "";
    
        for (let indice_caracter in texto) {
    
          let caracter = texto[indice_caracter];
    
          if (!isNaN(caracter) && (caracter != " ")) {
            numeros_ouvidos += caracter;
          }
        }
        
        this.callback_cpf(numeros_ouvidos, this.cpf_valido(numeros_ouvidos));        
    }



    cpf_valido(cpf){

        cpf = cpf.replace(/\D/g, '');

        if(cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)){

            return false;

        }else{

            let result = true;

            [9,10].forEach( j => {

                let soma = 0, r;

                cpf.split(/(?=)/).splice(0,j).forEach((e, i) => {

                    soma += parseInt(e) * ((j+2)-(i+1));
                });

                r = soma % 11;

                r = (r <2)?0:11-r;

                if(r != cpf.substring(j, j+1)){
                     result = false;                    
                }
            });
            return result;
        }
    }
}