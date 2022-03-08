import React, {useState} from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CssBaseline from '@mui/material/CssBaseline';
import {RoadmapLayout} from './roadmapLayout';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import {AddTask} from "./addTask";

const monthsArray =[
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь"
]
export function GetRoadmapMonthsNumbers(){
    const start = new Date().getMonth()
    const r=[]
    for (let i = start; r.length < 13; i=(i == 11 ? 0: i + 1)){
        r.push(i)
    }
    return r;
}

export function GetRoadmapMonths(){
    const start = new Date().getMonth()
    const r=[]
    for (let i = start; r.length < 13; i=(i == 11 ? 0: i + 1)){
        r.push(monthsArray[i])
    }
    return r;
}

function GetRoadmapDates(){
    const month = new Date().getMonth()
    let counter = 0
    const res=[]
    for(let i = month; counter < 13; i=(i == 11 ? 0: i + 1)){
        if(i === 1){
            res.push("1-10", "11-20", "21-28")
        } else if(i === 0 || i === 2 || i === 4 || i === 6 || i === 7 || i === 9 || i === 11){
            res.push("1-10", "11-20", "21-31")
        } else{
            res.push("1-10", "11-20", "21-30")
        }
        counter++
    }
    return res;
}

export function Roadmap1(){

    //const reciveValue1 = (value) => {console.log("Значнеие 1: ", value)}
    //const reciveValue2 = (value1) => {console.log("Значнеие 2: ", value1)}
    const [roadmaps, setRoadmaps] = useState([]);
    const [roadmapLines, setRoadmapLines] = useState(0);

    const Item = styled(Paper)(({ theme }) => ({
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const history = useHistory();

    function CreateMonths(){
        return(
            <div style={{display: "flex"}}>
                <React.Fragment>
                    {GetRoadmapMonths().map((m) =>
                        <Grid item xs={10}>
                            <Item>{m}</Item>
                        </Grid>
                    )}
                </React.Fragment>
            </div>
        )
    }

    function createRoadmap(){
        const oldRoadmaps = roadmaps;
        setRoadmapLines(roadmapLines + 1);
        setRoadmaps(oldRoadmaps.concat(<RoadmapLayout/>));
    }


    function CreateDates(){
        return(
                <div style={{display: "flex"}}>
                    <React.Fragment>
                        {GetRoadmapDates().map((d) =>
                            <div style={{width: 237}}>
                                <Item>{d}</Item>
                            </div>
                        )}
                    </React.Fragment>
                </div>
        )
    }

    // function click(){
    //
    // }

    function ExitButton(){
        history.push("/")
    }

    function BackButton(){
        history.push("/main")
    }

    return(
      <Box>
          <Box className="appBar">
              <AppBar position="static">
                  <Toolbar>
                      <IconButton onClick={BackButton}>
                          <ArrowBackIcon/>
                      </IconButton>
                      <Typography
                          variant="h5"
                          component="h1"
                          sx={{ flexGrow: 1 }}
                          align="center"
                      >
                          Roadmap1
                      </Typography>
                      <Button color="inherit" onClick={ExitButton}>
                          Выход
                      </Button>
                  </Toolbar>
              </AppBar>
          </Box>
          <CssBaseline/>
          <Box sx={{overflowY: 'auto'}}>
              <Box className="roadmap" sx={{width: 'min-content'}}>
                  <CreateMonths/>
                  <CreateDates/>
                  <button onClick={createRoadmap}>Добавить линию</button>
                  <div>
                      {roadmaps.map((r) => (
                          <div>
                              Линия задач #<br/>
                              {r}
                          </div>
                      ))}
                  </div>
                  {/*<RoadmapLayout/>*/}
                  {/*<RoadmapLayout/>*/}
              </Box>
          </Box>

      </Box>
    );
}