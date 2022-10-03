import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const bcrypt = require("bcrypt");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {

            const user = await prisma.user.findFirst(req.body.username)
            if (user) {
                const validPassword = await bcrypt.compare(req.body.password, user.password);
                if (validPassword) {
                    return res.status(200).json({ msg: "Login Successful" });
                } else {
                    return res.status(400).json({ msg: "Invalid Password" });
                }
            } else {
                return res.status(401).json({ msg: "User does not exist" });
            }

        } catch (err) {
            console.error(err)
            return res.status(500).json({ msg: 'Something went wrong' })
        }
    } else {
        return res.status(405).json({ msg: 'Method not allowed' })
    }
}