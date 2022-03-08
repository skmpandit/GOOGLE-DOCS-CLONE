import { EditorState } from "draft-js";
import {useEffect, useState} from "react";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {db} from "../firebase";
import { useRouter } from "next/dist/client/router";
import { convertFromRaw,convertToRow } from "draft-js";
import { useSession } from "next-auth/client";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

const Editor = dynamic(()=>import("react-draft-wysiwyg").then((module)=>module.Editor),{
        ssr: false,
    }
);
function TextEditor() {
    const[session] =  useSession();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const router = useRouter();
    const {id} = router.query;

    /*const [snapshot] = useDocumentOnce(db.collection("userDocs").doc(session.user.email).collection("docs").doc(id));
    useEffect(() => {
         if(snapshot?.data()?.EditorState){
             setEditorState(EditorState.createWithContent(convertFromRaw(snapshot?.data()?.EditorState)))
         }
    }, []);*/
    const onEditorStateChange = (editorState)=>{
        setEditorState=(editorState);
        db.collection("userDocs").doc(session.user.email).collection("docs").doc(id).set({
            editorState: convertToRow(editorState.getCurrentContent())
        },{merge:true})
    };
    return (
        <div className="bg-[#F8F9FA] min-h-screen pb-16">
             <Editor
                     editorState={editorState}
                     onEditorStateChange={onEditorStateChange}
                     toolbarClassName="flex stickey top-0 z-50 !justify-center mx-auto"
                     editorClassName="mt-6 p-10 bg-white shadow-lg max-w-5xl mx-auto mb-12 border"
             />
        </div>
    );
}

export default TextEditor
