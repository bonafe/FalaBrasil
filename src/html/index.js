


import {FalaBrasil} from './componentes/fala_brasil.js';
import {CPFBrasil} from './componentes/cpf/cpf_brasil.js';
import { ReconhecedorFala } from './componentes/reconhecedor_fala.js';
import { TextoParaVoz } from './componentes/texto_para_voz.js';


window.onload = () => {

    window.falaBrasil = new FalaBrasil();        

    window.falaBrasil.addEventListener(FalaBrasil.EVENTO_RECONHECEU_CPF, evento => {

        window.reconheceu_cpf (evento.detail.numeros, evento.detail.valido);
    }); 

    window.falaBrasil.reconhecer_cpf();
}







window.reconheceu_cpf = (numeros_cpf, cpf_valido) => {

    let cpfBrasil = document.querySelector("cpf-brasil");

    cpfBrasil.zerar();

    cpfBrasil.preencher(numeros_cpf, cpf_valido);
    
    if (numeros_cpf.length == 11){

        if (cpf_valido){            

            TextoParaVoz.INSTANCE.falar (`CPF válido foi detectado! Número ${numeros_cpf}`);

            let componente_cpf_encontrados = document.getElementById ("cpf_encontrados");

            componente_cpf_encontrados.value = componente_cpf_encontrados.value + numeros_cpf + "\n";                        
        }
    }        
}
