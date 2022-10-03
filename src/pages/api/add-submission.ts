import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const data = await prisma.submissionDetail.create({ data: req.body })
            return res.status(200).json({ data })
        } catch (err) {
            console.error(err)
            return res.status(500).json({ msg: 'Something went wrong' })
        }
    } else {
        return res.status(405).json({ msg: 'Method not allowed' })
    }
}