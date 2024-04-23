
# Sistema de Carrinhos de Compra via API Rest

Introdução

O objetivo deste documento é especificar os requisitos funcionais para o desenvolvimento de um sistema de carrinhos de compra via API Rest. O sistema permitirá que os usuários adicionem itens ao carrinho, ajustem as quantidades, limpem o carrinho e confirmem o pedido de compra.

## Tecnologias Utilizadas:

**Back-end:** Node, Express, Mysql

## Requisitos Funcionais:

- RF001: Adicionar itens ao carrinho de compra

O sistema deve permitir que um usuário adicione itens ao carrinho de compra.
Cada item deve ser identificado por um ID único.
Os itens devem ser recuperados do banco de dados.

- RF002: Ajustar quantidade de itens no carrinho de compra

O sistema deve permitir que um usuário aumente ou diminua a quantidade de um item no carrinho de compra.
A quantidade mínima de um item no carrinho deve ser 1.
A quantidade máxima de um item no carrinho pode ser limitada pelo estoque.

- RF003: Limpar carrinho de compras

O sistema deve permitir que um usuário limpe seu carrinho de compras.
Esta ação removerá todos os itens do carrinho.

- RF004: Confirmar pedido de compra

O sistema deve permitir que um usuário confirme o pedido de compra.
Após a confirmação, um pedido será gerado com todas as informações da compra, incluindo:

Custos totais
Quantidade de itens
Informações do usuário
Outras informações relevantes

## Requisitos Não Funcionais

Desempenho: O sistema deve ser capaz de lidar com um grande volume de requisições simultâneas de forma eficiente.
Segurança: Será necessário um middleware na API para validar a autenticação de usuários via JWT (JSON Web Token). Isso garantirá que apenas usuários autenticados possam realizar ações no carrinho de compras.

### Considerações Finais

Este documento de levantamento de requisitos servirá como base para o desenvolvimento do sistema de carrinhos de compra via API Rest. A implementação deve garantir que todos os requisitos funcionais e não funcionais sejam atendidos para fornecer uma experiência de usuário satisfatória e segura.

## Banco de Dados (Shopping-carts)

```sql
create database shoppingcarts;  
  
use shoppingcarts;  
  
CREATE TABLE Usuario (  
    id INT AUTO_INCREMENT PRIMARY KEY,  
    nome VARCHAR(100) NOT NULL,  
    email VARCHAR(100) NOT NULL,  
    senha VARCHAR(100) NOT NULL  
);  
  
CREATE TABLE Produto (  
    id INT AUTO_INCREMENT PRIMARY KEY,  
    nome VARCHAR(100) NOT NULL,  
    preco DECIMAL(10, 2) NOT NULL,  
    estoque INT NOT NULL  
);  
  
CREATE TABLE Carrinho (  
    id INT AUTO_INCREMENT PRIMARY KEY,  
    usuario_id INT,  
    produto_id INT,  
    quantidade INT,  
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id),  
    FOREIGN KEY (produto_id) REFERENCES Produto(id)  
);
```
#### OBS: Os arquivos de insert para as tabelas se encontra na pasta `schemas`;
