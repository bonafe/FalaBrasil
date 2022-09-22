


import { ReconhecedorFala } from './reconhecedor_fala.js';



export class FalaBrasil extends  ReconhecedorFala {



    static EVENTO_RECONHECEU_CPF= "Evento Reconheceu CPF";



    constructor(){

        super();    

        this.ultimosOnzeDigitos = "";

        this.addEventListener(ReconhecedorFala.EVENTO_RECONHECEU_FALA, evento => {
            this.reconheceu_cpf (evento.detail.transcricao, evento.detail.final);
        });    
    }


    reconhecer_cpf() {
        super.reconhecer();
    }


    reconheceu_cpf(texto, final) {

        let numeros_ouvidos = "";
    
        for (let indice_caracter in texto) {
    
          let caracter = texto[indice_caracter];
    
          if (!isNaN(caracter) && (caracter != " ")) {
            numeros_ouvidos += caracter;
          }
        }

        let retorno = this.atualizar_numeros(this.ultimosOnzeDigitos, numeros_ouvidos);
        
        let valido = this.cpf_valido(retorno);

        if (valido){
            this.ultimosOnzeDigitos = "";
            this.abortar();

        //Se terminou de detectar uma sentença
        }else if (final){

            //Atualiza a fila dos últimos onze dígitos
            this.ultimosOnzeDigitos = retorno;
        }        
        
        const evento_reconheceu_cpf = new CustomEvent(FalaBrasil.EVENTO_RECONHECEU_CPF, {detail:{
            numeros:retorno,
            valido:valido
        }});

        this.dispatchEvent(evento_reconheceu_cpf);
    }



    atualizar_numeros (ultimosOnzeDigitos, numerosOuvidos){
        let numerosConcatenados = ultimosOnzeDigitos + numerosOuvidos;
        if (numerosConcatenados.length > 11){
            return numerosConcatenados.substring(numerosConcatenados.length - 11, numerosConcatenados.length)
        }else{
            return numerosConcatenados;
        }
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