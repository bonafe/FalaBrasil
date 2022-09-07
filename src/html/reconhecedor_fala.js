


export class ReconhecedorFala {



  constructor() {

    this.reconhecedor = new webkitSpeechRecognition();
    this.reconhecedor.continuous = true;
    this.reconhecedor.interimResults = true;

    this.reconhecedor.onstart = this.onstart.bind(this);
    this.reconhecedor.onerror = this.onerror.bind(this);
    this.reconhecedor.onend = this.onend.bind(this);
    this.reconhecedor.onresult = this.onresult.bind(this);
  }



  reconhecer(callback) {
    console.info(`Iniciando reconhecimento de voz`);
    this.callback = callback;
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

      this.callback(evento.results[i][0].transcript, evento.results[i].isFinal);      
    }
  }



  terminar(){
    this.deveTerminar = true;
  }
}


