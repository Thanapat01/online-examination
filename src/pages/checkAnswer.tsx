import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import styles from '../styles/Register.module.css'
import { prisma } from "../server/db/client";
import fs from "fs";
import sizeOf from "image-size"

export default function CheckAnswer(props: any) {
    return (
        <div className="flex justify-center w-full h-screen items-center text-2xl">
            {props.validAnswer && (<div>Your answer is correct</div>)}
            {!props.validAnswer && (<div>Your answer is wrong</div>)}
        </div>
    )
}

export async function getServerSideProps(Context: GetServerSidePropsContext) {

    const submission = await prisma.submissionDetail.findFirst({ orderBy: { timestamp: "desc" } })

    const sizeOf = require('image-size');
    const dimensions = sizeOf(submission?.reference);
    console.log(dimensions.width, dimensions.height);

    const fs = require("fs"); //Load the filesystem module
    const stats = fs.statSync(submission?.reference);
    const fileSizeInKiloBytes = stats["size"] / 1024;
    console.log(fileSizeInKiloBytes);

    let validAnswer = false;
    if (dimensions.width <= 200 && dimensions.height <= 200 && fileSizeInKiloBytes <= 50) {
        validAnswer = true;
    }

    return {
        props: {
            validAnswer: validAnswer,
        },
    }
}