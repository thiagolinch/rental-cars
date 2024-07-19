# Cadastro de carros

**RF**
-   Deve ser possível cadastrar um novo carro.
-   Deve ser possível listar todas as categorias.

**RN**
-   Não deve ser possível cadastrar um carro com uma placa já existente.
-   A disponibilidade do carro deve ser true como padrão na hora do cadastro.

# Listagem de carros

**RF**
-   Deve ser possível listar todos os carros que estão disponíveis.
-   Deve ser possível listar todos os carros que estão disponíveis pela categoria.
-   Deve ser possível listar todos os carros que estão disponíveis pela marca.
-   Deve ser possível listar todos os carros que estão disponíveis pelo modelo do carro.

**RN**
-   User não precisa estar logado no site para ver todos os carros disponíveis.

# Cadastro de especificação no carro

**RF**
-   Deve ser possível cadastar uma especificação para um carro.
-   Deve ser possível listar todas as especificações.
-   Deve ser possível listar todos os carro.

**RN**
-   Não deve ser possível cadastrar uma especificação para um carro que não exista.
-   Não deve ser possível cadastrar uma especificação já existente para um carro.
-   O usuário responsável pelo cadastro de especificações deve ser um ADM.

# Cadastro de imagens do carro

**RF**
-   Deve ser possível cadastrar a imagem do carro.
-   Deve ser possível cadastrar mais de uma imagem.

**RNF**
-   Usar o multer para upload dos arquivos.

**RN**
-   O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
-   O usuário responsável pelo cadastro de imagens deve ser um ADM.

# Alugel do carro

**RF**
-   Deve ser possível cadastrar um aluguel.

**RN**
-   O aluguel deve ter duração minima de 24h.
-   Para alugar o usuário precisa estar logado na aplicação.
-   O carro, ao ser alugado, deve ter o status atualizado para INDISPONÍVEL.
-   Não deve ser possível cadastrar um novo aluguel caso já exista um aluguel aberto para o mesmo usuário.
-   Não deve ser possível cadastrar um novo aluguel caso já exista um aluguel aberto para o mesmo carro.

# Devolução do carro

**RF**
-   Deve ser possível o usuário devolver o carro.

**RN**
-   Se o carro for devolvido antes de 24h, deverá ser cobrado o valor de uma diária completa.
-   Ao realizar a devolução, o carro deve ser liberado para outro aluguel.
-   Ao realizar a devolução, o usuário deve ser liberado para outro aluguel.
-   Ao realizar a devolução, deverá ser calculado o valor do alguel.
-   Caso o dia de devolução seja maior que o estipulado, deverá ser cobrada a multa proporcional aos dias de atraso na devolução.
-   Caso haja multa, deverá ser somada ao valor total do alguel.
-   O user deve estar logado na aplicação para poder devolver o carro.

# Recuperar a senha

**RF**
-   Deve ser possível o usuário recuperar a senha informando o e-mail
-   O usuário deve receber um e-mail com o passo a passo da recuperação da senha
-   O usuário deve conseguir inserir uma nova senha

**RN**
-   O usuário precisa informar uma nova senha
-   O link enviado para recuperação da senha deve expirar em 3 horas
