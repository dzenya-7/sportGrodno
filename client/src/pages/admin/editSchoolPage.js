import React, {useEffect, useState} from 'react';
import {useHttp} from "../../hooks/http.hook";
import Header from "../../components/header/Header";
import './styles/editSchoolPage.css'

const EditSchoolPage = () => {

    const {request} = useHttp()
    const [New_2, setNew_2] = useState(null)
    let [url, setUrl] = useState(null)
    let [photos, setPhotos] = useState(null)
    let u = window.location.href.split("/")
    let id = u.at(-1)
    let [text, setText] = useState(null)
    let [title, setTitle] = useState(null)
    const fetchAll1 = React.useCallback(async ()=>{
        try {
            let data = await request("/api/schools/"+id.toString(), 'GET')
            data = data.at(0)
            setNew_2(data)
        } catch (e) {
            console.error(e.message)
        }
    })
    useEffect(()=>{
        const fetchData = async () => {
            await fetchAll1()
        };

        fetchData();
    },[])
    const save = async () => {
        if (url == null)
            url = New_2.img
        if (text == null)
            text = New_2.text
        if (title == null)
            title = New_2.title
        if(photos == null)
            photos = New_2.photos.join(",")
        let data = await request("/api/schools/update/" + New_2._id, "POST", {
            id: New_2._id, img: url, text: text, title: title,photos:photos.split(",")
        })
        window.location.assign('http://localhost:3000/schoolsList');



    }
    const onTextChanged = (e)=>{
        setText(e.target.value)
    }
    const onTitleChanged = (e)=>{
        setTitle(e.target.value)
    }
    const onUrlChanged = (e)=>{
        setUrl(e.target.value)
    }

    function onPhotosChanged(e) {
        setPhotos(e.target.value)
    }

    if(!!New_2){
        return (
            <div className='news__list_4'>

                <h4>Photos</h4>
                <textarea cols="100" typeof="text" cols="100" rows={2} defaultValue={New_2.photos} onChange={onPhotosChanged}/>

                <h4>Text</h4>
                <textarea cols="100" typeof="text" cols="100" rows={2} defaultValue={New_2.text} onChange={onTextChanged}/>
                <h4>Title</h4>
                <textarea cols={100} defaultValue={New_2.title} cols="100" rows={New_2.title.toString().length/100+1} onChange={onTitleChanged}/>
                <h4>Img</h4>
                <textarea defaultValue={New_2.img} cols="100" onChange={onUrlChanged}/>
                <br/>
                <button onClick={save}>Save</button>
            </div>
        );
    }
    else {
        return (
            <div>
                Loading
            </div>
        )
    }

};

export default EditSchoolPage;