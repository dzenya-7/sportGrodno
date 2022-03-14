import {useHttp} from "../../hooks/http.hook";
import React, {useEffect, useState} from "react";
import './styles/EditPage.css';
import Header from "../../components/header/Header";

const EditPage = () => {
    const {request} = useHttp()

    let [id, setId] = useState()
    let [url, setUrl] = useState(null)
    let [text, setText] = useState(null)
    let [title, setTitle] = useState(null)
    const [New, setNew] = useState(null)
    const fetchAll1 = React.useCallback(async ()=>{
        try {
            let url = window.location.href.split("/")
            setId(url.at(-1))
            let data = await request("/api/new/football/id/"+id, 'GET')
            data = data.at(0)
            setNew(data)

        } catch (e) {
            console.error(e.message)
        }
    })
    const save = async () => {
        if (url == null)
            url = New.img
        if (text == null)
            text = New.text
        if (title == null)
            title = New.title
        let data = await request("/api/news/football/update/id/" + id, "POST", {
            id: id, img: url, text: text, title: title
        })
    }
    useEffect(()=>{
        const fetchData = async () => {
            await fetchAll1()
        };

        fetchData();
    },[id])
    const onUrlChange = (e) => {
        setUrl(e.target.value);
    };
    const onTitleChange = (e) => {
        setTitle(e.target.value);
    };
    const onTextChange = (e) => {
        setText(e.target.value);
    };
    if(!!New){
        return (
            <div className="editPage">


                <br/>
                <textarea onChange={onTitleChange} className="text" cols="100" rows={New.title.toString().length/100} defaultValue={New.title}/>
                <br/>
                <img src={New.img}/>
                <br/>
                <textarea onChange={onUrlChange} className="text" cols="100" rows={New.img.toString().length/100} defaultValue={New.img}/>
                <br/>

                <textarea onChange={onTextChange} className="text" cols="170" rows={New.text.toString().length/200} contentEditable="true" defaultValue={New.text}/>
                <br/>
                <button className="btn" onClick={save}> Save </button>
            </div>
        );
    }
    else return (
        <div>Loading</div>
    )
}
export default EditPage