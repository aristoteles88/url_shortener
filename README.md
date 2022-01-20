# url_shortener
Projeto desenvolvido na atividade 3 da disciplina Desenvolvimento Backend para Aplicações Móveis da pós-graduação em Desenvolvimento Mobile da Faculdade Unyleya. O projeto consiste em um encurtador de URL.
As especificações para o projeto são:

- um método de encurtar uma URL persistindo-a no banco de dados.

- um método que retorna uma url encurtada conforme um id.

- um método que retorna todas as URLs encurtadas em uma data específica.

- um método que retorna uma url encurtada conforme o encurtamento da URL.

Para executar o projeto, é necessário ter uma instância do MySQL.
Criar um arquivo .env com as configurações indicadas no arquivo .env.example.
Criar no banco de dados a tabela URLS. O comando para isso é apresentado abaixo:

CREATE TABLE `URLS` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `create_time` datetime NOT NULL COMMENT 'Create Time',
  `url_address` varchar(255) NOT NULL COMMENT 'URL Address',
  `shortened_url` varchar(16) NOT NULL COMMENT 'Shortened URL',
  `update_time` datetime DEFAULT NULL COMMENT 'Update Time',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3

As rotas para consulta e criação de urls encurtadas são:

CONSULTA (GET):
 - /urls: retorna um JSON contendo id, data de criação, endereço e endereço encurtado de todos os registros do banco de dados; 
 - /urls/byid/:id: retorna um JSON contendo id, data de criação, endereço e endereço encurtado do registro de id ":id";
 - /urls/bydate/:date: retorna um JSON contendo id, data de criação, endereço e endereço encurtado de todos os registros do banco de dados com data de criação yyyy-mm-dd, (em que yyyy-mm-dd é o valor passado no parâmetro :date);

 CRIAÇÃO (POST):
 - /urls: deve ser passado no corpo da requisição o endereço url que deseja encurtar com a chave url_address.
 Exemplo de body da requisição: 
 {
	"url_address": "http://www.google.com.br"
 }