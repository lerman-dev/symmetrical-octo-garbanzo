export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Получить данные из запроса
    const data = req.body;
    
    // Можно сохранять куда надо или просто ответить ОК
    return res.status(200).json({ message: 'OK', received: data });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
