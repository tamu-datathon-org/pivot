import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  console.log("HERE")
  res.statusCode = 200
  res.json({ name: 'John Doe' })
}
