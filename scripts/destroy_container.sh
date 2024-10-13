#!/bin/bash

# Diretório a ser verificado e removido
DIR="/tmp/site-helder"

# Verificar se o diretório existe
if [ -d "$DIR" ]; then
  echo "Folder '$DIR' exists. Removing it..."

  # Remover o diretório e todos os arquivos dentro dele
  rm -rf "$DIR"

  echo "A pasta '$DIR' foi removida com sucesso."
else
  echo "A pasta '$DIR' não existe. Nada a remover."
fi

# Nome padrão do contêiner Docker
DEFAULT_CONTAINER_NAME="nome-do-container-padrao"

# Verificar se foi fornecido um argumento para o nome do contêiner
if [ -z "$1" ]; then
  CONTAINER_NAME=$DEFAULT_CONTAINER_NAME
else
  CONTAINER_NAME=$1
fi

# Verificar se o contêiner está em execução
if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
    echo "O container '$CONTAINER_NAME' está em execução. Parando e removendo..."

    # Parar o contêiner
    docker stop $CONTAINER_NAME

    # Remover o contêiner
    docker rm $CONTAINER_NAME

    echo "Container '$CONTAINER_NAME' parado e removido com sucesso."
else
    echo "Nenhum container em execução com o nome '$CONTAINER_NAME'."
fi
