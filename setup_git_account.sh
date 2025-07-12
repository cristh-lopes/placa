#!/bin/bash

echo "=== Configuração de Nova Conta Git/GitHub ==="
echo ""

# Solicitar informações do usuário
read -p "Digite o nome de usuário do GitHub: " username
read -p "Digite o email da conta do GitHub: " email

# Configurar Git
git config --global user.name "$username"
git config --global user.email "$email"

echo ""
echo "=== Configurações aplicadas ==="
echo "Nome: $(git config --global user.name)"
echo "Email: $(git config --global user.email)"
echo ""

echo "=== Próximos passos ==="
echo "1. Vá para https://github.com/settings/tokens"
echo "2. Clique em 'Generate new token (classic)'"
echo "3. Selecione os escopos necessários (pelo menos 'repo')"
echo "4. Copie o token gerado"
echo "5. Na próxima operação Git (push/pull), use o token como senha"
echo ""
echo "Ou execute: git push origin main"
echo "E digite o token quando solicitado a senha" 