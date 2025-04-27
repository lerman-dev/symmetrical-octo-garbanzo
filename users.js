import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.resolve('./users.json');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const data = await fs.readFile(filePath, 'utf8');
      res.status(200).json(JSON.parse(data));
    } catch (error) {
      res.status(500).json({ error: 'Failed to read users.json' });
    }
  } else if (req.method === 'POST') {
    try {
      const { id, nickname, profile } = req.body;

      const data = await fs.readFile(filePath, 'utf8');
      const users = JSON.parse(data);

      users[id] = { nickname, profile };

      await fs.writeFile(filePath, JSON.stringify(users, null, 2));
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to write users.json' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}