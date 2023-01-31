O objetivo desta api e trazer informações sobre carros disponiveis para venda/compra na web, os sites que estão sendo buscada por carros entre eles são:

mercadolivre,
olx,
webmotors


E como funciona?


No momento a API consegue pegar informações de carros especificos no mercado livre quando passamos uma query, com um tempo de resposta nao agradavel, então como solução...


A api conterá um background-jobs que a cada momento ira chamar um web-crawler e para mapear informações de carros entre os sites listados, assim, contendo ja todos os carros armazenados será possivel obter respostas mais rapidas 

