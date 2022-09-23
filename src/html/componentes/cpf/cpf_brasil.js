


export class CPFBrasil extends HTMLElement{

    constructor(){
        super();

        this.shadowDOM = this.attachShadow({mode: 'open'});

        //Espera até que tudo esteja carregado
        Promise.all([

            //Manda carregar o html e extrai o texto da resposta
            fetch('./componentes/cpf/cpf_brasil.html').then(resposta => resposta.text()),

            //Manda carregar o css e extrai o texto da resposta
            fetch('./componentes/cpf/cpf_brasil.css').then(resposta => resposta.text())

        //Carregou o html e o css
        ]).then(([html, css]) => {

                //Aplica o estilo carregado
                const estilo = document.createElement('style');
                estilo.textContent = css;
                this.shadowDOM.appendChild(estilo);

                //Aplica o html carregado
                const template = document.createElement('template');
                template.innerHTML = html;
                this.shadowDOM.appendChild(template.content.cloneNode(true));
        });
    }   
    
    

    zerar(){
        
        for (let i = 1; i <= 11; i++){
            
            let id_componente_digito = "cpf_" + i;
            let componente = this.shadowDOM.getElementById (id_componente_digito);
    
            componente.value = "";
        }    
    }

    

    preencher(numeros, valido){


        //Atualiza a borda do compomente
        let elementoLinhaDigitos = this.shadowDOM.querySelector(".digitos");

        if (valido && !elementoLinhaDigitos.classList.contains("valido")){

            elementoLinhaDigitos.classList.add("valido");
            elementoLinhaDigitos.classList.remove("invalido");
            
        }else if (!valido && !elementoLinhaDigitos.classList.contains("invalido")){
        
            elementoLinhaDigitos.classList.add("invalido");
            elementoLinhaDigitos.classList.remove("valido");  
        }


        //Atualiza os números
        for (let indice_numero in numeros){

            let numero = numeros [indice_numero];

            let numero_digito = parseInt (indice_numero) + 1;

            let id_componente_digito = "cpf_" + numero_digito;

            let componente = this.shadowDOM.getElementById (id_componente_digito);

            componente.value = numero;
        }
    }
}
customElements.define('cpf-brasil', CPFBrasil);