import express from 'express';
import mysql from 'mysql';
import { Request, Response } from 'express';
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors());
const port = 54988;

// MySQL bağlantı yapılandırması
const dbConfig = {
  host: 'localhost',
  user: 'root1',
  password: '91270016',
  database: 'pythonapi'
};
// MySQL bağlantısı
const connection = mysql.createConnection(dbConfig);
connection.connect((error) => {
  if (error) {
    console.error('MySQL bağlanti hatası:', error.sqlMessage);
    console.error('MySQL bağlanti hatası:', error.errno);
    console.error('MySQL bağlanti hatası:', error.code);
    console.error('MySQL bağlanti hatası:', error.sqlState);
  } else {
    console.log('MySQL bağlantisi başarili.');
    // Sunucuyu dinlemek için port belirleme
    app.listen(port, () => {
      console.log(`API sunucusu ${port} numarali portta News API çalışıyor...`);
    });
  }
});
// NEWS API Status
app.get('/News/Status', (req, res) => {
  res.json({ status: 'online', message: 'No recent issues or events to report' });
});
// Ticket View All
app.get('/request_news', (req: Request, res: Response) => {
  const query = 'SELECT * FROM news ORDER BY newsid DESC';
  connection.query(query, (err, rows) => {
    if (err) {
      console.error('MySQL query error: ', err);
      res.status(500).json({ error: 'An error occurred' });
      return;
    }
    const newsData = rows.map((row: any) => ({
      newsid: row.newsid,
      category: row.category,
      title: row.title,
      description: row.description,
      image: row.image,
      created_at: row.created_at.toISOString().slice(0, 19).replace('T', ' '),
    }));
    res.json(newsData);
  });
});
// Ticket View All
app.get('/request_news/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  const query = 'SELECT * FROM news WHERE newsid = ?';
  connection.query(query, [id], (err, rows) => {
    if (err) {
      console.error('MySQL query error: ', err);
      res.status(500).json({ error: 'An error occurred' });
      return;
    }
    const newsData = rows.map((row: any) => ({
      newsid: row.newsid,
      category: row.category,
      title: row.title,
      description: row.description,
      image: row.image,
      created_at: row.created_at.toISOString().slice(0, 19).replace('T', ' '),
    }));
    res.json(newsData);
  });
});