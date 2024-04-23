const db = require('../config/db');

exports.adicionarItem = (req, res) => {
    const { usuario_id, produto_id, quantidade } = req.body;

    const checkProdutoQuery = 'SELECT * FROM Produto WHERE id = ?';
    db.query(checkProdutoQuery, [produto_id], (error, results) => {
        if (error) {
            console.error('Erro ao buscar produto:', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        const produto = results[0];

        if (quantidade > produto.estoque) {
            return res.status(400).json({ error: 'Estoque insuficiente' });
        }

        const checkCarrinhoQuery = 'SELECT * FROM Carrinho WHERE usuario_id = ? AND produto_id = ?';
        db.query(checkCarrinhoQuery, [usuario_id, produto_id], (error, results) => {
            if (error) {
                console.error('Erro ao verificar carrinho:', error);
                return res.status(500).json({ error: 'Erro interno do servidor' });
            }

            if (results.length === 0) {
                const insertCarrinhoQuery = 'INSERT INTO Carrinho (usuario_id, produto_id, quantidade) VALUES (?, ?, ?)';
                db.query(insertCarrinhoQuery, [usuario_id, produto_id, quantidade], (error, results) => {
                    if (error) {
                        console.error('Erro ao adicionar item ao carrinho:', error);
                        return res.status(500).json({ error: 'Erro interno do servidor' });
                    }

                    res.status(200).json({ message: 'Item adicionado ao carrinho com sucesso' });
                });
            } else {
                const updateCarrinhoQuery = 'UPDATE Carrinho SET quantidade = ? WHERE usuario_id = ? AND produto_id = ?';
                db.query(updateCarrinhoQuery, [results[0].quantidade + quantidade, usuario_id, produto_id], (error, results) => {
                    if (error) {
                        console.error('Erro ao atualizar quantidade do item no carrinho:', error);
                        return res.status(500).json({ error: 'Erro interno do servidor' });
                    }

                    res.status(200).json({ message: 'Quantidade do item no carrinho atualizada com sucesso' });
                });
            }
        });
    });
};

exports.atualizarItem = (req, res) => {
    const { usuario_id, produto_id, quantidade } = req.body;

    const checkCarrinhoQuery = 'SELECT * FROM Carrinho WHERE usuario_id = ? AND produto_id = ?';
    db.query(checkCarrinhoQuery, [usuario_id, produto_id], (error, results) => {
        if (error) {
            console.error('Erro ao verificar carrinho:', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Item não encontrado no carrinho' });
        }

        const updateCarrinhoQuery = 'UPDATE Carrinho SET quantidade = ? WHERE usuario_id = ? AND produto_id = ?';
        db.query(updateCarrinhoQuery, [quantidade, usuario_id, produto_id], (error, results) => {
            if (error) {
                console.error('Erro ao atualizar quantidade do item no carrinho:', error);
                return res.status(500).json({ error: 'Erro interno do servidor' });
            }

            res.status(200).json({ message: 'Quantidade do item no carrinho atualizada com sucesso' });
        });
    });
};


exports.limparCarrinho = (req, res) => {
    const usuario_id = req.body.usuario_id;

    const deleteCarrinhoQuery = 'DELETE FROM Carrinho WHERE usuario_id = ?';
    db.query(deleteCarrinhoQuery, [usuario_id], (error, results) => {
        if (error) {
            console.error('Erro ao limpar carrinho de compras:', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }

        res.status(200).json({ message: 'Carrinho de compras limpo com sucesso' });
    });
};


exports.confirmarPedido = (req, res) => {
    const usuario_id = req.body.usuario_id;

    const calcularCustosQuery = 'SELECT SUM(p.preco * c.quantidade) AS custo_total, SUM(c.quantidade) AS quantidade_total FROM Carrinho c INNER JOIN Produto p ON c.produto_id = p.id WHERE c.usuario_id = ?';
    db.query(calcularCustosQuery, [usuario_id], (error, results) => {
        if (error) {
            console.error('Erro ao calcular custos do pedido:', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Carrinho de compras vazio' });
        }

        const { custo_total, quantidade_total } = results[0];

        const pedido = {
            usuario_id,
            custo_total,
            quantidade_total,
        };

        const deleteCarrinhoQuery = 'DELETE FROM Carrinho WHERE usuario_id = ?';
        db.query(deleteCarrinhoQuery, [usuario_id], (error, results) => {
            if (error) {
                console.error('Erro ao limpar carrinho de compras:', error);
                return res.status(500).json({ error: 'Erro interno do servidor' });
            }

            res.status(200).json({ message: 'Pedido confirmado com sucesso' });
        });
    });
};