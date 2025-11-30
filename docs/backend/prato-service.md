# PratoService

## 1. Visão Geral

O **PratoService** é responsável por gerenciar todo o cardápio do restaurante no sistema FoodTrack. Controla o cadastro de pratos, categorias, ingredientes e acréscimos disponíveis, fornecendo as informações necessárias para o PedidoService processar pedidos com preços e detalhes corretos.

### Responsabilidades Principais
- Gerenciar o cardápio completo do restaurante (CRUD de pratos)
- Organizar pratos em categorias (Entradas, Carnes, Bebidas, etc.)
- Cadastrar ingredientes e sua composição nos pratos
- Gerenciar acréscimos disponíveis (bacon extra, queijo adicional, etc.)
- Fornecer informações de preço e tempo de preparo para outros serviços
- Controlar disponibilidade de itens no cardápio

---

## 2. Endpoints

### 2.1. Gerenciamento de Pratos

#### **GET** `/api/prato`
Lista todos os pratos cadastrados no cardápio.

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "nome": "Picanha na Chapa",
    "descricao": "Picanha grelhada acompanhada de arroz, feijão e batata frita",
    "categoriaId": 2,
    "preco": 68.90,
    "tempoMedioPreparo": 25
  },
  {
    "id": 2,
    "nome": "Salada Caesar",
    "descricao": "Alface romana, croutons, parmesão e molho caesar",
    "categoriaId": 1,
    "preco": 22.50,
    "tempoMedioPreparo": 10
  }
]
```

**🔒 Autenticação:** Requer token JWT Bearer

---

#### **GET** `/api/prato/{id}`
Consulta um prato específico do cardápio.

**Response (200 OK):**
```json
{
  "id": 1,
  "nome": "Picanha na Chapa",
  "descricao": "Picanha grelhada acompanhada de arroz, feijão e batata frita",
  "categoriaId": 2,
  "preco": 68.90,
  "tempoMedioPreparo": 25
}
```

**🔒 Autenticação:** Requer token JWT Bearer

**Erros Possíveis:**
- `404 Not Found` - Prato não encontrado

---

#### **POST** `/api/prato`
Cadastra um novo prato no cardápio.

**Request Body:**
```json
{
  "nome": "Filé Mignon ao Molho Madeira",
  "descricao": "Filé mignon grelhado com molho madeira, arroz e legumes",
  "categoriaId": 2,
  "preco": 89.90,
  "tempoMedioPreparo": 30
}
```

**Response (201 Created):**
```json
{
  "id": 15,
  "nome": "Filé Mignon ao Molho Madeira",
  "descricao": "Filé mignon grelhado com molho madeira, arroz e legumes",
  "categoriaId": 2,
  "preco": 89.90,
  "tempoMedioPreparo": 30
}
```

**🔒 Autenticação:** Requer token JWT Bearer

**Regras de Negócio:**
- Nome é obrigatório e deve ser único
- Preço deve ser maior que zero
- TempoMedioPreparo em minutos
- CategoriaId deve existir no banco

---

#### **PUT** `/api/prato/{id}`
Atualiza um prato existente no cardápio.

**Request Body:**
```json
{
  "nome": "Picanha na Chapa Premium",
  "descricao": "Picanha nobre grelhada acompanhada de arroz, feijão tropeiro e batata rústica",
  "categoriaId": 2,
  "preco": 78.90,
  "tempoMedioPreparo": 25
}
```

**Response (204 No Content)**

**🔒 Autenticação:** Requer token JWT Bearer

**Erros Possíveis:**
- `404 Not Found` - Prato não encontrado

---

#### **DELETE** `/api/prato/{id}`
Remove um prato do cardápio.

**Response (204 No Content)**

**🔒 Autenticação:** Requer token JWT Bearer

**Erros Possíveis:**
- `404 Not Found` - Prato não encontrado

**⚠️ Atenção:** Remover prato pode causar inconsistências em pedidos históricos

---

### 2.2. Gerenciamento de Acréscimos

#### **GET** `/api/acrescimo`
Lista todos os acréscimos disponíveis.

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "nome": "Bacon Extra",
    "descricao": "Porção adicional de bacon crocante",
    "valor": 8.00
  },
  {
    "id": 2,
    "nome": "Queijo Cheddar",
    "descricao": "Fatia adicional de queijo cheddar",
    "valor": 5.50
  },
  {
    "id": 3,
    "nome": "Molho Especial",
    "descricao": "Porção extra de molho da casa",
    "valor": 3.00
  }
]
```

**🔒 Autenticação:** Requer token JWT Bearer

---

#### **GET** `/api/acrescimo/{id}`
Consulta um acréscimo específico.

**Response (200 OK):**
```json
{
  "id": 1,
  "nome": "Bacon Extra",
  "descricao": "Porção adicional de bacon crocante",
  "valor": 8.00
}
```

**🔒 Autenticação:** Requer token JWT Bearer

**Erros Possíveis:**
- `404 Not Found` - Acréscimo não encontrado

---

#### **POST** `/api/acrescimo`
Cadastra um novo acréscimo disponível.

**Request Body:**
```json
{
  "nome": "Ovo Frito",
  "descricao": "Ovo frito adicional",
  "valor": 4.50
}
```

**Response (201 Created):**
```json
{
  "id": 8,
  "nome": "Ovo Frito",
  "descricao": "Ovo frito adicional",
  "valor": 4.50
}
```

**🔒 Autenticação:** Requer token JWT Bearer

**Casos de Uso:**
- Bacon extra, queijo adicional, ovo frito
- Molhos especiais, temperos extras
- Guarnições adicionais

---

#### **PUT** `/api/acrescimo/{id}`
Atualiza um acréscimo existente.

**Request Body:**
```json
{
  "nome": "Bacon Especial Extra",
  "descricao": "Porção adicional de bacon defumado crocante",
  "valor": 9.50
}
```

**Response (204 No Content)**

**🔒 Autenticação:** Requer token JWT Bearer

**Erros Possíveis:**
- `404 Not Found` - Acréscimo não encontrado

---

#### **DELETE** `/api/acrescimo/{id}`
Remove um acréscimo do sistema.

**Response (204 No Content)**

**🔒 Autenticação:** Requer token JWT Bearer

**Erros Possíveis:**
- `404 Not Found` - Acréscimo não encontrado

---

### 2.3. Gerenciamento de Categorias

#### **GET** `/api/categoria`
Lista todas as categorias de pratos.

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "nome": "Entradas",
    "descricao": "Aperitivos e entradas"
  },
  {
    "id": 2,
    "nome": "Carnes",
    "descricao": "Pratos com carnes grelhadas e assadas"
  },
  {
    "id": 3,
    "nome": "Massas",
    "descricao": "Pratos de massas e risotos"
  },
  {
    "id": 4,
    "nome": "Bebidas",
    "descricao": "Sucos, refrigerantes e bebidas"
  },
  {
    "id": 5,
    "nome": "Sobremesas",
    "descricao": "Doces e sobremesas"
  }
]
```

**🔒 Autenticação:** Requer token JWT Bearer

---

#### **GET** `/api/categoria/{id}`
Consulta uma categoria específica.

**Response (200 OK):**
```json
{
  "id": 2,
  "nome": "Carnes",
  "descricao": "Pratos com carnes grelhadas e assadas"
}
```

**🔒 Autenticação:** Requer token JWT Bearer

**Erros Possíveis:**
- `404 Not Found` - Categoria não encontrada

---

#### **POST** `/api/categoria`
Cadastra uma nova categoria de pratos.

**Request Body:**
```json
{
  "nome": "Veganos",
  "descricao": "Pratos vegetarianos e veganos"
}
```

**Response (201 Created):**
```json
{
  "id": 6,
  "nome": "Veganos",
  "descricao": "Pratos vegetarianos e veganos"
}
```

**🔒 Autenticação:** Requer token JWT Bearer

**Casos de Uso:**
- Organizar cardápio por tipo de prato
- Facilitar busca de pratos no sistema
- Agrupar para visualização no KDS por estação

---

#### **PUT** `/api/categoria/{id}`
Atualiza uma categoria existente.

**Request Body:**
```json
{
  "nome": "Carnes Premium",
  "descricao": "Pratos com cortes nobres e especiais"
}
```

**Response (204 No Content)**

**🔒 Autenticação:** Requer token JWT Bearer

**Erros Possíveis:**
- `404 Not Found` - Categoria não encontrada

---

#### **DELETE** `/api/categoria/{id}`
Remove uma categoria do sistema.

**Response (204 No Content)**

**🔒 Autenticação:** Requer token JWT Bearer

**Erros Possíveis:**
- `404 Not Found` - Categoria não encontrada

**⚠️ Atenção:** Não permite remover categoria com pratos vinculados

---

### 2.4. Gerenciamento de Ingredientes

#### **GET** `/api/ingrediente`
Lista todos os ingredientes cadastrados.

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "nome": "Picanha",
    "descricao": "Carne bovina nobre"
  },
  {
    "id": 2,
    "nome": "Alface Romana",
    "descricao": "Alface tipo romana fresca"
  },
  {
    "id": 3,
    "nome": "Queijo Parmesão",
    "descricao": "Queijo parmesão ralado"
  }
]
```

**🔒 Autenticação:** Requer token JWT Bearer

---

#### **GET** `/api/ingrediente/{id}`
Consulta um ingrediente específico.

**Response (200 OK):**
```json
{
  "id": 1,
  "nome": "Picanha",
  "descricao": "Carne bovina nobre"
}
```

**🔒 Autenticação:** Requer token JWT Bearer

**Erros Possíveis:**
- `404 Not Found` - Ingrediente não encontrado

---

#### **POST** `/api/ingrediente`
Cadastra um novo ingrediente.

**Request Body:**
```json
{
  "nome": "Filé Mignon",
  "descricao": "Corte nobre de carne bovina"
}
```

**Response (201 Created):**
```json
{
  "id": 25,
  "nome": "Filé Mignon",
  "descricao": "Corte nobre de carne bovina"
}
```

**🔒 Autenticação:** Requer token JWT Bearer

**Casos de Uso:**
- Controle de composição de pratos
- Gestão de estoque (futura integração)
- Alergias e restrições alimentares

---

#### **PUT** `/api/ingrediente/{id}`
Atualiza um ingrediente existente.

**Request Body:**
```json
{
  "nome": "Picanha Argentina",
  "descricao": "Carne bovina nobre importada da Argentina"
}
```

**Response (204 No Content)**

**🔒 Autenticação:** Requer token JWT Bearer

**Erros Possíveis:**
- `404 Not Found` - Ingrediente não encontrado

---

#### **DELETE** `/api/ingrediente/{id}`
Remove um ingrediente do sistema.

**Response (204 No Content)**

**🔒 Autenticação:** Requer token JWT Bearer

**Erros Possíveis:**
- `404 Not Found` - Ingrediente não encontrado

---

## 3. Modelos de Dados

### Prato
```json
{
  "id": "int",
  "nome": "string",
  "descricao": "string",
  "categoriaId": "int",
  "preco": "decimal",
  "tempoMedioPreparo": "int (minutos)"
}
```

### Acrescimo
```json
{
  "id": "int",
  "nome": "string",
  "descricao": "string",
  "valor": "decimal"
}
```

### Categoria
```json
{
  "id": "int",
  "nome": "string",
  "descricao": "string"
}
```

### Ingrediente
```json
{
  "id": "int",
  "nome": "string",
  "descricao": "string"
}
```

---

## 4. Integração com Outros Serviços

### → **PedidoService** (Saída)
- PedidoService consulta tabela `Pratos` ao adicionar item em comanda
- Obtém automaticamente `Preco` do prato
- Utiliza `TempoMedioPreparo` para estimativas
- Valida existência do prato antes de criar pedido

### → **PainelService** (Saída - Futuro)
- Agrupa pratos por `CategoriaId` para organizar KDS
- Utiliza `TempoMedioPreparo` para alertas de tempo excessivo
- Identifica pratos mais vendidos para dashboard

### → **RelatorioService** (Saída)
- Análise de pratos mais vendidos
- Receita por categoria
- Tempo médio real vs estimado de preparo

---

## 5. Fluxo de Cadastro de Cardápio

```
1. Administrador cadastra categorias (Entradas, Carnes, Bebidas, etc.)
2. Cadastra ingredientes disponíveis (Picanha, Alface, Queijo, etc.)
3. Cadastra pratos vinculando a categorias
4. Define preço e tempo médio de preparo
5. Cadastra acréscimos opcionais (Bacon Extra, Queijo Adicional)
6. Pratos ficam disponíveis no PedidoService
7. Garçons podem adicionar aos pedidos
8. Preços e informações são buscados automaticamente
```

---

## 6. Regras de Negócio

1. **Pratos:**
   - Nome deve ser único no cardápio
   - Preço deve ser maior que zero
   - TempoMedioPreparo em minutos (usado pela cozinha)
   - CategoriaId obrigatória para organização

2. **Categorias:**
   - Organizam pratos por tipo/estação de preparo
   - Exemplos: Entradas, Carnes, Massas, Bebidas, Sobremesas
   - Facilitam navegação no cardápio
   - Podem ser vinculadas a estações do KDS

3. **Acréscimos:**
   - Opcionais para personalização de pratos
   - Possuem valor adicional
   - Exemplos: bacon extra, queijo adicional, molho especial
   - Quantidade controlada no PedidoService

4. **Ingredientes:**
   - Base para composição dos pratos
   - Útil para controle de estoque (futura integração)
   - Importante para gerenciar alergias/restrições

5. **Disponibilidade:**
   - Pratos inativos não devem ser removidos (integridade histórica)
   - Considerar flag "disponível" ao invés de DELETE
   - Manter histórico de preços para relatórios

---

## 7. Casos de Uso

### 7.1. Cadastrar Novo Prato no Cardápio
**Cenário:** Restaurante cria novo prato especial  
**Ação:** Chef cadastra no sistema com preço e tempo de preparo  
**Resultado:** Prato disponível para pedidos imediatamente  

### 7.2. Atualizar Preço de Prato
**Cenário:** Reajuste de preços no cardápio  
**Ação:** Administrador atualiza preços via API  
**Resultado:** Novos pedidos usam preço atualizado  

### 7.3. Organizar Cardápio por Categorias
**Cenário:** Facilitar navegação no app/site  
**Ação:** Pratos agrupados por categoria  
**Resultado:** Cliente visualiza cardápio organizado (Entradas → Carnes → Sobremesas)  

### 7.4. Adicionar Acréscimo Sazonal
**Cenário:** Promoção de bacon extra  
**Ação:** Gerente cadastra novo acréscimo temporário  
**Resultado:** Opção disponível para personalização de pratos  

---

## 8. Exemplos de Teste

### Cadastrar Prato Completo
```json
// 1. Criar categoria
POST /api/categoria
{
  "nome": "Carnes",
  "descricao": "Pratos com carnes nobres"
}

// 2. Cadastrar ingredientes
POST /api/ingrediente
{
  "nome": "Picanha",
  "descricao": "Carne bovina nobre"
}

// 3. Criar prato
POST /api/prato
{
  "nome": "Picanha na Chapa",
  "descricao": "Picanha grelhada com acompanhamentos",
  "categoriaId": 2,
  "preco": 68.90,
  "tempoMedioPreparo": 25
}

// 4. Adicionar acréscimos disponíveis
POST /api/acrescimo
{
  "nome": "Bacon Extra",
  "descricao": "Porção adicional de bacon",
  "valor": 8.00
}
```

### Consultar Cardápio Completo
```json
GET /api/prato

Response (200):
[
  {
    "id": 1,
    "nome": "Picanha na Chapa",
    "descricao": "Picanha grelhada com acompanhamentos",
    "categoriaId": 2,
    "preco": 68.90,
    "tempoMedioPreparo": 25
  },
  {
    "id": 2,
    "nome": "Salada Caesar",
    "descricao": "Alface romana com molho caesar",
    "categoriaId": 1,
    "preco": 22.50,
    "tempoMedioPreparo": 10
  }
]
```

---

**Última atualização:** 30/11/2025
