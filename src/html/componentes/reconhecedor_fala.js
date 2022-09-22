


export class ReconhecedorFala  extends EventTarget{



  static EVENTO_RECONHECEU_FALA = "Evento Reconheceu Fala";



  constructor() {
    super();

    this.reconhecedor = new webkitSpeechRecognition();
    this.reconhecedor.continuous = true;
    this.reconhecedor.interimResults = true;

    this.reconhecedor.onstart = this.onstart.bind(this);
    this.reconhecedor.onerror = this.onerror.bind(this);
    this.reconhecedor.onend = this.onend.bind(this);
    this.reconhecedor.onresult = this.onresult.bind(this);
  }



  abortar(){
    this.reconhecedor.abort();    
  }



  reconhecer() {
    console.info(`Iniciando reconhecimento de voz`);    
    this.reconhecedor.lang = 'pt-BR';
    this.reconhecedor.start();
    this.deveTerminar = false;
  }



  onstart() {
    this.reconhecendo = true;
    console.info(`Reconhecimento de voz iniciado`);
  }



  onerror(evento) {
    console.error(`Erro de reconhecimento de voz: ${evento.error}`)
  }



  onend() {

    this.reconhecendo = false;
    console.info(`Reconhecimento de voz finalizado`);

    if (!this.deveTerminar){
      
      console.info(`Reiniciando reconhecimento de voz`);
      this.reconhecedor.start();
    }
  }



  onresult(evento) {

    for (let i = evento.resultIndex; i < evento.results.length; ++i) {     

      console.info(`Resultado ${(evento.results[i].isFinal ? "FINAL" : "parcial")} reconhecimento de voz: ${evento.results[i][0].transcript}`);

      const evento_reconheceu_fala = new CustomEvent(ReconhecedorFala.EVENTO_RECONHECEU_FALA, {detail:{
        transcricao:evento.results[i][0].transcript,
        final:evento.results[i].isFinal
      }});      

      this.dispatchEvent(evento_reconheceu_fala);
    }
  }



  terminar(){
    this.deveTerminar = true;
  }
}


