# Wireframes - Frontend Mobile

## 1. Visão Geral

Este documento apresenta os wireframes detalhados das telas da aplicação mobile do FoodTrack (React Native / Expo).

## 2. Ferramentas Utilizadas

- **Figma** para design de alta fidelidade
- **Expo** para protótipo navegável

## 3. Telas Principais

### 3.1. Login Mobile (M01)
```
[Inserir wireframe: img/mobile/wireframe-login.png]
```

**Elementos:**
- Logo (topo)
- Inputs de e-mail e senha
- Botão "Entrar" (full width)
- Layout centralizado vertical

---

### 3.2. Dashboard - Mesas Mobile (M02)
```
[Inserir wireframe: img/mobile/wireframe-mesas.png]
```

**Elementos:**
- Header compacto
- Grid responsivo de mesas (2 colunas)
- Botão flutuante "+"
- Bottom navigation: Mesas | Prontos | Perfil

---

### 3.3. Comanda Mobile (M03)
```
[Inserir wireframe: img/mobile/wireframe-comanda.png]
```

**Elementos:**
- Scroll horizontal de categorias
- Lista vertical de produtos
- Modal de carrinho (bottom sheet)
- Botão fixo "Enviar"

---

### 3.4. KDS Mobile (M04)
```
[Inserir wireframe: img/mobile/wireframe-kds.png]
```

**Elementos:**
- Tabs por estação (topo)
- Cards de pedidos (scroll vertical)
- Swipe gestures para mudar status
- Badge de notificações

---

### 3.5. Prontos para Entrega (M05)
```
[Inserir wireframe: img/mobile/wireframe-prontos.png]
```

**Elementos:**
- Lista de itens prontos
- Agrupados por mesa
- Swipe to action "Marcar entregue"
- Indicador de tempo decorrido

---

### 3.6. Pagamento Mobile (M06)
```
[Inserir wireframe: img/mobile/wireframe-pagamento.png]
```

**Elementos:**
- Resumo compacto da comanda
- Chips de formas de pagamento
- Modal de divisão
- Botão "Fechar Comanda"

---

### 3.7. Relatórios Mobile (M07)
```
[Inserir wireframe: img/mobile/wireframe-relatorios.png]
```

**Elementos:**
- Filtros colapsáveis
- Gráficos responsivos
- Cards de métricas
- Botão de compartilhar

---

### 3.8. Perfil/Usuários Mobile (M08)
```
[Inserir wireframe: img/mobile/wireframe-perfil.png]
```

**Elementos:**
- Avatar e nome
- Lista de configurações
- Botão logout

---

## 4. Navegação Mobile

```
Login → Tab Navigation:
  ├─ Tab 1: Mesas/Pedidos
  ├─ Tab 2: Prontos
  └─ Tab 3: Perfil

KDS: Screen separada (fullscreen)
```

---

## 5. Interações Gestuais

- **Swipe Right:** Marcar item como entregue
- **Swipe Left:** Cancelar/Remover
- **Long Press:** Detalhes completos
- **Pull to Refresh:** Atualizar listas

---

## 6. Link do Protótipo Interativo

**Figma:** [Inserir link aqui]
**Expo:** [Inserir link snack.expo.dev]

---

**Última atualização:** 30/11/2025
