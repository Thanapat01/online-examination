import { useRouter } from 'next/router';
import styles from '../styles/Register.module.css'

export default function Upload() {

    const router = useRouter();

    async function onSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const form = event.target as HTMLFormElement;
        // console.log(form.file.files[0]);

        const formData = new FormData();

        formData.append('file', form.file.files[0])

        const response = await fetch("/api/upload-file", {
            method: "Post",
            body: formData,
        });

        const data = await response.json();

        window.alert(data.msg);

        if (response.status === 200) {
            router.push("/checkAnswer");
        }
    }

    return (
        <div className="flex justify-center w-full h-screen items-center text-xl">
            <label className="mx-10">Upload</label>
            <div className="flex">
                <form onSubmit={onSubmitHandler}>
                    <input type="file" id="file"></input>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

// import { useState } from "react";

// export default function PrivatePage() {
//   const [image, setImage] = useState(null);
//   const [createObjectURL, setCreateObjectURL] = useState(null);

//   const uploadToClient = (event: React.FormEvent<HTMLFormElement>) => {
//     const form = event.target as HTMLFormElement;
//     if (form.target.files && event.target.files[0]) {
//       const i = event.target.files[0];

//       setImage(i);
//       setCreateObjectURL(URL.createObjectURL(i));
//     }
//   };

//   const uploadToServer = async (event) => {
//     const body = new FormData();
//     // console.log("file", image)
//     body.append("file", image);
//     const response = await fetch("/api/upload", {
//       method: "POST",
//       body
//     });
//   };

//   return (
//     <div>
//       <div>
//         <img src={createObjectURL} />
//         <h4>Select Image</h4>
//         <input type="file" name="myImage" onChange={uploadToClient} />
//         <button
//           className="btn btn-primary"
//           type="submit"
//           onClick={uploadToServer}
//         >
//           Send to server
//         </button>
//       </div>
//     </div>
//   );
// }