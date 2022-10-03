// import { NextApiRequest, NextApiResponse } from "next";
// import Error from "next/error";
import { prisma } from "../../server/db/client";

// var fs = require('fs');

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method === 'POST') {
//         try {

//             // fs.writeFile('mynewfile3.txt', 'Hello content!', function (err : Error) {
//             //     if (err) throw err;
//             //     console.log('Saved!');
//             // });

//             const fs = require('fs');
//             fs.writeFile("test.jpeg", req.body, (err: Error) => {
//                 if (err)
//                   console.log(err);
//                 else {
//                   console.log("File written successfully\n");
//                   console.log("The written has the following contents:");
//                   console.log(fs.readFileSync("test.jpeg", "utf8"));
//                 }
//               });
//             console.log(req.body.filename);

//             return res.status(200).json({ msg: 'Upload Successful' })

//         } catch (err) {
//             console.error(err)
//             return res.status(500).json({ msg: 'Something went wrong' })
//         }
//     } else {
//         return res.status(405).json({ msg: 'Method not allowed' })
//     }
// }

import formidable from "formidable";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
    api: {
        bodyParser: false
    }
};

const post = async (req: NextApiRequest, res: NextApiResponse) => {
    const form = new formidable.IncomingForm();

    form.parse(req, async function (err, fields, files) {
        await saveFile(files.file);
        return res.status(200).json({ msg: "Upload Successful" });
    });
};

const saveFile = async (file: any) => {
    // console.log(file);
    const data = fs.readFileSync(file.filepath);
    fs.writeFileSync(`./public/uploads/${file.originalFilename}`, data);
    //   await fs.unlinkSync(file.filepath);

    const res = await prisma.submissionDetail.create({ data: { timestamp: new Date(), reference: `./public/uploads/${file.originalFilename}` } });
    return;
};

export default (req: NextApiRequest, res: NextApiResponse) => {
    req.method === "POST"
        ? post(req, res)
        : req.method === "PUT"
            ? console.log("PUT")
            : req.method === "DELETE"
                ? console.log("DELETE")
                : req.method === "GET"
                    ? console.log("GET")
                    : res.status(404).send("");
};
