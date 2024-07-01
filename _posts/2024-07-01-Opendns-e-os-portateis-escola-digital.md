---
layout: post
title: OpenDNS e os Portáteis da Escola Digital 
category: blog
tags: OpenDns portateis escola digital net dns
comments: true
---

# OpenDNS 
## Serviço indisponivel em Portugal
Recentemente o fornecedor de DNS, OpenDNS deixou de estar disponível em Portugal e em França, devido a 2 ordens judiciais para bloqueio de pirataria, no caso português estamos a falar do Artigo 210-G(3) do Código de Direitos de Autor Português.
Podem verificar isso, usando a ferramenta dig, para tentar resolver algum endereço, usando os DNS do OpenDNS, como é o caso do ip 208.67.222.222 .
O próprio OpenDNS noticiou esta decisão no dia 28 Junho, [podem ver no site oficial](https://support.opendns.com/hc/en-us/articles/27951404269204-OpenDNS-Service-Not-Available-To-Users-In-France-and-Portugal?ref=internet.exchangepoint.tech). 

![_config.yml]({{ site.baseurl }}/images/opendns/00-dig.png)

## Portáteis da Escola Digital
Ok, mas o que é que isto tem a ver com os Portáteis da Escola Digital?
Acontece que os Portáteis da Escola Digital vêm com o software Umbrella Roaming Client da OpenDNS, que usa os serviços da OpenDNS para resolver endereços web aos clientes, neste caso os portáteis da Escola Digital e que desde dia 28 Junho 2024 deixaram de conseguir aceder a conteúdos na internet, uma vez que não conseguem resolver endereços, uma vez que os IP's em Portugal foram bloqueados pelo serviço. Um simples ping não consegue resolver o endereço para onde pingar.

![_config.yml]({{ site.baseurl }}/images/opendns/00-ping.png)

### Contexto
Desconheço o porquê da opção de instalar e confiar neste serviço para gerir os DNS nas máquinas da Escola Digital, mas o mais provável é por serem um player isento na resolução de DNS e que permite o filtro de conteúdos menos próprios para os mais novos/professores, mantendo assim os equipamentos ligeiramente mais protegidos no que diz respeito a conteúdos menos legítimos/próprios para as idades dos mais novos.

### DNS
O que são DNS? Bem, basicamente é a resolução de um nome (domínio, endereço web) e o seu endereço IP, podem ver mais algum detalhe na página da [Wikipédia dobre DNS](https://pt.wikipedia.org/wiki/Sistema_de_Nomes_de_Dom%C3%ADnio).

## Como Resolver?
Já surgiu documentação oficial de suporte para resolver o problema com os computadores da Escola Digital, podem encontrar este artigo no [Suporte da Escola Digital](https://www.avpa.pt/escoladigital/blog/2024/06/30/umbrella-opendns-suspenso-desde-28-06-2024/), no entanto aqui ficam também os meus passos de como resolver o problema e de como forçar o uso de DNS (IPv4) nesses mesmos equipamentos.

Vão precisar das credenciais de Administrador da máquina.

### Serviços
Primeiro devem abrir os Serviços do Windows, como Administrador e localizar o serviço Umbrella Roaming Client. Devem aproveitar para clicar no botão Stop e depois com o botão do lado direito clicar sobre o serviço e escolher a opção Propriedades.
![_config.yml]({{ site.baseurl }}/images/opendns/01-print.png)
Depois de aberta a nova janela de Propriedades, devem modificar o Tipo de Arranque para Desativado e ainda deve clicar em Parar o estado de execução atual, depois devem clicar em Aplicar e por fim em OK.
![_config.yml]({{ site.baseurl }}/images/opendns/02-print.png)
No final devem ter algo como o que se pode ver na imagem seguinte:
![_config.yml]({{ site.baseurl }}/images/opendns/03-print.png)

Para validar, podem tentar pingar algum endereço web, eu como sou da velha guarda, uso sempre o meu destinatário habitual, o [sapo.pt](https://sapo.pt) e já devem conseguir ver que o nome do sapo.pt foi bem resolvido.
![_config.yml]({{ site.baseurl }}/images/opendns/04-print.png)

## Alternativas ao OpenDNS
Uma vez que estamos a falar de equipamentos para crianças (maioritariamente) e que até dia 28 de Junho 2024 estavam a usar os serviços OpenDNS para resolver endereços e eventualmente bloquear conteúdo menos próprio, se calhar é boa ideia forçar a utilização de DNS de terceiros e não confiar nos DNS dos operadores de telecomunicação, não me levem a mal, mas aqui por casa não confio nos DNS dos operadores, tenho a minha própria instancia de [pi-hole](https://pi-hole.net/) para bloquear conteúdos.

### Sugiro os seguintes passos
Abrir o Painel de Controlo, entrar em Centro de Rede e Partilha (mais uma vez precisam de acesso de Administrador para fazer estas ações), cliquem na vossa rede e vai abrir uma nova janela de propriedades do wifi, depois basta clicar em Propriedades.
![_config.yml]({{ site.baseurl }}/images/opendns/05-dns-setup.png)

Uma vez aberta a janela de Propriedades, basta selecionar a opção Protocolo IPv4, depois Propriedades 
![_config.yml]({{ site.baseurl }}/images/opendns/06-dns-setup.png)

Por fim devem marcar a opção de utilizar a seguinte lista de endereços de servidor DNS e indicar os endereços DNS que pretendem usar, neste exemplo um endereço [1.1.1.1 Cloudflare](https://www.cloudflare.com/learning/dns/what-is-1.1.1.1/) e outro da [8.8.8.8 Google](https://developers.google.com/speed/public-dns?hl=pt-br), há bastantes mais opções como a (Quad9)[https://quad9.net/], com opções de filtragem de conteúdo. 
![_config.yml]({{ site.baseurl }}/images/opendns/07-dns-setup.png)
Não esquecer de marcar a opção de validar ao sair, para em caso de erro no endereço conseguirem corrigir.

Por fim devem reiniciar o PC para garantir que a solução aplicada resolve o vosso problema.

Mais uma vez a minha opção para a resolução de nomes dentro da minha rede doméstica recai sobre o pi-hole, mas as alternativas que identifiquei são bastante robustas também.
Nota, aqui neste caso, usei um PC com Windows 10 para exemplificar, que foi o único portátil Escola Digital onde resolvi o problema, mas para o Windows 11 os passos devem ser bastante semelhantes.

## Kudos 
Kudos para a equipa de suporte da Escola Digital que foram rápidos na publicação deste workarround a 30-06-2024.
