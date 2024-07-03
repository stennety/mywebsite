#!/bin/bash

# Variáveis
REPO_URL="https://github.com/HelderViana/HelderViana.github.io.git"
DEFAULT_BRANCH_NAME="dev-test-sync-from-fork"
LOCAL_DIR="/tmp/site-helder"
CONTAINER_NAME="jekyll-container"
IMAGE_NAME="mcr.microsoft.com/devcontainers/jekyll"

# Verificar se foi fornecido um argumento para o nome da branch
if [ -z "$1" ]; then
  BRANCH_NAME=$DEFAULT_BRANCH_NAME
else
  BRANCH_NAME=$1
fi

# Criar a pasta local se não existir
mkdir -p $LOCAL_DIR

# Clonar o repositório e fazer checkout da branch
git clone $REPO_URL $LOCAL_DIR
cd $LOCAL_DIR
git checkout $BRANCH_NAME

# Construir o Dockerfile
cat <<EOL > Dockerfile
FROM --platform=linux/aarch64 $IMAGE_NAME
WORKDIR /srv/jekyll
COPY . .
EXPOSE 4000
CMD ["jekyll", "serve", "--host", "0.0.0.0"]
EOL

#RUN bundle install #removed after tge Copy and before the Expose

# Construir a imagem Docker
docker build --platform linux/aarch64  -t $CONTAINER_NAME .

# Executar o contêiner Docker
docker run -d -p 4000:4000 --name $CONTAINER_NAME --restart no $CONTAINER_NAME --platform linux/aarch64

# Informações de teste
echo "O site Jekyll está a ser executado no container Docker. Acesse http://localhost:4000 para visualizar."
