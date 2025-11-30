# RelatorioService

## 1. Visão Geral

O **RelatorioService** é responsável por fornecer dados consolidados e relatórios gerenciais para análise de desempenho do restaurante no sistema FoodTrack. Oferece informações sobre vendas por garçom/atendente, comandas atendidas, itens vendidos, faturamento e ticket médio, auxiliando na tomada de decisões estratégicas.

### Responsabilidades Principais
- Gerar relatórios de vendas por atendente/garçom
- Consolidar dados de comandas e itens vendidos
- Calcular métricas financeiras (total bruto, ticket médio)
- Fornecer dados para dashboards gerenciais
- Analisar desempenho individual de atendentes

---

## 2. Endpoints

### 2.1. **GET** `/api/relatorio`
Lista todos os relatórios de vendas consolidados, geralmente agrupados por garçom/atendente.

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "garcom": "João Silva",
    "comandas": 15,
    "itensVendidos": 48,
    "totalBruto": 1850.50,
    "tiqueteMedio": 123.37
  },
  {
    "id": 2,
    "garcom": "Maria Santos",
    "comandas": 12,
    "itensVendidos": 38,
    "totalBruto": 1420.80,
    "tiqueteMedio": 118.40
  },
  {
    "id": 3,
    "garcom": "Pedro Oliveira",
    "comandas": 18,
    "itensVendidos": 62,
    "totalBruto": 2180.00,
    "tiqueteMedio": 121.11
  }
]
```

**Regras de Negócio:**
- Dados consolidados por garçom/atendente
- TiqueteMedio = TotalBruto / Comandas
- Útil para análise de desempenho individual
- Pode ser filtrado por período (implementação futura)

---

## 3. Modelos de Dados

### RelatorioVenda
```json
{
  "id": "int",
  "garcom": "string",
  "comandas": "int",
  "itensVendidos": "int",
  "totalBruto": "decimal",
  "tiqueteMedio": "decimal"
}
```

**Descrição dos Campos:**
- `id` - Identificador único do relatório
- `garcom` - Nome do garçom/atendente
- `comandas` - Quantidade total de comandas atendidas
- `itensVendidos` - Quantidade total de itens vendidos
- `totalBruto` - Valor total faturado (soma de todas as comandas)
- `tiqueteMedio` - Valor médio por comanda (totalBruto / comandas)

---

## 4. Integração com Outros Serviços

### ← **PedidoService** (Entrada)
- Consulta comandas fechadas para contabilizar vendas
- Soma itens vendidos por atendente
- Calcula quantidade de comandas atendidas

### ← **PagamentoService** (Entrada)
- Obtém valores pagos para cálculo de faturamento
- Valida comandas efetivamente pagas
- Cruza dados de pagamento com comandas

### ← **FuncionarioService** (Entrada)
- Identifica garçons/atendentes por ID
- Obtém nomes para exibição em relatórios
- Valida existência de funcionários

### → **PainelService** (Saída - Futuro)
- Fornece dados para dashboard gerencial
- Alimenta gráficos de desempenho
- Exibe ranking de vendedores

---

## 5. Métricas Calculadas

### 5.1. Ticket Médio
Valor médio por comanda atendida pelo garçom.

**Fórmula:** `TiqueteMedio = TotalBruto / Comandas`

**Exemplo:**
- Total Bruto: R$ 1.850,50
- Comandas: 15
- **Ticket Médio: R$ 123,37**

### 5.2. Total Bruto
Soma de todas as vendas realizadas pelo atendente.

**Cálculo:** Soma dos valores finais de todas as comandas fechadas

### 5.3. Itens Vendidos
Quantidade total de itens vendidos pelo garçom.

**Cálculo:** Contagem de todos os ItemPedido das comandas do atendente

### 5.4. Produtividade
Quantidade de comandas atendidas no período.

**Utilidade:** Avaliar volume de atendimentos por garçom

---

## 6. Casos de Uso

### 6.1. Analisar Desempenho de Garçons
**Cenário:** Gerente deseja avaliar performance da equipe  
**Ação:** Consulta relatório de vendas por garçom  
**Resultado:** Visualiza ranking de vendas, ticket médio e produtividade  

### 6.2. Calcular Comissões
**Cenário:** Restaurante paga comissão sobre vendas  
**Ação:** Sistema consulta total bruto por garçom  
**Resultado:** Base de cálculo para comissões disponível  

### 6.3. Identificar Melhor Vendedor
**Cenário:** Premiação do funcionário do mês  
**Ação:** Ordena relatório por total bruto ou ticket médio  
**Resultado:** Identifica atendente com melhor desempenho  

### 6.4. Avaliar Produtividade
**Cenário:** Análise de eficiência operacional  
**Ação:** Compara quantidade de comandas por garçom  
**Resultado:** Identifica sobrecarga ou ociosidade  

---

## 7. Fluxo de Geração de Relatórios

```
1. Comandas são fechadas no PedidoService
2. Pagamentos são confirmados no PagamentoService
3. Dados são consolidados na tabela relatorios_vendas
4. RelatorioService consulta dados agregados
5. Calcula métricas (ticket médio, totais)
6. Retorna relatórios para dashboard/gerente
7. Dados podem ser exportados (CSV/PDF - futuro)
```

---

## 8. Regras de Negócio

1. **Consolidação de Dados:**
   - Dados agrupados por garçom/atendente
   - Apenas comandas fechadas são contabilizadas
   - Apenas pagamentos confirmados entram no total bruto

2. **Cálculo de Ticket Médio:**
   - TiqueteMedio = TotalBruto / Comandas
   - Divisão por zero tratada (quando comandas = 0)
   - Valor sempre em decimal com 2 casas

3. **Contabilização:**
   - Itens vendidos = soma de todos os ItemPedido
   - Comandas = contagem de comandas únicas
   - Total bruto = soma dos valores finais das comandas

4. **Período de Análise:**
   - Sistema atual consulta todos os dados históricos
   - Filtros por período a serem implementados (hoje, semana, mês)
   - Necessário adicionar campo de data para filtragem temporal

---

## 9. Exemplos de Teste

### Consultar Relatório de Vendas
```json
GET /api/relatorio

Response (200):
[
  {
    "id": 1,
    "garcom": "João Silva",
    "comandas": 15,
    "itensVendidos": 48,
    "totalBruto": 1850.50,
    "tiqueteMedio": 123.37
  },
  {
    "id": 2,
    "garcom": "Maria Santos",
    "comandas": 12,
    "itensVendidos": 38,
    "totalBruto": 1420.80,
    "tiqueteMedio": 118.40
  }
]
```

### Análise de Desempenho
```json
// Ordenar por totalBruto para identificar top vendedor
// João Silva: R$ 1.850,50 (1º lugar)
// Pedro Oliveira: R$ 2.180,00 (1º lugar)
// Maria Santos: R$ 1.420,80 (3º lugar)

// Ordenar por tiqueteMedio para identificar melhor ticket
// João Silva: R$ 123,37 (1º lugar)
// Pedro Oliveira: R$ 121,11 (2º lugar)
// Maria Santos: R$ 118,40 (3º lugar)
```

---

## 10. Funcionalidades Futuras Planejadas

### Filtros por Período
```json
GET /api/relatorio?periodo=hoje
GET /api/relatorio?periodo=semana
GET /api/relatorio?periodo=mes
GET /api/relatorio?dataInicio=2025-11-01&dataFim=2025-11-30
```

### Relatórios Adicionais
- **Produtos Mais Vendidos:** Top 10 pratos do cardápio
- **Vendas por Categoria:** Faturamento por tipo de prato
- **Horários de Pico:** Análise de movimento por hora
- **Taxa de Ocupação:** Média de mesas ocupadas
- **Tempo Médio de Atendimento:** Da abertura ao fechamento da comanda

### Exportação
```json
GET /api/relatorio/exportar?formato=csv
GET /api/relatorio/exportar?formato=pdf
```

### Métricas Avançadas
- **Taxa de Conversão:** Comandas abertas vs fechadas
- **Acréscimos Mais Vendidos:** Bacon extra, queijo adicional, etc.
- **Comparativo Mensal:** Crescimento mês a mês
- **Análise de Meios de Pagamento:** Preferências dos clientes

---

## 11. Estrutura de Dados

### Tabela: relatorios_vendas
```sql
CREATE TABLE relatorios_vendas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    garcom VARCHAR(255),
    comandas INT,
    itens_vendidos INT,
    total_bruto DECIMAL(10,2),
    tiquete_medio DECIMAL(10,2)
);
```

**Observação:** Dados são consolidados por processo batch ou trigger ao fechar comandas e confirmar pagamentos.

---

**Última atualização:** 30/11/2025
