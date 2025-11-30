# PainelService

## 1. Visão Geral

O **PainelService** é um microserviço projetado para fornecer visualizações e dashboards no sistema FoodTrack. Sua função principal é atuar como camada de apresentação de dados agregados, oferecendo o **KDS (Kitchen Display System)** para a cozinha e painéis gerenciais para administradores.

### Responsabilidades Principais
- Exibir pedidos pendentes organizados por estação de preparo
- Fornecer interface do KDS para acompanhamento da cozinha
- Apresentar métricas operacionais em tempo real
- Consolidar dados de múltiplos serviços para dashboards

---

## 2. Infraestrutura Configurada

### Arquitetura Base
- **Autenticação:** JWT Bearer configurado no `Program.cs`
- **Banco de Dados:** MySQL com SqlKata para queries
- **Documentação:** Swagger UI habilitado
- **CORS:** Configurado para integração com frontend

### Estrutura do Projeto
```
PainelService/
├── Controllers/
│   └── PainelController.cs (estrutura base)
├── Program.cs (configurações JWT, DB, Swagger)
├── appsettings.json
└── appsettings.Development.json
```

---

## 3. Status de Implementação

⚠️ **IMPORTANTE:** Este microserviço possui a infraestrutura base configurada (autenticação JWT, conexão com banco de dados MySQL via SqlKata, e documentação Swagger), mas os endpoints específicos ainda não foram implementados no `PainelController.cs`.

### O que está pronto:
- ✅ Estrutura do projeto criada
- ✅ JWT Bearer authentication configurado
- ✅ Conexão com MySQL configurada
- ✅ SqlKata QueryFactory registrado
- ✅ Swagger UI habilitado
- ✅ Controller base criado

### O que falta implementar:
- ⏳ Endpoints de visualização de pedidos
- ⏳ Endpoints de métricas operacionais
- ⏳ Agregação de dados de outros serviços
- ⏳ Lógica de negócio para KDS

---

## 4. Integração Planejada

### Serviços Consumidos
O PainelService foi projetado para consultar dados de:

- **PedidoService** - Status e histórico de pedidos
- **PratoService** - Informações sobre pratos e categorias
- **MesaService** - Ocupação de mesas
- **PagamentoService** - Dados financeiros
- **NotificacaoService** - Alertas e avisos

---

**Desenvolvido por:** Equipe FoodTrack  
**Última atualização:** 30/11/2025
