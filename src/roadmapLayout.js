import React, {useState} from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import "./styles.css";
import Modal from "./Modal";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import ruLocale from 'date-fns/locale/ru';
import {AddTask} from "./addTask";
import {GetRoadmapMonthsNumbers} from "./roadmap1"

const ReactGrigLayout = WidthProvider(RGL);

const defaultProps = {
    isDraggable: false,
    isResizable: false,
    items: 50,
    rowHeight: 30,
    cols: 50,
}

const localeMap = {
    ru: ruLocale
};

const maskMap = {
    ru: '__.__.____'
};

export function RoadmapLayout(props) {
    const taskPlaces =[
        [0, 1.3, 2.6],
        [3.9, 5.2, 6.5],
        [7.8, 9, 10.3],
        [11.6, 12.9, 14.2],
        [15.5, 16.8, 18],
        [19.3, 20.6, 21.9],
        [23.2, 24.5, 25.8],
        [27, 28.3, 29.6],
        [30.9, 32.2, 33.5],
        [34.8, 36, 37.3],
        [38.6, 39.9, 41.2],
        [42.5, 43.8, 45],
        [46.3, 47.6, 48.9]
    ]
    const [idCounter, setIdCounter] = useState(0);
    let [x, setX] = useState(0);
    let [w, setW] = useState(0);
    const locale = 'ru';

    function getId(){
        setIdCounter(idCounter + 1);
        return idCounter.toString();
    }

    function findDates(a){
        if(value1.getDate() <= 10){
            setX(x = taskPlaces[a][0]);
            return x;
        }else if(value1.getDate() > 10 && value1.getDate() <= 20){
            setX(x = taskPlaces[a][1]);
            return x;
        }else {
            setX(x = taskPlaces[a][2]);
            return x;
        }
    }

    function findDatesWidth(a){
        if(value1.getDate() <= 10 && value2.getDate() >= 11 && value2.getDate() <= 20){
            setW(w = 2.6);
            return w;
        }else if(value2.getDate() - value1.getDate() <= 10){
            setW(w = 1.3);
            return w;
        }else if(value2.getDate() - value1.getDate() > 10 && value2.getDate() - value1.getDate() < 20){
            setW(w = 2.6);
            return w;
        }else {
            setW(w = 3.9);
            return w;
        }
    }

    function getX(){
        const currentMonth = value1.getMonth();
        const createdMonthsNumbers = GetRoadmapMonthsNumbers();
        let a = createdMonthsNumbers.indexOf(currentMonth);
        if(currentMonth === createdMonthsNumbers[createdMonthsNumbers.length - 1] &&
            value1.getFullYear() !== new Date().getFullYear()){
            return findDates(12)
        }
        return findDates(a);
    }

    function getWidth(){
        const currentMonth1 = value1.getMonth();
        const currentMonth2 = value2.getMonth();
        const createdMonthsNumbers = GetRoadmapMonthsNumbers();
        let a = createdMonthsNumbers.indexOf(currentMonth1);
        let b = createdMonthsNumbers.indexOf(currentMonth2);
        if ((currentMonth2 === 1 && currentMonth1 === 1) ||
            (currentMonth2 === 3 && currentMonth1 === 3) ||
            (currentMonth2 === 5 && currentMonth1 === 5) ||
            (currentMonth2 === 8 && currentMonth1 === 8) ||
            (currentMonth2 === 10 && currentMonth1 === 10)){
            if(value1.getDate() >= 11 && value1.getDate() <= 20 && value2.getDate() >= 21){
                setW(w = 2.6);
                return w;
            }else if(value2.getDate() - value1.getDate() <= 10){
                setW(w = 1.3);
                return w;
            }else if(value2.getDate() - value1.getDate() > 10 && value2.getDate() - value1.getDate() <= 20){
                setW(w = 2.6);
                return w;
            }else {
                setW(w = 3.9);
                return w;
            }
        }
        if(a === b){
            return findDatesWidth(b)
        }
    }

    const [value1, setValue1] = React.useState(new Date());

    const [value2, setValue2] = React.useState(new Date());

    const [state, setState] = useState([])

    function addNewItem(){
        const oldState = state;
        const newItem = {x: getX(), y: 0, w: getWidth(), h: 1, i: getId(), roadmapName: value};
        setState(oldState.concat([newItem]));
        // {props.reciveValue1(value1);}
        // {props.reciveValue2(value2);}
    }

    const [modalActive, setModalActive] = useState(false)
    const [value, setValue] = useState(0);
    function handleChange(event) {
        setValue(event.target.value);
    }

    // const reciveNewTask = (value) => {console.log("value received from B",value)};
    // <AddTask reciveNewTask={reciveNewTask}/>
    return(
        <React.Fragment>
            <button className="open-btn" onClick={() => setModalActive(true)}>
                Добавление задачи
            </button>
            <Modal active={modalActive} setActive={setModalActive}>
                <form action="">
                    <text>Задача</text>
                    <input value={value} onChange={handleChange}/><br/>
                    <text>Дата начала: </text>
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={localeMap[locale]}>
                        <DatePicker
                            mask={maskMap[locale]}
                            value={value1}
                            onChange={(newValue) => {
                                setValue1(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider><br/>
                    <text>Дата конца: </text>
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={localeMap[locale]}>
                        <DatePicker
                            mask={maskMap[locale]}
                            value={value2}
                            onChange={(newValue) => {
                                setValue2(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider><br/>
                    <text>Цвет задачи: </text>
                </form>
                <button onClick={addNewItem}>
                    Add item
                </button>
            </Modal>
                <ReactGrigLayout className="reactGrigLayout" {...defaultProps} >
                    {state.map(item => (
                        <div key={item.roadmapName} data-grid={item} className="item">
                            <span>{item.roadmapName}</span>
                        </div>
                    ))}
                </ReactGrigLayout>
        </React.Fragment>
    );
}
