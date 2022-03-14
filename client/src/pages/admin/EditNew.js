import React, {useEffect, useState} from 'react';
import {useHttp} from "../../hooks/http.hook";
import Header from "../../components/header/Header";
import './styles/editNew.css'

const EditNew = () => {
    const {request} = useHttp()
    let [url, setUrl] = useState(null)
    let [text, setText] = useState(null)
    let [title, setTitle] = useState(null)
    const [New_3, setNew_3] = useState(null)
    const fetchAll2 = React.useCallback(async ()=>{
        try {
            let url = window.location.href.split("/")
            let id = url.at(-1)
            let data = await request("/api/news/id/"+id, 'GET')
            data = data.at(0)
            setNew_3(data)
        } catch (e) {
            console.error(e.message)
        }
    })
    useEffect(()=>{
        const fetchData = async () => {
            await fetchAll2()
        };

        fetchData();
    },[])
    const save = async () => {
        if (url == null)
            url = New_3.img
        if (text == null)
            text = New_3.text
        if (title == null)
            title = New_3.title
        let data = await request("/api/news/update/" + New_3._id, "POST", {
            id: New_3._id, img: url, text: text, title: title
        })
        window.location.assign('http://localhost:3000/newsList');
    }
    const onUrlChange = (e) => {
        setUrl(e.target.value);
    };
    const onTitleChange = (e) => {
        setTitle(e.target.value);
    };
    const onTextChange = (e) => {
        setText(e.target.value);
    };

    if(!!New_3){
        return (
            <div className="editNew">
                <textarea onChange={onTitleChange} className="text" cols="100" rows={New_3.title.toString().length/100} defaultValue={New_3.title}/>
                <br/>
                <img src={New_3.img} width="100" height="100"/>
                <br/>
                <textarea onChange={onUrlChange} className="text" cols="100" rows={New_3.img.toString().length/100} defaultValue={New_3.img}/>
                <br/>
                <textarea onChange={onTextChange} className="text" cols="100" rows={New_3.text.toString().length/100}  defaultValue={New_3.text}/>
                <br/>
                <button onClick={save}> Save </button>
            </div>
        );
    }
    else {
        return (
            <div>Loading</div>
        )
    }
};

export default EditNew;