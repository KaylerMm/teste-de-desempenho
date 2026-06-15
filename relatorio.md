# Relatório de Teste de Desempenho

## Resumo Executivo
A aplicação testada apresenta limites de capacidade muito diferentes dependendo do tipo de operação. No cenário de entrada e saída no endpoint /checkout/simple a API demonstrou excelente resiliência. O sistema suportou um pico de 300 usuários simultâneos com uma taxa de sucesso total e manteve o tempo de resposta cravado em 200 milissegundos.

No cenário de processamento pesado no endpoint /checkout/crypto a capacidade máxima foi severamente reduzida. Como a operação de criptografia ocupa toda a capacidade do processador o servidor fica impedido de responder a novas chamadas resultando em colapso sob cargas maiores.

## Análise de Estresse
O teste de estresse foi desenhado para aumentar a carga agressivamente até mil usuários simultâneos. A aplicação começou a falhar logo após ultrapassar a marca de 200 usuários simultâneos. 

Nesse ponto de ruptura os tempos de resposta começaram a subir de forma descontrolada chegando à marca de 1 minuto por requisição. A taxa de erro atingiu mais de 38 por cento porque as conexões ficavam presas em uma fila de espera até esgotar o tempo limite. Esse comportamento confirma que o gargalo do sistema está nas operações que monopolizam o processador.

## Evidências
Os registros visuais da execução fornecidos anteriormente confirmam os dados acima.

O teste de fumaça inicial teve sucesso absoluto e validou a disponibilidade da aplicação. 

O teste de pico comprovou a estabilidade das operações de rede entregando 100 por cento de sucesso sob carga repentina de 300 usuários. 

O teste de estresse expôs o ponto de quebra da aplicação ilustrando claramente os erros e o aumento exponencial na latência quando a carga ultrapassou a capacidade de processamento do servidor.
