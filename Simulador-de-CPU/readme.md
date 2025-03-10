# CPU_simulator
Simulação de CPU em C, imitando assembly

criar um teste.txt com algumas entradas de instruções, seguindo esse formato: 0002: 0x0101
exemplo: 
0000: 0x1801
0002: 0x1902
0004: 0x1A03
0006: 0x1B04
0008: 0x0000
000A: 0x4404
000C: 0x5528
000E: 0x664C
0010: 0xB781
0012: 0xFFFF

onde um halt finaliza o codigo, um NOP printa tudo que foi atualizado até ele e uma instrução indefinida exemplo: 0012: 0xDEAD
não funcionaria, use como exemplo a tabela de instruções

Compilar: gcc -g -o simular simulador.c

Executar: ./simular teste.txt

obs: não está 100%