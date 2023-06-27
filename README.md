# Desafio Fpass Frontend

#### Este projeto é um site que utiliza a API da Marvel para exibir informações sobre personagens da Marvel. Ele também possui uma funcionalidade de pesquisa em tempo real que sugere personagens à medida que você digita.

# Como funciona:

## A página inicial do site exibe uma lista de personagens da Marvel. Cada card de personagem contém uma imagem do personagem e o nome do personagem. Ao clicar em um card, você é levado a uma página detalhada para aquele personagem.

## A página do personagem exibe informações mais detalhadas sobre o personagem selecionado. Isso inclui uma descrição do personagem (se disponível), bem como listas de quadrinhos, histórias, eventos e séries nos quais o personagem apareceu.

# Pesquisa de personagens:
## Há também uma funcionalidade de pesquisa que permite buscar personagens pelo nome. À medida que você digita na barra de pesquisa, o site sugere personagens que correspondem ao que você digitou. Você pode clicar em uma sugestão para ir diretamente para a página daquele personagem.

Como executar localmente:
Instale as dependências usando npm install
Configure as variáveis de ambiente, criando um arquivo .env na raiz do projeto e adicione suas chaves da API.
PUBLIC_KEY="sua_chave_pública"
PRIVATE_KEY="sua_chave_privada"

Inicie o servidor usando npm run dev.
