const express = require('express');
const cors = require('cors');

const { Sequelize } = require('./models');
const models = require('./models');
const app = express();
app.use(cors());
app.use(express.json());

let cliente = models.Cliente;
let itempedido = models.ItemPedido;
let pedido = models.Pedido;
let servico = models.Servico
let itemcompra = models.ItemCompra;
let compra = models.Compra;
let produto = models.Produto;

app.get('/', function (req, res) {
    res.send('Olá, mundo!')
});

app.post('/servicos', async (req, res) => {
    await servico.create(
        req.body
    ).then(function () {
        return res.json({
            error: false,
            message: "Serviço criado com sucesso!"
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Foi impossível se conectar."
        })
    });
});

app.post('/clientes', async (req, res) => {
    await cliente.create(
        req.body
    ).then(function () {
        return res.json({
            error: false,
            message: "Seja bem-vindo(a) a ServicesTI!"
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Foi impossível se conectar."
        })
    });
});

app.post('/pedidos', async (req, res) => {
    await pedido.create(
        req.body
    ).then(function () {
        return res.json({
            error: false,
            message: "Seu pedido está feito."
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Foi impossível se conectar."
        })
    });
});

app.post('/itempedido', async (req, res) => {
    await itempedido.create(
        req.body
    ).then(item => {
        return res.json({
            error: false,
            message: "O item foi criado.",
            item
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Foi impossível se conectar."
        });
    });
});


app.post('/pedido/:id/itempedidos', async (req, res) => {
    const item = {
        quantidade: req.body.quantidade,
        valor: req.body.valor,
        ServicoId: req.body.ServicoId,
        PedidoId: req.params.id
    };
    if (! await pedido.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: "O pedido não existe."
        });
    };

    await itempedido.create(item)
        .then(itped => {
            return res.json({
                error: false,
                message: "Item inserido com sucesso!",
                itped
            });
        }).catch(erro => {
            return res.status(400).json({
                error: true,
                message: "O item não foi criado."
            })
        });
});

app.get('/listaservicos', async (req, res) => {
    await servico.findAll({
        raw: true
        // order: [['nome', 'ASC']]
    }).then(function (servicos) {
        res.json({ servicos })
    });
});

app.get('/ofertaservicos', async (req, res) => {
    await servico.count('id').then(function (servicos) {
        res.json({ servicos });
    });
});

app.get('/cliente/:id/pedidos', async (req, res) => {
    await pedido.findAll({
        where: { ClienteId: req.params.id }
    }).then(pedidos => {
        return res.json({
            error: false,
            pedidos
        });
    }).catch((erro) => {
        return res.status(400).json({
            error: true,
            message: "Problema de conexão."
        });
    });
});

app.get('/servico/:id', async (req, res) => {
    await servico.findByPk(req.params.id)
        .then(serv => {
            return res.json({
                error: false,
                serv
            });
        }).catch(function (erro) {
            return res.status(400).json({
                error: true,
                message: "Erro: não foi posível se conectar!"
            });
        });
});

app.get('/pedido/:id', async (req, res) => {
    await pedido.findByPk(req.params.id)
        .then(ped => {
            return res.json({
                error: false,
                ped
            });
        }).catch(function (erro) {
            return res.status(400).json({
                error: true,
                message: "Erro: não foi posível se conectar!"
            });
        });
});

app.get('/compra/:id', async (req, res) => {
    await compra.findByPk(req.params.id)
        .then(comp => {
            return res.json({
                error: false,
                comp
            });
        }).catch(function (erro) {
            return res.status(400).json({
                error: true,
                message: "Erro: não foi posível se conectar!"
            });
        });
});

app.get('/servico/:id/pedidos', async (req, res) => {
    await itempedido.findAll({
        where: { ServicoId: req.params.id }
    })
        .then(item => {
            return res.json({
                error: false,
                item
            });
        }).catch(function (erro) {
            return res.status(400).json({
                error: true,
                message: "Erro: não foi posível se conectar!"
            });
        });
});

app.get('/listaclientes', async (req, res) => {
    await cliente.findAll({
        raw: true
        // order: [['clienteDesde', 'ASC']]
    }).then(function (clientes) {
        res.json({ clientes })
    });
});

app.get('/listapedidos', async (req, res) => {
    await pedido.findAll({
        raw: true
    }).then(function (pedidos) {
        res.json({ pedidos })
    });
});

app.get('/listaservicos', async (req, res) => {
    await servico.findAll({
        raw: true
    }).then(function (servicos) {
        res.json({ servicos })
    });
});

app.get('/listaprodutos', async (req, res) => {
    await produto.findAll({
        raw: true
    }).then(function (produtos) {
        res.json({ produtos })
    });
});

app.get('/listacompras', async (req, res) => {
    await compra.findAll({
        raw: true
    }).then(function (compras) {
        res.json({ compras })
    });
});

app.get('/listaitempedido', async (req, res) => {
    await itempedido.findAll()
        .then(item => {
            return res.json({
                error: false,
                item
            });
        }).catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Erro de conexão."
            })
        })
});

app.get('/listaitemcompra', async (req, res) => {
    await itemcompra.findAll()
        .then(item => {
            return res.json({
                error: false,
                item
            });
        }).catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Erro de conexão."
            })
        })
});

app.get('/valorpedidos', async (req, res) => {
    await itempedido.findAll({
        // raw: true
        order: [['valor', 'ASC']]
    }).then(function (itpedidos) {
        res.json({ itpedidos })
    });
});

app.get('/ofertaclientes', async (req, res) => {
    await cliente.count('id').then(function (clientes) {
        res.json({ clientes });
    });
});

app.get('/ofertapedidos', async (req, res) => {
    await pedido.count('id').then(function (pedidos) {
        res.json({ pedidos });
    });
});

app.get('/atualizaservico', async (req, res) => {
    await servico.findByPk(1)
        .then(serv => {
            serv.nome = 'HTML/CSS/JS';
            serv.descricao = 'Páginas estáticas e dinâmicas estilizadas';
            serv.save();
            return res.json({ serv });
        });
});

app.put('/atualizaservico', async (req, res) => {
    await servico.update(req.body, {
        where: { id: req.body.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "Serviço foi alterado com sucesso!"
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Erro na alteração do serviço."
        });
    });
});

app.get('/verpedido/:id', async (req, res) => {
    await pedido.findByPk(req.params.id, { include: [{ all: true }] })
        .then(ped => {
            return res.json({ ped });
        });
});

app.put('/pedido/:id', async (req, res) => {
    const ped = {
        id: req.params.id,
        ClienteId: req.body.ClienteId,
        data: req.body.data
    };
    if (! await cliente.findByPk(req.body.ClienteId)) {
        return res.status(400).json({
            error: true,
            message: "Cliente não existe."
        });
    };
    await pedido.update(ped, {
        where: Sequelize.and({ ClienteId: req.body.ClienteId },
            { id: req.params.id })
    }).then(pedidos => {
        return res.json({
            error: false,
            message: "Cliente foi inserido com sucesso.",
            pedidos
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Problema de conexão."
        });
    });
});

app.put('/cliente/:id', async (req, res) => {
    const cli = {
        id: req.params.id,
        nome: req.body.nome,
        endereco: req.body.endereco,
        cidade: req.body.cidade,
        uf: req.body.uf,
        nascimento: req.body.nascimento,
        clienteDesde: req.body.clienteDesde,
            
    };
    if (! await cliente.findByPk(req.body.id)) {
        return res.status(400).json({
            error: true,
            message: "Cliente não existe."
        });
    };
    await cliente.update(cli, {
        where: Sequelize.and({ id: req.body.id },
            { id: req.params.id })
    }).then(clientes => {
        return res.json({
            error: false,
            message: "Cliente foi inserido com sucesso.",
            clientes
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Problema de conexão."
        });
    });
});
app.put('/servico/:id', async (req, res) => {
    const serv = {
        id: req.params.id,
        nome: req.body.nome,
        descricao: req.body.descricao
    };
    if (! await servico.findByPk(req.body.id)) {
        return res.status(400).json({
            error: true,
            message: "Serviço não existe."
        });
    };
    await servico.update(serv, {
        where: { id: req.params.id }
        }).then(servicos => {
        return res.json({
            error: false,
            message: "Serviço alterado com sucesso.",
            servicos
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Não foi possível alterar o serviço."
        });
    });
});

app.put('/produto/:id', async (req, res) => {
    const prod = {
        id: req.params.id,
        nome: req.body.nome,
        descricao: req.body.descricao
    };
    if (! await produto.findByPk(req.body.id)) {
        return res.status(400).json({
            error: true,
            message: "Produto não existe."
        });
    };
    await produto.update(prod, {
        where: { id: req.params.id }
        }).then(produtos => {
        return res.json({
            error: false,
            message: "Produto alterado com sucesso.",
            produtos
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Não foi possível alterar o produto."
        });
    });
});

app.put('/pedido/:id', async (req, res) => {
    const ped = {
        id: req.params.id,
        data: req.body.data,
        ClienteId: req.body.ClienteId,
            
    };
    if (! await cliente.findByPk(req.body.ClienteId)) {
        return res.status(400).json({
            error: true,
            message: "Pedido não existe."
        });
    };
    await pedido.update(ped, {
        where: Sequelize.and({ ClienteId: req.body.ClienteId },
            { id: req.params.id })
    }).then(pedidos => {
        return res.json({
            error: false,
            message: "Pedido inserido com sucesso.",
            pedidos
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Problema de conexão."
        });
    });
});

app.put('/compra/:id', async (req, res) => {
    const comp = {
        id: req.params.id,
        data: req.body.data,
        ClienteId: req.body.ClienteId,      
    };
    if (! await cliente.findByPk(req.body.ClienteId)) {
        return res.status(400).json({
            error: true,
            message: "Compra não existe."
        });
    };
    await compra.update(comp, {
        where: Sequelize.and({ ClienteId: req.body.ClienteId },
            { id: req.params.id })
    }).then(compras => {
        return res.json({
            error: false,
            message: "Compra inserida com sucesso.",
            compras
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Problema de conexão."
        });
    });
});

app.put('/alterar-itempedido/:id', async (req,res)=>{
    const item = {
        quantidade: req.body.quantidade,
        valor: req.body.valor
    };
    if (!await pedido.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: "Pedido não foi encontrado."
        });
    };
    if (!await servico.findByPk(req.body.ServicoId)){
        return res.status(400).json({
            error: true,
            message: "Serviço não foi encontrado."
        });
    };
    await itempedido.update(item, {
        where: Sequelize.and({ServicoId: req.body.ServicoId},
            {PedidoId: req.params.id})
    }).then((itens)=>{
        return res.json({
            error: false,
            message: "Alteração feita com sucesso.",
            itens
        });
    }).catch((erro) => {
        return res.status(400).json({
            error: false,
            message: "Erro: o item não foi alterado.",
        });
    });
});

app.put('/alterar-itemcompra/:id', async (req,res)=>{
    const item = {
        quantidade: req.body.quantidade,
        valor: req.body.valor
    };
    if (!await compra.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: "Compra não foi encontrada."
        });
    };
    if (!await itemcompra.findByPk(req.body.ServicoId)){
        return res.status(400).json({
            error: true,
            message: "Produto não foi encontrado."
        });
    };
    await itemcompra.update(item, {
        where: Sequelize.and({ProdutoId: req.body.ProdutoId},
            {CompraId: req.params.id})
    }).then((itens)=>{
        return res.json({
            error: false,
            message: "Alteração feita com sucesso.",
            itens
        });
    }).catch((erro) => {
        return res.status(400).json({
            error: false,
            message: "Erro: o item não foi alterado.",
        });
    });
});


app.get('/excluircliente/:id', async (req, res) => {
    await cliente.destroy({
        where: { id: req.params.id }
    }).then(() =>{
        return res.json({
            error: false,
            message: "Cliente excluído com sucesso!"
        });
    }).catch(erro =>{
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir o cliente."
        });
    });
});

app.get('/excluirpedido/:id', async (req, res) => {
    await pedido.destroy({
        where: { id: req.params.id }
    }).then(() =>{
        return res.json({
            error: false,
            message: "Pedido excluído com sucesso!"
        });
    }).catch(erro =>{
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir o pedido."
        });
    });
});

app.get('/excluirservico/:id', async (req, res) => {
    await servico.destroy({
        where: { id: req.params.id }
    }).then(() =>{
        return res.json({
            error: false,
            message: "Serviço excluído com sucesso!"
        });
    }).catch(erro =>{
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir o serviço."
        });
    });
});

app.get('/excluirproduto/:id', async (req, res) => {
    await produto.destroy({
        where: { id: req.params.id }
    }).then(() =>{
        return res.json({
            error: false,
            message: "Produto excluído com sucesso!"
        });
    }).catch(erro =>{
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir o produto."
        });
    });
});

app.get('/excluircompra/:id', async (req, res) => {
    await compra.destroy({
        where: { id: req.params.id }
    }).then(() =>{
        return res.json({
            error: false,
            message: "Compra excluída com sucesso!"
        });
    }).catch(erro =>{
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir a compra."
        });
    });
});



app.get('/pedidos/:id/excluiritem', async (req, res) => {
    await itempedido.destroy({ where: { id: req.params.id } })
        .then((response) => {
            return res.json({
                error: false,
                message: "O Item foi excluído com sucesso."
            });
        }).catch((erro) => {
            return res.status(400).json({
                error: true,
                message: "Erro: o item não foi excluído."
            });
        });

});

app.get('/compras/:id/excluiritem', async (req, res) => {
    await itemcompra.destroy({ where: { id: req.params.id } })
        .then((response) => {
            return res.json({
                error: false,
                message: "O Item foi excluído com sucesso."
            });
        }).catch((erro) => {
            return res.status(400).json({
                error: true,
                message: "Erro: o item não foi excluído."
            });
        });

});


app.get('/produtos', function (req, res) {
    res.send('Os produtos foram criados!')
});

app.post('/produtos', async (req, res) => {
    await produto.create(
        req.body
    ).then(function () {
        return res.json({
            error: false,
            message: "Produto criado com sucesso."
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Não foi possível criar o produto."
        })
    });
});

app.get('/compras', function (req, res) {
    res.send('A compra foi feita!')
});

app.post('/compras', async (req, res) => {
    await compra.create(
        req.body
    ).then(function () {
        return res.json({
            error: false,
            message: "Sua compra está feita."
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Foi impossível se conectar."
        })
    });
});

app.get('/itemcompras', function (req, res) {
    res.send('Os itens foram comprados!')
});

app.get('/itempedido', async (req, res) => {
    await itempedido.findAll()
        .then(itens => {
            return res.json({
                error: false,
                message: "Item do pedido.",
                itens
            });
        }).catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Erro de conexão."
            });
        });
});



let port = process.env.PORT || 3001;

app.listen(port, (req, res) => {
    console.log('Servidor ativo: http://localhost:3001');
})