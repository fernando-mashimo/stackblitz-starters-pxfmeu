const express = require('express');
const app = express();
const port = 4000;

app.use(express.json());

const contas = [
  { numero: 12345, saldo: 1000, user: 'jorge', token: [] },
  { numero: 54321, saldo: 500, user: 'maria', token: [] },
  { numero: 98765, saldo: 2500, user: 'teresa', token: [] },
];

app.post('/contas', (req, res) => {
  const { numero, saldo, user } = req.body;

  if (!numero || !saldo || !user) {
    return res
      .status(400)
      .send('É necessário fornecer número, saldo e usuário.');
  }

  const existingAccount = contas.find((conta) => conta.user === user);

  if (existingAccount) {
    return res.status(409).send('Essa conta já está cadastrada.');
  }

  contas.push({ numero, saldo, user, token: [] });
  return res.sendStatus(200);
});

// Rota para autenticar e obter um token
app.post('/auth', (req, res) => {
  const { user } = req.body;

  if (!user) return res.status(400).send('É necessário fornecer o usuário.');
});

// Rota para realizar o débito entre contas
app.post('/transfer', (req, res) => {
  const { origem, destino, valor } = req.body;
  const token = req.headers['authentication-headers'];
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
