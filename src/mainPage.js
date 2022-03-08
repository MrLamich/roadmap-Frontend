import React, {useState, useEffect} from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import CssBaseline from '@mui/material/CssBaseline';
import {GetRoadmaps} from "./fetch";
import Modal from "./Modal";

// function GetName(){
//     let res = "123"
//     fetch('http://localhost:8000/roadmaps')
//         .then((response) => response.json())
//         .then((data) => res += (data));
//     return res;
// }

export function MainPage() {

    const history = useHistory();
    let [roadmapNames, setRoadmapNames] = useState([]);
    let [roadmaps, setRoadmaps] = useState([]);
    const [modalActive, setModalActive] = useState(false)
    const [value, setValue] = useState(" ");

    async function getData(){
        let data = await fetch('http://localhost:8000/roadmaps')
            .then(response => response.json())
        setRoadmapNames(data);
    }

    useEffect(() => {getData()}, []);
    console.log(roadmapNames)

    function AddRoadmap(){
        const old = roadmaps;
        setRoadmaps(old.concat(value))
        // postData('http://localhost:8000/roadmaps', {value})
        //     .then((data) => {console.log(data)})

    }
    // async function postData(url = '', data = {}){
    //     const response = await fetch(url, {
    //         method: 'POST',
    //         mode: 'cors',
    //         cache: 'no-cache',
    //         credentials: 'same-origin',
    //         // headers: {
    //         //     'Content-Type': 'application/json',
    //         //     'Accept': 'application/json'
    //         //     // 'Content-Type': 'application/x-www-form-urlencoded',
    //         // },
    //         redirect: 'follow',
    //         referrerPolicy: 'no-referrer',
    //         body: data
    //     });
    //     return await response.json();
    // }

    // useEffect(() => {
    //     fetch("http://localhost:8000/roadmaps",{
    //         method: 'POST',
    //         body: JSON.stringify({roadmapName}),
    //         cache: 'no-cache',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         referrerPolicy: 'no-referrer'
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {console.log(data)})
    // })
    function handleChange(event) {
        setValue(event.target.value);
    }


    // let name = GetName();
    // console.log(roadmapName)

    function handleClick(){
        history.push("/")
    }

    return (
        <Box >
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography
                            variant="h5"
                            component="h1"
                            sx={{ flexGrow: 1 }}
                            align="center"
                        >
                            Список роадмапов
                        </Typography>
                        <Button color="inherit" onClick={handleClick}>
                            Выход
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <CssBaseline/>
            <button onClick={() => setModalActive(true)}>
                Добавить роадмап
            </button>
            <Modal active={modalActive} setActive={setModalActive}>
                <form action="">
                    <text>Роадмап</text>
                    <input value={value} onChange={handleChange}/>
                </form>
                <button onClick={AddRoadmap}>
                    Добавить
                </button>
            </Modal>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <Typography variant="h5">
                    <ul>
                        {roadmapNames.map(roadmap => (
                            <li>
                                <Link href="/main/roadmap1">
                                    {roadmap.mapName}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Typography>
            </Box>
        </Box>
    );
}
