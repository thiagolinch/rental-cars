# Configuração de banco PostgreSQL (Neon + Render)

Este projeto utiliza TypeORM 0.2 e PostgreSQL. A API passa a receber a conexão por `DATABASE_URL`, sem o host antigo do Supabase fixado no código.

## Variável de ambiente

Configure `DATABASE_URL` no painel **Render > Serviço > Environment** usando a string de conexão PostgreSQL fornecida pela Neon. Não inclua senhas, chaves ou a URL real no Git.

Exemplo ilustrativo (não funcional):

```dotenv
DATABASE_URL=postgresql://USUARIO:SENHA@HOST_NEON/NOME_BANCO?sslmode=require
PORT=3333
```

Se a senha possuir caracteres reservados em URLs, use a connection string fornecida pela Neon, sem editar sua estrutura manualmente.

## Inicialização

- O TypeORM lê a URL de `process.env.DATABASE_URL`.
- O servidor somente inicia após a conexão com o banco ser estabelecida.
- `PORT` vem do ambiente da Render; na ausência, o padrão é 3333.
- O TypeORM registra as entidades existentes do RentX.
- A conexão usa TLS com validação de certificado ativada.
- Não execute `synchronize: true` em produção.

## Antes do deploy

1. Crie o projeto e banco PostgreSQL na Neon.
2. Configure `DATABASE_URL` e demais variáveis necessárias no painel da Render.
3. Revogue/substitua todas as credenciais antigas que apareceram em arquivos Git públicos.
4. Remova segredos do código e histórico Git por um procedimento específico de segurança; adicionar `.env` ao `.gitignore` não limpa o histórico.
5. Revise as migrations do TypeORM e aplique-as no banco Neon antes de executar seeds.
6. Verifique os scripts reais de build e start definidos na Render.
7. Faça uma validação funcional dos endpoints e do acesso ao banco.

## Pendências desta branch

- As migrations e seeds não foram executadas: dependem do banco Neon e das credenciais válidas.
- O build e os testes ainda precisam ser executados no ambiente de desenvolvimento/CI.
- Arquivos antigos de configuração com segredos precisam passar por rotação e limpeza controlada.
- A configuração da Render e seus comandos de inicialização ainda precisam ser confirmados.

**Atenção:** a alteração da conexão não migra dados nem cria tabelas automaticamente.
