FROM node

# Quando eu criar a criação deste container será nessa rota que as informações serão armazenadas
WORKDIR /usr/app

# Preciso copiar o package.json para dentro do diretorio que eu criei anteriormente, mas pq?
# Pq eu quero que o container seja o responsavel por baixar as dependencias desse projeto e fazer todo o 
# gerenciamento, então eu copio a pasta que é responsável por armazenar todas as informações do pacotes e
# bibliotecas usadas neste projeto para dentro do dockerfile, assim quando eu rodar o docker ele mesmo já instala
# dentro do meu container tudo que ja foi ou esta sendo usado dentro do meu projeto.
# Lembrando que para ignorar alguma pasta que possa a vir junto com o package eu posso criar mais um arquivo docker 
# ".dockerignore" onde eu posso dizer quais pastas do projeto devem ser ignoradas na criação do container.
COPY package.json ./

# Agora que os pacotes estao copiados para dentro do diretorio que o docker ira usar eu preciso instalar tudo isso no meu docker
# para isso eu uso o comando a baixo, que ira ler tudo que foi copiado e instalar exatamento o que esta lá. Não estou usando
# o YARN pois nem todas as imagens vem com o yarn instalado, então é melhor usar o NPM para fazer essa instalação pois ele é
# padrão e não terei erros futuros fazendo isso.
RUN npm install

COPY . .

EXPOSE  3333

# o CMD permite que eu rode os comando definidos no script do meu package.json, neste caso quero rodar o 
# npm run dev - que faz com que minha aplicação esteja com o servidor ativo.
# lembrando que não estou usando o yarn, então o começo do comendo deve ser com o NPM e usar a estrutura de comando
# dele também. Antigamente eu usavo o $yarn dev agora será o $nmp run dev.
CMD ["npm", "run", "dev"]