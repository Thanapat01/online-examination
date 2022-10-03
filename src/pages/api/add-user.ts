import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const bcrypt = require("bcrypt");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            const data = await prisma.user.create({ data: { username: req.body.username, password: hashedPassword } })
            
            return res.status(200).json({ data })

        } catch (err) {
            console.error(err)
            return res.status(500).json({ msg: 'Something went wrong' })
        }
    } else {
        return res.status(405).json({ msg: 'Method not allowed' })
    }
}